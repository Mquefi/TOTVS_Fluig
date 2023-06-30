function pedidoChangeHandler(event) {
  const value = event.target.value;
  if (value) return setPedido(value);
  removePedido();
}

async function setPedido(pedido) {
  if (!pedido) return;

  const cc = document.querySelector('#cCusto').value;
  const filial = Number(document.querySelector('#filial').value) * 10;
  if (!cc || !filial) {
    document.querySelector('#pedido').value = '';
    return FLUIGC.toast({ message: 'Favor preencher o centro de custo e a empresa/filial.', type: 'warning' });
  }

  const load = FLUIGC.loading(window, {
    textMessage: 'Carregando itens do pedido...'
  });

  try {
    load.show();
    const constraints = [
      DatasetFactory.createConstraint('C7_CC', cc, cc, ConstraintType.MUST),
      DatasetFactory.createConstraint('empresa', String(filial), String(filial), ConstraintType.MUST),
      DatasetFactory.createConstraint('C7_NUM', pedido, pedido, ConstraintType.MUST)
    ];

    const ds_items = await new Promise((success, error) =>
      DatasetFactory.getDataset('ds_get_pedidos_compras_itens', null, constraints, null, {
        success,
        error
      })
    );

    const itens = ds_items.values.map(trimObject);
    if (!itens.length) {
      removePedido();
      return FLUIGC.toast({ message: 'Pedido não encontrado.', type: 'warning' });
    }

    $('#razaSocial').val(itens[0].A2_NOME);
    $('#cnpj').val(formatAsCNPJ(itens[0].A2_CGC));
    $('#condPagamento').val(itens[0].C7_COND);
    $('#pedidoAprovado').val(itens[0].C7_CONAPRO);

    clearTable('itens_pedido');
    itens.forEach(item => {
      const seq = wdkAddChild('itens_pedido');
      document.querySelector('#C7_DESCRI___' + seq).value = item.C7_DESCRI;
      document.querySelector('#C7_UM___' + seq).value = item.C7_UM;
      document.querySelector('#C7_QUANT___' + seq).value = formatNumber(item.C7_QUANT);
      document.querySelector('#C7_PRECO___' + seq).value = formatNumber(item.C7_PRECO);
      document.querySelector('#C7_TOTAL___' + seq).value = formatNumber(item.C7_TOTAL);
      document.querySelector('#C7_OBSM___' + seq).value = item.C7_OBSM;
      document.querySelector('#C7_CC___' + seq).value = item.C7_CC;
    });
  } catch (error) {
    console.error(error);
    FLUIGC.toast({
      message: 'Erro ao buscar itens do pedido, entrar em contato com o administrador do sistema.',
      type: 'danger'
    });
  } finally {
    load.hide();
  }
}

function removePedido() {
  document.querySelector('#pedido').value = '';
  $('#razaSocial').val('');
  $('#cnpj').val('');
  $('#condPagamento').val('');
  $('#pedidoAprovado').val('');
  clearTable('itens_pedido');
}

function clearTable(tableName) {
  [...document.querySelectorAll(`[tablename="${tableName}"] tbody tr`)].filter(tr => tr.style.display != 'none').forEach(tr => fnWdkRemoveChild(tr));
}

function formatAsCNPJ(value) {
  return String(value)
    .replace(/\D/, '')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function formatNumber(value) {
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  });
}
