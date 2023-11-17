function getModalZoom() {
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout);
    };
  }

  function trimObject(obj) {
    const resultObj = {};
    for (const key in obj) {
      resultObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
    }
    return resultObj;
  }

  let zoomModal = null;
  if (zoomModal && zoomModal.isOpen()) zoomModal.close();

  return (config = {}) => {
    const {
      title = 'Pesquisa',
      description = 'Selecione um item da tabela',
      size = 'large',
      selectedClass = 'active',
      dataset,
      displayFields = [],
      resultFields = [],
      filters = [],
      orderBy = [],
      searchField = [],
      upperCase = false,
      preFetch = false,
      limit = 10,
      multiSelect = false
    } = config;

    if (!dataset) throw new Error('Dataset é obrigatório');
    if (!displayFields.length) throw new Error('DisplayFields é obrigatório');
    if (!searchField.length) throw new Error('SearchField é obrigatório');

    const tableHeaders = displayFields.map(field => /*html*/ `<th>${field.label}</th>`).join('');

    const content = /*html*/ `
    <div class="row">
  <div class="col-md-6 col-xs-12">
    <span class="help-block"> ${description} </span>
  </div>
  <div class="col-md-6 col-xs-12">
    <div class="form-group">
      <div class="input-group">
        <input type="text" id="modalSearch" class="form-control" placeholder="Digite e pressione Enter para pesquisar" />
        <div class="input-group-addon group-zoom no-view zoom-click btn-primary fs-cursor-pointer" id="modalSearchSubmit">
          <span class="fluigicon fluigicon-zoom-in"></span>
        </div>
      </div>
    </div>
  </div>
</div>
  
  <div class="row">
    <table class="table table-hover">
      <thead style="background-image: linear-gradient(to bottom, #ededed, #dddddd) !important">
        <tr>
          ${tableHeaders}
        </tr>
      </thead>
      <tbody id="modalTableBody">
        <tr>
          <td class="text-center fs-font-bold" colspan="${displayFields.length}">Nenhum registro encontrado</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="row" data-length-warning></div>
`;

    return new Promise((resolve, reject) => {
      const modalConfig = {
        title,
        content,
        id: 'zoomModal',
        size,
        actions: [
          {
            label: 'Cancelar',
            classType: 'btn-default',
            bind: 'data-close',
            actionClose: true
          },
          {
            label: 'Selecionar',
            classType: 'btn-primary',
            bind: 'data-submit'
          }
        ]
      };

      zoomModal = FLUIGC.modal(modalConfig, error => {
        if (error) return reject(error);

        const workFlowViewHeader = parent.document.querySelector('#workflowview-header');
        if (workFlowViewHeader) $(workFlowViewHeader).hide();

        const load = FLUIGC.loading('#zoomModal');
        const $modalSearch = document.getElementById('modalSearch');
        const $modalSearchSubmit = document.getElementById('modalSearchSubmit');

        const resultHandler = {
          get(target, prop) {
            return target[prop];
          },
          set(target, prop, value) {
            target[prop] = value;
            if (prop === 'filtered') renderTableBody();
          }
        };
        const result = { data: [], filtered: [], selected: null };
        const resultProxy = new Proxy(result, resultHandler);

        function submit() {
          if (resultProxy.selected == null || resultProxy.selected.length === 0)
            return FLUIGC.toast({
              message: 'Por favor, selecione um registro',
              type: 'danger'
            });

          zoomModal.remove();
          if (workFlowViewHeader) $(workFlowViewHeader).show();
          resolve(resultProxy.selected);
        }

        function renderTableBody() {
          const $lengthWarning = document.querySelector('[data-length-warning]');
          $lengthWarning.innerHTML = '';
          if (resultProxy.filtered.length > limit) {
            const $span = document.createElement('span');
            $span.classList.add('help-block', 'fs-font-italic');
            $span.innerHTML = `${resultProxy.filtered.length} registros encontrados, refine sua pesquisa`;
            $lengthWarning.appendChild($span);
          }

          const $modalTableBody = document.getElementById('modalTableBody');
          if (resultProxy.filtered.length === 0) {
            const $row = document.createElement('tr');
            const $td = document.createElement('td');

            $td.classList.add('text-center', 'fs-font-bold');
            $td.setAttribute('colspan', displayFields.length);
            $td.innerHTML = 'Nenhum registro encontrado';

            $row.appendChild($td);
            $modalTableBody.innerHTML = '';
            $modalTableBody.appendChild($row);
            return;
          }

          const $rows = resultProxy.filtered.slice(0, limit || resultProxy.filtered.length).map((item, index) => {
            const $row = document.createElement('tr');
            $row.classList.add('fs-cursor-pointer');
            $row.setAttribute('data-zoom-row', index);

            const $tds = displayFields.map(field => {
              const $td = document.createElement('td');
              $td.innerHTML = item[field.field];
              return $td;
            });

            $row.addEventListener('click', ({ target }) => {
              const active = $row.classList.contains(selectedClass);

              if (multiSelect) {
                if (active) {
                  $row.classList.remove(selectedClass);
                  if (resultProxy.selected.length <= 1) resultProxy.selected = [];
                  else resultProxy.selected = resultProxy.selected.filter(itemClicked => JSON.stringify(item) !== JSON.stringify(itemClicked));
                  return;
                }

                $row.classList.add(selectedClass);
                if (resultProxy.selected) resultProxy.selected.push(item);
                else resultProxy.selected = [item];
                return;
              }

              if (active) {
                $row.classList.remove(selectedClass);
                resultProxy.selected = null;
                return;
              }

              document.querySelectorAll(`[data-zoom-row].${selectedClass}`).forEach($row => $row.classList.remove(selectedClass));
              $row.classList.add(selectedClass);
              resultProxy.selected = item;
            });

            $row.addEventListener('dblclick', () => {
              if (multiSelect) return;
              resultProxy.selected = item;
              submit();
            });

            $row.append(...$tds);
            return $row;
          });

          $modalTableBody.innerHTML = '';
          $modalTableBody.append(...$rows);
        }

        async function doSearch() {
          console.log('Doing search');

          load.show();

          try {
            const constraints = [];

            if (filters && filters.length)
              filters.forEach(filter =>
                constraints.push(
                  DatasetFactory.createConstraint(
                    filter.field,
                    filter.initialValue,
                    filter.finalValue,
                    filter.type || ConstraintType.MUST,
                    filter.likeSearch || false
                  )
                )
              );

            if ($modalSearch.value.trim()) {
              const searchValue = upperCase ? $modalSearch.value.trim().toUpperCase() : $modalSearch.value.trim();

              if (Array.isArray(searchField))
                searchField.forEach(field =>
                  constraints.push(DatasetFactory.createConstraint(field, searchValue, searchValue, ConstraintType.SHOULD, true))
                );
              else constraints.push(DatasetFactory.createConstraint(searchField, searchValue, searchValue, ConstraintType.SHOULD, true));
            }

            const fields = resultFields.length ? resultFields : null;
            const order = orderBy.length ? orderBy : null;

            const dsResult = await new Promise((success, error) =>
              DatasetFactory.getDataset(dataset, fields, constraints, order, { success, error })
            );

            resultProxy.data = dsResult.values.map(v => trimObject(v));
            doFilter(true);
          } catch (error) {
            FLUIGC.toast({
              title: 'Erro ao buscar registros: ',
              message: 'Entre em contato com o administrador do sistema',
              type: 'danger'
            });
            console.error(error);
          } finally {
            load.hide();
          }
        }

        function doFilter(initial = false) {
          console.log('Doing filter');

          if (initial) return (resultProxy.filtered = resultProxy.data);
          const searchValue = ($modalSearch.value || '').toUpperCase();
          resultProxy.filtered = resultProxy.data.filter(item => {
            const value = Array.isArray(searchField) ? searchField.reduce((acm, act) => acm + '|' + item[act], '') : item[searchField];
            return (value || '').toUpperCase().includes(searchValue);
          });
        }

        const doFilterDebounce = debounce(doFilter, 200);

        $modalSearchSubmit.addEventListener('click', doSearch);
        $modalSearch.addEventListener('keyup', ({ key }) => (key === 'Enter' ? doSearch() : doFilterDebounce()));
        if (preFetch) doSearch();

        const $closeButtons = document.querySelectorAll('[data-close]');
        $closeButtons.forEach($button =>
          $button.addEventListener('click', () => {
            zoomModal.remove();
            if (workFlowViewHeader) $(workFlowViewHeader).show();
            resolve(null);
          })
        );

        const $subtmitButton = document.querySelector('[data-submit]');
        $subtmitButton.addEventListener('click', submit);
      });
    });
  };
}
