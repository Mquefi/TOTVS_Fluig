function validateForm(form) {
  var numActivity = getValue('WKNumState');
  var WKNextState = getValue('WKNextState');

  /*
  if (WKNextState == 9 && form.getValue('fCodigoPedido') != '') {
    throw 'Integração já realizada';
  }*/

  if (numActivity == 15 && WKNextState != 19) {
    if (form.getValue('anexarLink') == '') {
      throw 'O campo Anexar link é obrigatório';
    }
  }

  if (numActivity == 17) {
    if (form.getValue('recebido') == 'nao') {
      if (form.getValue('justificativa') == '') {
        throw 'O campo Justificativa é obrigatório';
      }
    }
  }

  if (numActivity == 0 || numActivity == 5) {
    if (form.getValue('tenant') == null) {
      throw 'O campo Empresa/Filial é obrigatório';
    }

    if (form.getValue('A1_NREDUZ') == null) {
      throw 'O campo Cliente é obrigatório';
    }

    if (form.getValue('A2_EST') == null) {
      throw 'O campo Estado é obrigatório';
    }

    if (form.getValue('A2_COD_MUN') == null) {
      throw 'O campo Municipio é obrigatório';
    }

    if (form.getValue('C5_DESTIMO') == '') {
      throw 'O campo Local de Entrega é obrigatório';
    }

    if (form.getValue('C6_PRODUTO') == null) {
      throw 'O campo Produto é obrigatório';
    }

    if (form.getValue('C6_VALOR') == 0 || form.getValue('C6_VALOR') == '') {
      throw 'O campo Valor KG é obrigatório';
    }

    if (form.getValue('C6_QTDVEN_ITEM') == '') {
      throw 'O campo Produto é obrigatório';
    }

    if (form.getValue('C6_CC') == null) {
      throw 'O campo CC é obrigatório';
    }

    if ((form.getValue('F4_CODIGO') == '527' || form.getValue('F4_CODIGO') == '529') && form.getValue('hidden_codClienteOnly') != '000027') {
      // throw 'MENSAGEM DE ERRO NA OPERAÇÃO: A TES INFORMADA É UTILIZADA EM OPERAÇÕES DE VENDA DE MERCADORIA, NÃO PODE SER UTILIZADA QUANDO O DESTINATÁRIO/CLIENTE É A PRÓPRIA COMPASA, FAVOR ALTERAR A TES OU ALTERAR O CLIENTE DA OPERAÇÃO';
      throw 'MENSAGEM DE ERRO NA OPERAÇÃO: A TES INFORMADA É UTILIZADA EM OPERAÇÕES DE REMESSA, NÃO PODE SER UTILIZADA PARA VENDA DE MERCADORIA. FAVOR ALTERAR A TES OU ALTERAR O CLIENTE DA OPERAÇÃO';
    }
  }

  /* if(numActivity == 0 || numActivity == 4){
	        if(form.getValue('A2_NOME') == ""){
	            throw "O campo Razao Social é obrigatorio";
	        } 
	        if(form.getValue('A2_NREDUZ') == ""){
	            throw "O campo Nome Fantasia é obrigatorio";
	        } 
	        if(form.getValue('A2_CEP') == ""){
	            throw "O campo CEP é obrigatorio";
	        } 
	        if(form.getValue('A2_END') == ""){
	            throw "O campo Endereço é obrigatorio";
	        } 
	        if(form.getValue('A2_BAIRRO') == ""){
	            throw "O campo Bairro é obrigatorio";
	        }
	        if(form.getValue('A2_EST') == null){
	            throw "O campo Estado é obrigatorio";
	        }
	        if(form.getValue('A2_COD_MUN') == null){
	            throw "O campo Municipio é obrigatorio";
	        }
	        if(form.getValue('A2_CGC') == ""){
	            throw "O campo CNPJ/CPF é obrigatorio";
	        }
	    }*/
}
