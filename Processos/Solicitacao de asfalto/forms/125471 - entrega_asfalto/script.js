var controle = [];
var FTDForms = {
  params: {},
  initForm: function (params) {
    this.params = params;
    var $this = this;
    $(function () {
      if (params.formMode == 'ADD' || params.formMode == 'MOD') {
        $this.onEdit(params);
      } else {
        $this.onView(params);
      }
    });
  },
  onView: function (params) {
    //Visualização do formulário sem a possibilidade de edição (consulta)
  },
  onEdit: function (params) {
    //Edição do formulário
    var WKNumState = params.WKNumState;
    var cod_usuario = params.WKNumState;

    /*$('.caracteres').on('keypress', function() {
				var regex = new RegExp("^[ 0-9a-zA-Zàèìòùáéíóúâêîôûãõ\b]+$");
				var _this = this;
				// Curta pausa para esperar colar para completar
				setTimeout( function(){
					var texto = $(_this).val();
					if(!regex.test(texto))
					{
						$(_this).val(texto.substring(0, (texto.length-1)))
					}
				}, 100);
			});*/

    $('.jus').hide();

    $('.anexo').hide();
    //$('#C6_VALOR').mask('000.000.000.000.000,00', {reverse: true});

    if ($('#precisaJustificar').val() == 'sim') {
      $('.jus').show();
    }

    if (WKNumState != 0) {
      setTimeout(() => {
        if (A2_COD_MUN) reloadZoomFilterValues('A2_COD_MUN', 'X5_CHAVE,' + $('#A2_EST_COD').val());
      }, 5000);
    }

    $(document).on('keypress touchstart', '.moeda', function () {
      $(this).maskMoney({
        thousands: '.',
        decimal: ',',
        allowNegative: true,
        precision: 8
      });
    });

    $(document).on('keypress touchstart', '.moeda2', function () {
      $(this).maskMoney({
        thousands: '.',
        decimal: ',',
        allowNegative: true,
        precision: 6
      });
    });

    /*$(document).on('keypress touchstart', '.quantidade', function(){
				$(this).maskMoney({
					thousands:'.', decimal:',', allowNegative:true,precision: 6
				});
			});	*/

    if (WKNumState == 15 || WKNumState == 38 || WKNumState == 17 || WKNumState == 15 || WKNumState == 26) {
      $('.pedidoOK').removeClass('hide');
      $('<p>Codigo do Pedido: ' + $('#fCodigoPedido').val() + '</p>').appendTo('.showCodPedido');
    }

    if (WKNumState == 15 || WKNumState == 38 || WKNumState == 17 || WKNumState == 15 || WKNumState == 26) {
      $('.bloqueia').attr('readonly', 'readonly');
    }

    if (WKNumState == 15 || WKNumState == 38 || WKNumState == 17 || WKNumState == 26) {
      $('.anexo').show();
    }

    if (WKNumState == 17 || WKNumState == 26) {
      $('#anexarLink').attr('readonly', 'readonly');
    }

    if (WKNumState == 17) {
      $('.jus').show();
    }

    if (WKNumState == 15) {
      if ($('#recebido').val() == 'nao' && $('#justificativa').val() != '') {
        $('.jus').show();
      }
    }

    $(document).on('change', '.calcula', function () {
      var quant = $(this).val();

      var quant = quant.replace(/\./g, '').replace(',', '.');

      if (quant > 0) {
        var valorTotal = parseFloat(quant) * parseFloat($('#C6_VALOR').val().replace(/\./g, '').replace(',', '.'));

        $('#C6_VALOR_TOTAL_INTEGRA').val(toFixed(valorTotal, 2));
        $('#C6_VALOR_TOTAL').val(toFixed(valorTotal, 2));
      } else {
        FLUIGC.toast({
          title: 'Atenção: ',
          message: 'A quantidade não pode ser 0',
          type: 'danger'
        });

        $('#C6_QTDVEN_ITEM').val('');
        $('#C6_VALOR_TOTAL').val('0');
      }

      calculaQtdProgramada();
    });

    if (params.WKNumState == 0 || params.WKNumState == 5) {
      const setDefaultCompany = () => {
        console.log('Tentando ...');
        if (window.tenant?.disable) {
          window.tenant.disable(true);
          window.tenant.setValue({
            grupo: '01',
            codfil: '010101',
            empresa: '01',
            unidneg: '01',
            filial: '01',
            nome: 'GRUPO COMPASA',
            nomred: 'ADMINISTRACAO COMPASA',
            nomecom: 'COMPASA DO BRASIL DISTRIBUIDORA DE DERIVADOS DE PETROLEO LTD',
            cgc: '01.382.022/0001-26',
            descemp: 'ADMINISTRACAO COMPASA',
            descgrp: 'GRUPO COMPASA',
            Companhia: 'GRUPO COMPASA',
            fullname: 'COMPASA DO BRASIL DISTRIBUIDORA DE DERIVADOS DE PETROLEO LTD',
            chave: '01.010101',
            fieldtext: 'Compasa do Brasil Distribuidora de Derivados de Petroleo Ltd - 01.382.022/0001-26'
          });
          return;
        }
        setTimeout(setDefaultCompany, 500);
      };

      setTimeout(setDefaultCompany, 500);
    }

    setTimeout(() => reloadFilters(), 3000);
  }
};

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}
function realToFloat(valor) {
  return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}
function floatToReal(numero) {
  var numero = numero.toFixed(2).split('.');
  numero[0] = numero[0]
    .split(/(?=(?:...)*$)/)
    .join('.')
    .replace('-.', '-');
  return numero.join(',');
}

function reloadFilters() {
  reloadZoomFilterValues(
    'A1_NREDUZ',
    'TENANT_TABLE,' + $('#hidden_tenant').val().split('.')[0] + '0' + ',TENANT_FILIAL,' + $('#hidden_filial').val()
  );
  reloadZoomFilterValues(
    'C6_PRODUTO',
    'TENANT_TABLE,' + $('#hidden_tenant').val().split('.')[0] + '0' + ',TENANT_FILIAL,' + $('#hidden_filial').val()
  );
  reloadZoomFilterValues('C6_CC', 'TENANT_TABLE,' + $('#hidden_tenant').val().split('.')[0] + '0' + ',TENANT_FILIAL,' + $('#hidden_filial').val());
  reloadZoomFilterValues(
    'F4_CODIGO',
    'TENANT_TABLE,' + $('#hidden_tenant').val().split('.')[0] + '0' + ',TENANT_FILIAL,' + $('#hidden_filial').val()
  );
}

function setSelectedZoomItem(selectedItem) {
  console.log(selectedItem);

  if (selectedItem['inputName'].match(/tenant/g)) {
    $('#descricaoEmpresa').val(selectedItem.Companhia);
    $('#hidden_tenant').val(selectedItem.chave);
    $('#hidden_filial').val(selectedItem.filial);
    reloadFilters();
  }

  if (selectedItem['inputName'].match(/C6_PRODUTO/g)) {
    $('#C6_DESCRICAO').val(selectedItem.descicao);
  }

  if (selectedItem['inputName'].match(/A1_NREDUZ/g)) {
    $('#hidden_codCliente').val(selectedItem.A1_COD + selectedItem.A1_LOJA);
    $('#hidden_codClienteOnly').val(selectedItem.A1_COD);
  }

  if (selectedItem['inputName'].match(/A2_EST/g)) {
    $('#A2_EST_COD').val(selectedItem.X5_CHAVE);
    reloadZoomFilterValues('A2_COD_MUN', 'X5_CHAVE,' + selectedItem['X5_CHAVE']);
  }

  if (selectedItem['inputName'].match(/A2_COD_MUN/g)) {
    $('#A2_COD_MUN_COD').val(selectedItem.CC2_CODMUN);
  }
}

function somenteNumeros(num) {
  var er = /[^0-9.]/;
  er.lastIndex = 0;
  var campo = num;
  if (er.test(campo.value)) {
    campo.value = '';
  }
}

function getCep(cep) {
  var url = 'https://viacep.com.br/ws/' + cep + '/json/';

  $.ajax({
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    contentType: 'application/json',
    success: function (json) {
      if (json.logradouro) {
        $('#A2_END').val(json.logradouro);
        $('#A2_BAIRRO').val(json.bairro);
      }
    }
  });
}

function calculaQtdProgramada() {
  var total = 0;
  var valorItem = $('#C6_QTDVEN_ITEM').val();
  $('#C6_QTDVEN').val(valorItem);
}
