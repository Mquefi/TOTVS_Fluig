function displayFields(form, customHTML) {
  form.setShowDisabledFields(true);
  form.setHidePrintLink(true);

  if (form.getFormMode() == "ADD") form.setValue("data_create_form", getData());
  if (form.getFormMode() == "MOD") form.setValue("data_edit_form", getData());
}

function getData() {
  var fmt = new java.text.SimpleDateFormat("dd/MM/yyyy");
  return fmt.format(new Date());
}