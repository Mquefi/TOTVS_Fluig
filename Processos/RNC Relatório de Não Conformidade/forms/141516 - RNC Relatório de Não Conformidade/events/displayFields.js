function displayFields(form,customHTML){
	
	FTDForms(form, customHTML);
    var ATIVIDADE_INICIO = 1; // ID da primeira atividade de acordo com o seu Workflow
    
    var activity = parseInt(getValue("WKNumState"));

    var hoje = new Date().toLocaleString();
    
    // Regras para quando está criando uma solicitação ou terminando de editar a atividade inicial
    if (form.getFormMode() == "ADD" || (form.getFormMode() == "MOD") && activity == ATIVIDADE_INICIO) {
        var user = fluigAPI.getUserService().getCurrent();
        
        form.setValue("solicitante", user.getFullName());
        form.setValue("dataSolicitacao", hoje.toString());
        // form.setValue("idsolicitante", user.getCode());
        // Como as regras são específicas pra essa parte já pode sair da função
        return;
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