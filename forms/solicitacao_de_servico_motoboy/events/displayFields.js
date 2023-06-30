function displayFields(form,customHTML){
	
	FTDForms(form, customHTML);
	

	var state = getValue("WKNumState"); //AQUI VOCE PEGA O VALOR DA ATIVIDADE TEM QUE SER NO DISPLAY FIELDS QUE É A PRIMEIRA COISA QUE RODA NO FORMULARIO 


	if (state == 0) { 
		var activity = getValue("WKNumState");
		
		var usuario_atual = getValue("WKUser");
			
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuario_atual,usuario_atual,ConstraintType.MUST);
		var filtro = new Array(c1);	
		var consulta = DatasetFactory.getDataset("colleague",null,filtro,null);
		var usuario = consulta.getValue(0,"colleagueName");
		
		form.setValue("solicitante",usuario);
		form.setValue("dataSolicitacao",getDateNow("tds"));
	}

	
	
}
//ABRE LA PRA GENTE QUAIS CAMPOS VOCE QUER ESCONDER?

//TEM QUE DAR HIDE NAS DIVS

function getDateNow(tp){
	var data = new Date();
	var a = data.getFullYear();
	var m = data.getMonth()+1;
	var d = data.getDate();
	var h = data.getHours();
	var mn = data.getMinutes();
	var s = data.getSeconds();
	if(m < 10){
		m = "0"+m;
	}

	if(d < 10){
		d = "0"+d;
	}

	if(h < 10){
		h = "0"+h;
	}

	if(mn < 10){
		mn = "0"+mn;
	}

	if(s < 10){
		s = "0"+s;
	}
	if(tp == "tds"){
		return String(d)+'/'+String(m)+'/'+String(a)+' '+String(h)+':'+String(mn)+':'+String(s);
	}else if(tp=="dt"){
		return String(d)+'/'+String(m)+'/'+String(a);
	}else if(tp=="hr"){
		return String(h)+':'+String(mn)+':'+String(s);
	}		
}

function FTDForms(form,customHTML) { 
	var version = "1.0.0";	
	
	customHTML.append("<script type='text/javascript'>");
	customHTML.append("if (FTDForms && FTDForms.initForm) {");
	customHTML.append("FTDForms.initForm({");
	customHTML.append(" formMode:'" + form.getFormMode()+"',");
	customHTML.append(" WKCompany:'" + getValue("WKCompany")+"',");
	customHTML.append(" WKNumState:'" + getValue("WKNumState")+"',");
	customHTML.append(" WKNumProces:'" + getValue("WKNumProces")+"',");
	customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState")+"',");
	customHTML.append(" WKUser:'" + getValue("WKUser")+"',");
	customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile())+",");
	customHTML.append("});");
	customHTML.append("}</script>"); 	
	
	
	customHTML.append("<script>");
	  customHTML.append("function getProcess() { return " + getValue("WKNumProces") + "; };");
	  customHTML.append("function getProcessId() { return '" + getValue("WKDef") + "'; };");
	  customHTML.append("function getState() { return " + getValue("WKNumState") + "; };");
	  customHTML.append("function getUserCode() { return '" + getValue("WKUser") + "'; };");
	  customHTML.append("function getMobile() { return " + form.getMobile() + "; };");
	  customHTML.append("function getFormMode() { return '" + form.getFormMode() + "'; };");
	  customHTML.append("function getCardId() { return '" + form.getDocumentId() + "'; };");
	  customHTML.append("function isManager() { return " + getValue("WKManagerMode") + "; };");
	  customHTML.append("</script>");
}