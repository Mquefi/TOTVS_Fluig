
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

		if (WKNumState == 0 || WKNumState == 5) {
			$(".bloqueiaImpostos").attr("readonly", "readonly");
			$(".bloqueiaContabeis").attr("readonly", "readonly");
			$("#fTipoConv  option:not(:selected)").attr("disabled", true);
			$("#fRetemCof option:not(:selected)").attr("disabled", true);
			$("#fRetemPis option:not(:selected)").attr("disabled", true);
			$("#fCalcINSS option:not(:selected)").attr("disabled", true);
			$("#fRetemCsll option:not(:selected)").attr("disabled", true);
		}
		
		//Adicionar linhas pra anexo de documentos
		$(document).on("click", "#addItem", function () {
		      var n = wdkAddChild("itens2");
		      $("#valor_unitario2___" + n).val(0);
		      $("#qtdade2___" + n).val(0);
		      datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
		      datasetHistory.filial = $("#hidden_filial").val();

		      // $("#valor_unitario2___" + n).mask("000.000.000.000.000,00", { reverse: true });

		      //reloadZoomFilterValues("produto2___"+n, "TENANT_TABLE," + datasetHistory.tenant +",TENANT_FILIAL,"+datasetHistory.filial);

		      reloadZoomFilterValues("cc___" + n, "TENANT_TABLE," + datasetHistory.tenant + ",TENANT_FILIAL," + datasetHistory.filial);
		    });
		
	}
};

function openLinkDocumento(btn) {
	const $tr = btn.closest('tr');
	const $link = $tr.querySelector('[name^=link_documento___]');
	if ($link.value) window.open($link.value, '_blank');
  }

function openLinkDocumentoInput(btn) {
	var $inp = btn;
	window.open (document.getElementById ($inp).value,'_blank');
	console.log($inp);
	};