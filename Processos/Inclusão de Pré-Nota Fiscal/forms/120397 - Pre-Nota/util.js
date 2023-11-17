function showCamera(parameter) {
  JSInterface.showCamera(parameter);
}

var loadAttachmentCheckerInterval;
loadAttachmentChecker = () => {
  loadAttachmentCheckerInterval = setInterval(() => {
    var hasBoleto = false;
    var hasNotaPDF = false;
    var hasNotaXML = false;

    if (window.parent.ECM.newAttachmentsDocs) {
      for (attachment of window.parent.ECM.newAttachmentsDocs) {
        if (attachment.description == 'Boleto.pdf') {
          hasBoleto = true;
        } else if (attachment.description == 'Nota.pdf') {
          hasNotaPDF = true;
        } else if (attachment.description == 'Nota.xml') {
          hasNotaXML = true;
        }
      }

      enableOrDisableAttachmentButton($('#addBoleto'), hasBoleto);
      enableOrDisableAttachmentButton($('#addNotaPDF'), hasNotaPDF);
      enableOrDisableAttachmentButton($('#addNotaXML'), hasNotaXML);
    }
  }, 500);
};

enableOrDisableAttachmentButton = (id, has) => {
  if (has) {
    disableAttachmentButton(id);
  } else {
    enableAttachmentButton(id);
  }
};

enableAttachmentButton = id => {
  $(id).removeClass('btn-default');
  $(id).addClass('btn-info');
  $(id).removeAttr('disabled');
};

disableAttachmentButton = id => {
  $(id).removeClass('btn-info');
  $(id).addClass('btn-default');
  $(id).attr('disabled', 'disabled');
};

lpad = (value, size) => {
  value = value.toString();
  if (value.length > size) {
    return value.substr(0, size);
  } else if (value.length < size) {
    return lpad('0' + value, size);
  }

  return value;
};

somenteNumeros = num => {
  var er = /[^0-9.]/;
  er.lastIndex = 0;
  var campo = num;
  if (er.test(campo.value)) {
    campo.value = '';
  }
};

function openLinkDocumento(btn) {
  const $tr = btn.closest('tr');
  const $link = $tr.querySelector('[name^=link_documento___]');
  if ($link.value) window.open($link.value, '_blank');
}
