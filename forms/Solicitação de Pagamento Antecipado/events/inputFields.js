function inputFields(form,customHTML) {
 
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	 
	if (form.getValue("dataNecessidade").match(regEx)) {
	var split = form.getValue("dataNecessidade").split('-');
	form.setValue("dataNecessidade", split[2] + '-' + split[1] + '-' + split[0]);
	}
 
	if (form.getValue("dataPagamento").match(regEx)) {
		var split = form.getValue("dataPagamento").split('-');
		form.setValue("dataPagamento", split[2] + '-' + split[1] + '-' + split[0]);
	}
	
	if (form.getValue("dataNf").match(regEx)) {
		var split = form.getValue("dataNf").split('-');
		form.setValue("dataNf", split[2] + '-' + split[1] + '-' + split[0]);
	}
	
	if (form.getValue("dtsolicitacao").match(regEx)) {
		var split = form.getValue("dtsolicitacao").split('-');
		form.setValue("dtsolicitacao", split[2] + '-' + split[1] + '-' + split[0]);
	}
}