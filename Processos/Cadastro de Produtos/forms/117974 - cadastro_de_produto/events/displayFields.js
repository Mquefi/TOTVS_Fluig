function displayFields(form,customHTML){ 
	
	var CURRENT_STATE  = getValue("WKNumState");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	FTDForms(form, customHTML);

	if (CURRENT_STATE == 13 && COMPLETED_TASK){
		
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