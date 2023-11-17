'use strict';

$(document).ready(function () {
  FLUIGC.switcher.init('#form_proprio');

  // joga o botão de formulário próprio pra linha debaixo
  $('#form_proprio')[0].parentElement.parentElement.style.display = 'block';

  var tipoNotaChanged = select => {
    if (select.value == 'C') {
      $('#tipo_complemento').attr('disabled', false);
    } else {
      $('#tipo_complemento').val('');
      $('#tipo_complemento').attr('disabled', true);
    }
  };

  window.tipoEntradaChanged = select => {
    if (select.value == 'C') {
    } else if (select.value == 'S') {
    } else if (select.value == 'F') {
    }
  };

  tipoNotaChanged($('#tipo_nota')[0]);

  if (!$('#data_emissao').is('span')) {
    FLUIGC.calendar('#data_emissao', {
      maxDate: new Date()
    });
  }

  $('.selectAll').change(function (event) {
    var checkboxes = $(event.target).closest('table').find("input[type='checkbox']");
    for (var i = 1; i < checkboxes.length; i++) {
      if (checkboxes[i].checked != event.target.checked) {
        checkboxes[i].checked = event.target.checked;
        $(checkboxes[i]).change();
      }
    }
  });

  $('#numero').focusout(function () {
    let value = $('#numero').val().replace(/[^\d]/g, '');
    value = parseInt(0 + value);
    value = lpad(value, 9);
    $('#numero').val(value);
  });

  $('#numero').focus($(this).select());

  loadAttachmentChecker();
});
