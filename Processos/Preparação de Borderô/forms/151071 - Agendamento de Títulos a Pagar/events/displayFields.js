function displayFields(form, customHTML) {
  var task = getValue("WKNumState");
  var userCode = getValue("WKUser");
  customHTML.append("<script>");
  customHTML.append("function getState() { return " + task + "; };");
  customHTML.append("function getUserCode() { return '" + userCode + "'; };");
  customHTML.append("function getMobile() { return " + form.getMobile() + "; };");
  customHTML.append("function getFormMode() { return '" + form.getFormMode() + "'; };");
  customHTML.append("function getCardId() { return '" + form.getDocumentId() + "'; };");
  customHTML.append("function isManager() { return " + getValue("WKManagerMode") + "; };");
  customHTML.append("</script>");
  form.setShowDisabledFields(true);
  form.setHidePrintLink(true);

  if (form.getFormMode() == "ADD") {
    form.setValue("matric_solicitante", fluigAPI.getUserService().getCurrent().getCode());
    form.setValue("nome_solicitante", fluigAPI.getUserService().getCurrent().getFullName());
    form.setValue("email_solicitante", fluigAPI.getUserService().getCurrent().getEmail());
  }

  if (task == 0 || task == 4) form.setVisibleById("aprovador", false);

  if (form.getFormMode() == "VIEW") {
    customHTML.append("<script>");
    customHTML.append("hiddeView();");
    customHTML.append("</script>");
  }
}
