function main() {
  if (getFormMode() != "VIEW") {
    window.data_venc_inicio_cal = FLUIGC.calendar("#data_venc_inicio");
    window.data_venc_fim_cal = FLUIGC.calendar("#data_venc_fim");

    $('[tablename="titulos"] tbody')
      .sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        handle: ".handle",
        helper(e, tr) {
          var $originals = tr.children();
          var $helper = tr.clone();
          $helper.children().each(function (index) {
            $(this).width($originals.eq(index).width());
          });
          return $helper;
        },
        stop() {
          recriarIndices("titulos");
        }
      })
      .disableSelection();
  }

  atualizarEstiloTabela();
}

function recriarIndices(tableName) {
  const table = qs(`[tablename="${tableName}"]`);
  const rows = qsa("tbody tr", table).filter((tr) => tr.style.display !== "none");

  const itens = getTableValues(tableName);

  rows.forEach((row, index) => {
    newId = index + 1;
    WdkchangeNames(row);
  });

  itens.forEach((item, index) => {
    Object.entries(item).forEach(([key, value]) => {
      const input = qs(`[name="${key}___${index + 1}"]`);
      if (input) input.value = value;
    });
  });
}

async function buscarTitulos() {
  if (getFormMode() == "VIEW") return;

  const cod_grupo_empresa = document.querySelector("#cod_grupo_empresa").value;
  const cod_filial = document.querySelector("#cod_filial").value;

  if (!cod_filial) {
    FLUIGC.toast({
      title: "Atenção",
      message: "Informe a filial",
      type: "warning"
    });
    return;
  }

  if (!(window.data_venc_inicio_cal.getDate() && data_venc_inicio_cal.getDate().isValid())) {
    FLUIGC.toast({
      title: "Atenção",
      message: "Informe a data de vencimento inicial",
      type: "warning"
    });
    return;
  }

  if (!(window.data_venc_fim_cal.getDate() && data_venc_fim_cal.getDate().isValid())) {
    FLUIGC.toast({
      title: "Atenção",
      message: "Informe a data de vencimento final",
      type: "warning"
    });
    return;
  }

  const data_venc_inicio = window.data_venc_inicio_cal.getDate().format("YYYYMMDD");
  const data_venc_fim = window.data_venc_fim_cal.getDate().format("YYYYMMDD");
  const num_titulo = document.querySelector("#num_titulo").value.trim();

  const load = FLUIGC.loading(window, { textMessage: "Buscando títulos..." });
  try {
    load.show();
    const constraint = [
      DatasetFactory.createConstraint("cod_grupo_empresa", cod_grupo_empresa, cod_grupo_empresa, ConstraintType.MUST),
      DatasetFactory.createConstraint("data_vencimento", data_venc_inicio, data_venc_fim, ConstraintType.MUST),
      DatasetFactory.createConstraint("cod_filial", cod_filial, cod_filial, ConstraintType.MUST)
    ];
    if (num_titulo) constraint.push(DatasetFactory.createConstraint("num_titulo", num_titulo, num_titulo, ConstraintType.MUST));
    
    const ds_titulos = await new Promise((success, error) =>
      DatasetFactory.getDataset("ds_titulos_pagar", null, constraint, null, { success, error })
    );

    if (ds_titulos.values[0].Erro)
      return FLUIGC.toast({
        message: ds_titulos.values[0].Erro,
        type: "danger"
      });

    const titulos = ds_titulos.values.map((titulo) => ({ ...titulo }));

    if (getTableValues("titulos").length > 0) {
      load.hide();
      const limparTabela = await new Promise((resolve) =>
        FLUIGC.message.confirm(
          {
            title: "Tabela de título não vazia",
            message: "Já há títulos adicionados à tabela",
            labelNo: "Mantém os títulos atuais",
            labelYes: "Limpar tabela antes de adicionar"
          },
          resolve
        )
      );

      if (limparTabela) limparTodosTitulos();
    }

    adicionarTitulos(titulos);
    console.log(titulos);
  } catch (error) {
    console.error(error);
    FLUIGC.toast({
      message: "Erro ao buscar títulos, contacte o administrador do sistema",
      type: "danger"
    });
  } finally {
    load.hide();
  }
}

function formatDateString(stringDate, inFormat = "YYYYMMDD", outFormat = "DD/MM/YYYY") {
  return moment(stringDate, inFormat).format(outFormat);
}

function formatNumber(number, decimalPlaces = 2) {
  return Number(number).toLocaleString("pt-BR", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

function toNumber(numberString) {
  if (!numberString) return 0;
  const num = Number(numberString.replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(num)) return 0;
  return num;
}

function adicionarTitulos(titulos) {
  for (const titulo of titulos) {
    const titulosAdicionados = getTableValues("titulos");
    const tituloJaAdicionado = titulosAdicionados.find(
      (tituloAdicionado) =>
        tituloAdicionado.E2_FILIAL == titulo.E2_FILIAL &&
        tituloAdicionado.E2_PREFIXO == titulo.E2_PREFIXO &&
        tituloAdicionado.E2_NUM == titulo.E2_NUM &&
        tituloAdicionado.E2_PARCELA == titulo.E2_PARCELA &&
        tituloAdicionado.E2_TIPO == titulo.E2_TIPO &&
        tituloAdicionado.E2_FORNECE == titulo.E2_FORNECE &&
        tituloAdicionado.E2_LOJA == titulo.E2_LOJA
    );
    if (tituloJaAdicionado) continue;

    const seq = wdkAddChild("titulos");
    document.querySelector("#E2_FILIAL___" + seq).value = titulo.E2_FILIAL;
    document.querySelector("#E2_PREFIXO___" + seq).value = titulo.E2_PREFIXO;
    document.querySelector("#E2_NUM___" + seq).value = titulo.E2_NUM;
    document.querySelector("#E2_PARCELA___" + seq).value = titulo.E2_PARCELA;
    document.querySelector("#E2_TIPO___" + seq).value = titulo.E2_TIPO;
    document.querySelector("#E2_FORNECE___" + seq).value = titulo.E2_FORNECE;
    document.querySelector("#E2_LOJA___" + seq).value = titulo.E2_LOJA;
    document.querySelector("#E2_NOMFOR___" + seq).value = titulo.E2_NOMFOR;
    document.querySelector("#E2_EMISSAO___" + seq).value = formatDateString(titulo.E2_EMISSAO);
    document.querySelector("#E2_VENCTO___" + seq).value = formatDateString(titulo.E2_VENCTO);
    document.querySelector("#E2_VENCREA___" + seq).value = formatDateString(titulo.E2_VENCREA);
    document.querySelector("#E2_VALOR___" + seq).value = formatNumber(titulo.E2_VALOR);
    document.querySelector("#E2_SALDO___" + seq).value = formatNumber(titulo.E2_SALDO);
    document.querySelector("#E2_CDFLUIG___" + seq).value = titulo.E2_CDFLUIG;
    document.querySelector("#E2_NUMBOR___" + seq).value = titulo.E2_NUMBOR;
    document.querySelector("#E2_PGPARCI___" + seq).value = formatNumber(titulo.E2_SALDO);
    // document.querySelector("#E2_PGPARCI___" + seq).value = formatNumber(0);

    MaskEvent.init();
  }

  calcularTotalTitulos();
}

function limparTodosTitulos() {
  if (getFormMode() == "VIEW") return;

  Array.from(document.querySelectorAll('[tablename="titulos"] tbody tr'))
    .filter((tr) => tr.style.display != "none")
    .forEach(fnWdkRemoveChild);

  calcularTotalTitulos();
}

function qsa(selector, $parent = document) {
  return Array.from($parent.querySelectorAll(selector));
}

function qs(selector, $parent = document) {
  return $parent.querySelector(selector);
}

function getTableValues(tableName) {
  const $table = qs(`[tablename="${tableName}"] tbody`);
  const rows = qsa("tr", $table).filter(($tr) => $tr.style.display !== "none");

  return rows.map(($tr) => {
    const $inputs = qsa("input, textarea, select", $tr);
    const valuesAsObject = $inputs.reduce((acc, $input) => {
      const name = $input.name.split("___")[0];
      const value = $input.type === "checkbox" ? $input.checked : $input.value;
      return { ...acc, [name]: value };
    }, {});
    valuesAsObject.rowElement = $tr;
    return valuesAsObject;
  });
}

function calcularTotalTitulos() {
  const titulos = getTableValues("titulos");
  const saldoTotal = titulos.reduce((acc, titulo) => acc + toNumber(titulo.E2_SALDO), 0);
  const valorTotalPagar = titulos
    .filter((titulo) => !titulo.remover)
    .reduce((acc, titulo) => {
      if (toNumber(titulo.E2_PGPARCI) == 0) return acc + toNumber(titulo.E2_SALDO);
      return acc + toNumber(titulo.E2_PGPARCI);
    }, 0);
  document.querySelector("#valor_total").value = formatNumber(saldoTotal);
  document.querySelector("#valor_total_pagar").value = formatNumber(valorTotalPagar);
  document.querySelector("#qtd_titulos").value = titulos.length;
}

function getRemoverValue(el) {
  const row = el.closest("tr");
  const id = qs("input, select, textarea", row).id.split("___")[1];
  const checkbox = qs(`#remover___${id}`);
  return checkbox.checked;
}

async function marcarRemovido(el, check) {
  const row = el.closest("tr");
  const id = qs("input, select, textarea", row).id.split("___")[1];
  const checkbox = qs(`#remover___${id}`);

  if (checkbox.checked) {
    const remover = await new Promise((resolve) =>
      FLUIGC.message.confirm(
        {
          title: "Linha marcada para remover",
          message: "Deseja remover a linha ou desmarcar a remoção?",
          labelNo: "Desmarcar",
          labelYes: "Remover"
        },
        resolve
      )
    );
    if (remover) {
      fnWdkRemoveChild(row);
      calcularTotalTitulos();
      return;
    }
  }

  checkbox.checked = check;
  if (check) {
    const checkboxImportante = qs(`#importante___${id}`);
    checkboxImportante.checked = false;
    checkboxImportante.dispatchEvent(new Event("change"));
  }
  checkbox.dispatchEvent(new Event("change"));
  calcularTotalTitulos();
}

function marcarImportante(el) {
  if (el.checked) {
    const checkboxRemover = qs(`#remover___${el.id.split("___")[1]}`);
    checkboxRemover.checked = false;
  }
  atualizarEstiloTabela();
}

function atualizarEstiloTabela() {
  getTableValues("titulos").forEach((titulo) => {
    if (titulo.importante) titulo.rowElement.classList.add("importante");
    else titulo.rowElement.classList.remove("importante");

    if (titulo.remover) titulo.rowElement.classList.add("removed");
    else titulo.rowElement.classList.remove("removed");
  });
}

function beforeSendValidate(numState, nextState) {
  const titulos = getTableValues("titulos");
  if (titulos.length == 0) {
    FLUIGC.toast({
      message: "Adicione pelo menos um título",
      type: "danger"
    });
    return false;
  }

  let hasError = false;
  titulos.forEach((titulo) => {
    if (toNumber(titulo.E2_PGPARCI) > toNumber(titulo.E2_SALDO)) {
      alert(`O valor a pagar do título ${titulo.E2_NUM} é maior que o saldo`);
      hasError = true;
    } else if (toNumber(titulo.E2_PGPARCI) <= 0) {
      alert(`O valor informado para pagamento ${titulo.E2_PGPARCI} não pode ser menor ou igual a zero`);
      hasError = true;
    }
  });

  if (hasError) return false;

  const continuar = confirm("Títulos marcadados para remover não serão salvos, deseja continuar?");
  if (!continuar) return false;
  titulos.forEach((titulo) => {
    if (titulo.remover) fnWdkRemoveChild(titulo.rowElement);
  });

  return true;
}
