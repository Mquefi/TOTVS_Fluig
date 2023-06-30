$(function () {
	datasetHistory = {
		"tenant": $("#hidden_tenant").val() || "",
		"filial": $("#hidden_filial").val() || ""
	};

	onTenantChange = () => {
		if ($("#hidden_tenant").val() !== '') {
			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0] + "0";
			datasetHistory.filial = $("#hidden_filial").val();
			clearItemsOrderTable();
			clearOrderItems();
			switchToCheckoutMode();
		} else {
			clearItemsOrderTable();
		}
	};

	setSelectedZoomItem = (selectedItem) => onZoomFieldChanged(selectedItem);
	onZoomFieldChanged = (selectedItem) => {
		if (selectedItem['inputName'].match(/tenant/g)) {
			var nomemp = selectedItem.fieldtext
			$(".tenant").children("p").text(nomemp)
			$("#fName_Emp").val(nomemp)
			$("#hidden_filial").val(selectedItem.filial)
			$("#descgrp").val(selectedItem.descgrp);

			empresa = selectedItem.chave.split(".")[0] + "0";

			reloadZoomFilterValues("fComprador", "TENANT_TABLE," + empresa + ",TENANT_FILIAL," + selectedItem.filial);

			carregaDados(empresa, selectedItem.filial);

		}

		if (selectedItem['inputName'].match(/produto2/g)) {
			var index = selectedItem.inputName.split("___");
			$("#nome_produto___" + index[1]).val(selectedItem.B1_COD);
			$("#unidade_medida___" + index[1]).val(selectedItem.B1_UM);
		}
	}

});



