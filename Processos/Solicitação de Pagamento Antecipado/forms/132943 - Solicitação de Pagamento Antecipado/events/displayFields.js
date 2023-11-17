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

  var ATIVIDADE_INICIO = 1; // ID da primeira atividade de acordo com o seu Workflow

  var activity = parseInt(getValue("WKNumState"));

  var hoje = new Date().toLocaleString();

  // Regras para quando está criando uma solicitação ou terminando de editar a atividade inicial
  if (form.getFormMode() == "ADD" || (form.getFormMode() == "MOD" && activity == ATIVIDADE_INICIO)) {
    var user = fluigAPI.getUserService().getCurrent();

    form.setValue("solicitante", user.getFullName());
    form.setValue("campoData", hoje.toString());
    // form.setValue("idsolicitante", user.getCode());
    form.setValue("DATA", hoje.toString());
    // Como as regras são específicas pra essa parte já pode sair da função
    return;
  }
}
