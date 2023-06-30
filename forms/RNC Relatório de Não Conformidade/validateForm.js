function validateForm(form) {
  var atividade = getValue("WKNumState");

  var erro = "";

  if (atividade > 0 ) {
    var solicitante = form.getValue("solicitante");
    if (eVazio(solicitante)) {
      erro += "O campo Nome Solicitante não pode estar vazio\n";
    }
  }

  if (atividade > 0 ) {
	    var dataSolicitacao = form.getValue("dataSolicitacao");
	    if (eVazio(dataSolicitacao)) {
	      erro += "O campo Data da Solicitação não pode estar vazio\n";
    }
  }
  
  if (atividade > 0 ) {
	    var oRNC = form.getValue("oRNC");
	    if (eVazio(oRNC)) {
	      erro += "O campo Origem da RNC não pode estar vazio\n";
    }
  }

  
  if (erro != "") {
    throw erro + "\n\n";
  }
}

function eVazio(value) {
  return value == null || value == undefined || value.trim() == "";
}
