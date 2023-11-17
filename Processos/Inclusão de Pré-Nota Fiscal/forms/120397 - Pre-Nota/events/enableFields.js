function enableFields(form) {
  if (form.getFormMode() != 'ADD') {
    form.getChildrenIndexes('documentos_links').forEach(function (index) {
      form.setEnabled('link_documento___' + index, false);
      form.setEnabled('descricao_documento___' + index, false);
    });
  }
}
