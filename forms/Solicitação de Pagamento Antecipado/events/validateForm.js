function validateForm(form) {
  var msg = '';

  if (isEmpty(form.getValue('codEmpresa'))) {
    msg += 'Campo Empresa/Filial não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('gCusto'))) {
    msg += 'Campo Aplicação do Custo não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('cCusto'))) {
    msg += 'Campo Centro de Custo não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('razaSocial'))) {
    msg += 'Campo Razão Social não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('cnpj'))) {
    msg += 'Campo CNPJ/CPF não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('pedido'))) {
    msg += 'Campo Nº Pedido Protheus não foi Preenchido.\n';
  } else {
    if (form.getValue('condPagamento') == '000') {
      msg += 'Pedido de compra não cadastrado pra condição de pagamento antecipado - Cód 000, favor corrigir o pedido e reiniciar processo.\n';
    }

    if (form.getValue('pedidoAprovado') == 'L') {
      msg +=
        'Pedido de compra não está com status de "Liberado", favor verificar as aprovações pendentes antes de iniciar o processo de pagamento antecipado.\n';
    }
  }

  if (isEmpty(form.getValue('justificativa'))) {
    msg += 'Campo Justificativa não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('dataNecessidade'))) {
    msg += 'Campo Data da Necessidade não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('valor'))) {
    msg += 'Campo Valor - R$ não foi Preenchido.\n';
  }

  if (isEmpty(form.getValue('tipoPag'))) {
    msg += 'Campo Tipo de Pagamento não foi Preenchido.\n';
  }

  if (msg != '') {
    throw msg;
  }
}

function isEmpty(value) {
  return value == null || (value + '').trim().length === 0;
}