function displayFields(form, customHTML) {
  form.setShowDisabledFields(true);
  FTDForms(form, customHTML);
}

function FTDForms(form, customHTML) {
  var version = "1.0.0";

  customHTML.append("<script type='text/javascript'>");
  customHTML.append("if (FTDForms && FTDForms.initForm) {");
  customHTML.append("FTDForms.initForm({");
  customHTML.append(" formMode:'" + form.getFormMode() + "',");
  customHTML.append(" WKCompany:'" + getValue("WKCompany") + "',");
  customHTML.append(" WKNumState:'" + getValue("WKNumState") + "',");
  customHTML.append(" WKNumProces:'" + getValue("WKNumProces") + "',");
  customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState") + "',");
  customHTML.append(" WKUser:'" + getValue("WKUser") + "',");
  customHTML.append(" PreNotaSemPedido:" + podeAdicionarPreNotaSemPedido() + ",");
  customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile()) + ",");
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

  if(form.getFormMode() != 'ADD'){
    form.setVisibleById('btn_add_documento', false);
  }
}

function podeAdicionarPreNotaSemPedido() {
  var user = getValue("WKUser");
  var constraints = [
    DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST),
    DatasetFactory.createConstraint("colleagueGroupPK.groupId", "PRENOTA_SEM_PEDIDO", "PRENOTA_SEM_PEDIDO", ConstraintType.MUST),
  ];
  var dsGroups = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
  return dsGroups.rowsCount > 0;
}
