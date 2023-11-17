function displayFields(form,customHTML){
	FTDForms(form, customHTML);
	
	
	var form_mod = form.getFormMode();
	form.setValue('hid_form_mod',form_mod);
	var state = getValue("WKNumState"); //AQUI VOCE PEGA O VALOR DA ATIVIDADE TEM QUE SER NO DISPLAY FIELDS QUE É A PRIMEIRA COISA QUE RODA NO FORMULARIO 
	form.setValue('num_ativ',state); 
	// AQUI TO COLOCANDO ESSE VALOR EM UM CAMPO DO MEU FORM PRA ACESSAR LA VIA JQUERY
	var usuario_atual = getValue("WKUser");
	form.setValue("hid_idSolicitante",usuario_atual);

	if (state == 0) { 
		form.setVisibleById("info_cand_1",false)
		var usuario_atual = getValue("WKUser");
		//form.setValue("mat_user",usuario_atual);	
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuario_atual,usuario_atual,ConstraintType.MUST);
		var filtro = new Array(c1);	
		var consulta = DatasetFactory.getDataset("colleague",null,filtro,null);
		var usuario = consulta.getValue(0,"colleagueName");
		var email_user_abertura = consulta.getValue(0,"mail");
		var txt = "ANEXOS - "+usuario;
		form.setValue("hid_filial",txt);
		form.setValue("dt_abertura",getDateNow('dt'));
		form.setValue("sec_fun_user",usuario);
		form.setValue("hid_user_abertura",email_user_abertura);
	}
	var activity = getValue("WKNumState");
	form.setValue('num_ativ',activity);
	var usuario_atual = getValue("WKUser");
	form.setValue("mat_user",usuario_atual);	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuario_atual,usuario_atual,ConstraintType.MUST);
	var filtro = new Array(c1);	
	var consulta = DatasetFactory.getDataset("colleague",null,filtro,null);
	var usuario = consulta.getValue(0,"colleagueName");
	
	
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
}