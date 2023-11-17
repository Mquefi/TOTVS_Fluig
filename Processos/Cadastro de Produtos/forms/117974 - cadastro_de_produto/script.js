
var controle = [];
var datasetHistory = [];
var FTDForms = {
	params: {},
	initForm: function (params) {
		datasetHistory = {
			"tenant": $("#hidden_tenant").val() || "",
			"filial": $("#hidden_filial").val() || ""
		};
		this.params = params;
		var $this = this;

		FLUIGC.popover('.bs-docs-popover-hover', { trigger: 'hover', placement: 'auto', html: true });

		$(function () {
			if (params.formMode == "ADD" || params.formMode == "MOD") {
				$this.onEdit(params);
			} else {
				$this.onView(params);
			}
		});
	},
	onView: function (params) { //Visualização do formulário sem a possibilidade de edição (consulta)

		$(".fGrupo").children("p").text($("#fDescri_Grupo").val());
		$(".fTipo").children("p").text($("#fDescri_Tipo").val());
		$(".fUnidade").children("p").text($("#fDescri_Unidade").val());
		$(".fLocal").children("p").text($("#fDescri_Local").val());
		$(".fSegUnidade").children("p").text($("#fDescri_SegUnidade").val());
		$(".fComprador").children("p").text($("#fDescri_Comprador").val());
		$(".fOrigem").children("p").text($("#fDescri_Origem").val());
		$(".fposIPINCM").children("p").text($("#fDescri_PosIPI").val());
		$(".fConta").children("p").text($("#fDescri_Estoque").val());
		$(".fXConta").children("p").text($("#fDescri_Despesa").val());
		$(".fYConta").children("p").text($("#fDescri_Custo").val());
		$(".fVConta").children("p").text($("#fDescri_Gerencia").val());
		$(".tenant").children("p").text($("#fName_Emp").val());

		if (params.WKNumState == 17) {
			$('.produtoOK').removeClass('hide')
			$('<p>Codigo do Produto:' + $("#fCodigoProduto").val() + '</p>').appendTo('.showCodProduto');
		}

	},
	onEdit: function (params) {  //Edição do formulário 
		var WKNumState = params.WKNumState;
		var cod_usuario = params.WKNumState;

		//Preenche os help-block com os dados salvos
		$(".fGrupo").children("p").text($("#fDescri_Grupo").val());
		$(".fTipo").children("p").text($("#fDescri_Tipo").val());
		$(".fUnidade").children("p").text($("#fDescri_Unidade").val());
		$(".fLocal").children("p").text($("#fDescri_Local").val());
		$(".fSegUnidade").children("p").text($("#fDescri_SegUnidade").val());
		$(".fComprador").children("p").text($("#fDescri_Comprador").val());
		$(".fOrigem").children("p").text($("#fDescri_Origem").val());
		$(".fposIPINCM").children("p").text($("#fDescri_PosIPI").val());
		$(".fConta").children("p").text($("#fDescri_Estoque").val());
		$(".fXConta").children("p").text($("#fDescri_Despesa").val());
		$(".fYConta").children("p").text($("#fDescri_Custo").val());
		$(".fVConta").children("p").text($("#fDescri_Gerencia").val());
		$(".tenant").children("p").text($("#fName_Emp").val());

		if (WKNumState == 0 || WKNumState == 5) {
			$(".bloqueiaImpostos").attr("readonly", "readonly");
			$(".bloqueiaContabeis").attr("readonly", "readonly");
			$("#fTipoConv  option:not(:selected)").attr("disabled", true);
			$("#fRetemCof option:not(:selected)").attr("disabled", true);
			$("#fRetemPis option:not(:selected)").attr("disabled", true);
			$("#fCalcINSS option:not(:selected)").attr("disabled", true);
			$("#fRetemCsll option:not(:selected)").attr("disabled", true);
		}
		if (WKNumState == 6 || WKNumState == 2) {
			$(".bloqueiaContabeis").attr("readonly", "readonly");
		}


		if(WKNumState == 13){

			setTimeout(() => {
				datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
				datasetHistory.filial = $("#hidden_filial").val();

				reloadZoomFilterValues("fGrupo", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
				reloadZoomFilterValues("fLocal", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
				reloadZoomFilterValues("fUnidade", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
				reloadZoomFilterValues("fSegUnidade", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
				reloadZoomFilterValues("fTipo", "TENANT_TABLE," + datasetHistory.tenant);
				reloadZoomFilterValues("fComprador", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
				reloadZoomFilterValues("dsContasContabeis", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			}, 2000)
			
		}

	}
};
$(function () {

	if (WKNumState == 6 || WKNumState == 2){
		var intervalo = setInterval(function () {
			clearInterval(intervalo);
			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
			datasetHistory.filial = $("#hidden_filial").val();

			reloadZoomFilterValues("fOrigem", "TENANT_TABLE," + datasetHistory.tenant);
			reloadZoomFilterValues("fposIPINCM", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial + "01");
		}, 1000);
	}else if(WKNumState == 8 || WKNumState == 3 || WKNumState == 5){
			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
			datasetHistory.filial = $("#hidden_filial").val();

		var intervalo = setInterval(function () {
			clearInterval(intervalo);
			
			reloadZoomFilterValues("dsContasContabeis", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
		}, 1000);
		
	}

	setSelectedZoomItem = (selectedItem) => {

		//HEADER
		if (selectedItem['inputName'].match(/tenant/g)) {
			var nomemp = selectedItem.fieldtext
			$(".tenant").children("p").text(nomemp)
			$("#fName_Emp").val(nomemp)

	
			$("#hidden_filial").val(selectedItem.filial)

			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
			datasetHistory.filial = $("#hidden_filial").val();

			reloadZoomFilterValues("fGrupo", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("fLocal", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("fUnidade", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("fSegUnidade", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("fTipo", "TENANT_TABLE," + datasetHistory.tenant);
			reloadZoomFilterValues("fComprador", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
			reloadZoomFilterValues("dsContasContabeis", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);

		}

		//PRIMEIRA ETAPA
		if (selectedItem['inputName'].match(/fGrupo/g)) {
			$(".fGrupo").children("p").text(selectedItem.BM_DESC)
			$("#fDescri_Grupo").val(selectedItem.BM_DESC)
		}

		if (selectedItem['inputName'].match(/fComprador/g)) {
			$("#fCompradorId").val(selectedItem.GENERAL_ID);
			
		}
		


		
		if (selectedItem['inputName'].match(/fTipo/g)) {
			$(".fTipo").children("p").text(selectedItem.X5_DESCRI)
			$("#fDescri_Tipo").val(selectedItem.X5_DESCRI)
		}
		if (selectedItem['inputName'].match(/fUnidade/g)) {
			$(".fUnidade").children("p").text(selectedItem.AH_DESCPO)
			$("#fDescri_Unidade").val(selectedItem.AH_DESCPO)
		}
		if (selectedItem['inputName'].match(/fLocal/g)) {
			$(".fLocal").children("p").text(selectedItem.NNR_DESCRI)
			$("#fDescri_Local").val(selectedItem.NNR_DESCRI)
		}
		if (selectedItem['inputName'].match(/fSegUnidade/g)) {
			$(".fSegUnidade").children("p").text(selectedItem.AH_DESCPO)
			$("#fDescri_SegUnidade").val(selectedItem.AH_DESCPO)
		}
		if (selectedItem['inputName'].match(/fComprador/g)) {
			$(".fComprador").children("p").text(selectedItem.Y1_NOME)
			$("#fDescri_Comprador").val(selectedItem.Y1_NOME)
		}

		//SEGUNDA ETAPA
		if (selectedItem['inputName'].match(/fposIPINCM/g)) {
			$("#codIPINCM").val(String(selectedItem.GENERAL_ID).trim())
			$(".fposIPINCM").children("p").text(selectedItem.YD_DESC_P)
			$("#fDescri_PosIPI").val(selectedItem.YD_DESC_P)
			reloadZoomFilterValues("fposIPINCM", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial + "01");

		}

		if (selectedItem['inputName'].match(/fOrigem/g)) {
			$(".fOrigem").children("p").text(selectedItem.X5_DESCRI)
			$("#fDescri_Origem").val(selectedItem.X5_DESCRI)

			reloadZoomFilterValues("fOrigem", "TENANT_TABLE," + datasetHistory.tenant);
		}

		//TERCEIRA ETAPA
		if (selectedItem['inputName'].match(/fConta/g)) {
			$(".fConta").children("p").text(selectedItem.CT1_DESC01)
			$("#fDescri_Estoque").val(selectedItem.CT1_DESC01)
		}
		if (selectedItem['inputName'].match(/fXConta/g)) {
			$(".fXConta").children("p").text(selectedItem.CT1_DESC01)
			$("#fDescri_Despesa").val(selectedItem.CT1_DESC01)
		}
		if (selectedItem['inputName'].match(/fYConta/g)) {
			$(".fYConta").children("p").text(selectedItem.CT1_DESC01)
			$("#fDescri_Custo").val(selectedItem.CT1_DESC01)
		}
		if (selectedItem['inputName'].match(/fVConta/g)) {
			$(".fVConta").children("p").text(selectedItem.CT1_DESC01)
			$("#fDescri_Gerencia").val(selectedItem.CT1_DESC01)
		}

	}

	removedZoomItem = (removedItem) => {

		//HEADER
		if (removedItem['inputName'].match(/tenant/g)) {
			$(".tenant").children("p").text('');
			$("#fName_Emp").val('')
			onTenantChange(false);
		}

		//PRIMEIRA ETAPA
		if (removedItem['inputName'].match(/fGrupo/g)) {
			$(".fGrupo").children("p").text('');
			$("#fDescri_Grupo").val('')

			reloadZoomFilterValues("fGrupo", "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
		}
		if (removedItem['inputName'].match(/fTipo/g)) {
			$(".fTipo").children("p").text('');
			$("#fDescri_Tipo").val('')
		}
		if (removedItem['inputName'].match(/fUnidade/g)) {
			$(".fUnidade").children("p").text('');
			$("#fDescri_Unidade").val('')
		}
		if (removedItem['inputName'].match(/fLocal/g)) {
			$(".fLocal").children("p").text('');
			$("#fDescri_Local").val('')
		}
		if (removedItem['inputName'].match(/fSegUnidade/g)) {
			$(".fSegUnidade").children("p").text('');
			$("#fDescri_SegUnidade").val('')
		}
		if (removedItem['inputName'].match(/fComprador/g)) {
			$(".fComprador").children("p").text('');
			$("#fDescri_Comprador").val('');
		}

		//SEGUNDA ETAPA
		if (removedItem['inputName'].match(/fposIPINCM/g)) {
			$(".fposIPINCM").children("p").text("")
			$("#fDescri_PosIPI").val("")
		}

		if (removedItem['inputName'].match(/fOrigem/g)) {
			$(".fOrigem").children("p").text("")
			$("#fDescri_Origem").val("")
		}

		//TERCEIRA ETAPA
		if (removedItem['inputName'].match(/fConta/g)) {
			$(".fConta").children("p").text("")
			$("#fDescri_Estoque").val("")
		}
		if (removedItem['inputName'].match(/fXConta/g)) {
			$(".fXConta").children("p").text("")
			$("#fDescri_Despesa").val("")
		}
		if (removedItem['inputName'].match(/fYConta/g)) {
			$(".fYConta").children("p").text("")
			$("#fDescri_Custo").val("")
		}
		if (removedItem['inputName'].match(/fVConta/g)) {
			$(".fVConta").children("p").text("")
			$("#fDescri_Gerencia").val("")
		}
	}

	somenteNumeros = (num) => {
		var er = /[^0-9.]/;
		er.lastIndex = 0;
		var campo = num;
		if (er.test(campo.value)) {
			campo.value = "";
		}
	}

	getCep = (cep) => {
		var url = 'https://viacep.com.br/ws/' + cep + '/json/';

		$.ajax({
			url: url,
			dataType: 'jsonp',
			crossDomain: true,
			contentType: "application/json",
			success: function (json) {
				if (json.logradouro) {
					$("#A2_END").val(json.logradouro);
					$("#A2_BAIRRO").val(json.bairro);
				}
			}
		});
	}

	filtrazoom = (valor) => {

		var filterValues = "fposIPINCM," + valor;
		reloadZoomFilterValues('NCM', filterValues);
	}

	onTenantChange = (lRemove) => {

		//clearFields();
		if (lRemove) {

		} else {

		}

	};
});


