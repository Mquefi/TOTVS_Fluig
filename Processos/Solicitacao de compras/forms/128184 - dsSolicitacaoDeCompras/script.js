var controle = [];
var empresa = "";
var FTDForms = {
	params: {},
	initForm: function (params) {
		this.params = params;
		var $this = this;
		$(function () {
			if (params.formMode == "ADD" || params.formMode == "MOD") {
				$this.onEdit(params);
			} else {
				$this.onView(params);
			}
		});
	},
	onView: function (params) { //Visualização do formulário sem a possibilidade de edição (consulta)
		//bloqueia botoes da tela
		var tableSolPrd = $('table#tableSolicitacaoProducts tbody tr [id^="produto___"]');
		if (tableSolPrd.length > 0) {
			for (var i = 0; i < tableSolPrd.length; i++) {

				tableSolPrd.closest('td').find('button').prop("disabled", true);
				tableSolPrd.closest('tr').find('button[id^="btnDeleteLine"]').prop("disabled", true);
			}
		}

		if (params.WKNumState == 14) {
			$('.SCOK').removeClass('hide')
			$('<p>' + $("#messageSC").val() + '</p>').appendTo('.showSC');
		}

	},
	onEdit: function (params) {  //Edição do formulário 
		var WKNumState = params.WKNumState;
		var solicitante = params.WKUser;
		if (WKNumState == "0") {
			$("#solicitante").val(solicitante);
			$("#dataEmissao").val(getFormatedDate());
		}

		if (WKNumState == "4") {
			$("#addItem").prop('disabled', false);
			$("#tenant").prop('readonly', true);
		}

		$(document).on('click', '#addItem', function () {
			var n = wdkAddChild('tableSolicitacaoProducts');
			$("#qtdade___" + n).val(0);
			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
			datasetHistory.filial = $("#hidden_filial").val();


			console.log("datasetHistory.tenant "+datasetHistory.tenant);
			console.log("datasetHistory.tenant "+datasetHistory.filial);

			
			//reloadZoomFilterValues("produto___" + n, "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("cc___" + n, "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);

			


			
		});

	}
};


function getFormatedDate() {
	var fullDate = new Date();
	var hours = fullDate.getHours();
	var minutes = fullDate.getMinutes();

	if (minutes <= 9)
		minutes = "0" + minutes;

	var timeValue = hours + ":" + minutes;
	var date = fullDate.getDate().toString();

	if (date.length == 1)
		date = 0 + date;

	var mes = (fullDate.getMonth() + 1).toString();

	if (mes.length == 1)
		mes = 0 + mes;

	return date + "/" + mes + "/" + fullDate.getFullYear();
}

somenteNumeros = (num) => {
	var er = /[^0-9.]/;
	er.lastIndex = 0;
	var campo = num;
	if (er.test(campo.value)) {
		campo.value = "";
	}
	if (parseInt(campo.value) <= 0 || campo.value == ""){
		msgSwap('Opss','Campo quantidade não pode ser menor ou igual a zero','error');
		campo.value = "";
	}
}

function msgSwap(titulo,mensagem,tipo){
    swal ({
        icon: tipo,
        title: titulo,
        text:mensagem,
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: false,
        timer: 3000,
       })
}

arredondar = (num) => {
	var campo = num;
	campo.value = parseFloat((campo.value)).toFixed(9);
}

