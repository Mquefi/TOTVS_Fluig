$(function () {
	datasetHistory = {
		"fornecedor": $("#hidden_fornecedor").val() || "",
		"tenant": $("#hidden_tenant").val() || "",
		"filial": $("#hidden_filial").val() || "",
		"chaveNFE": $("#chave_nfe").val() || "",
		"orders": $("#pedidos").val() || []
	};

	onTenantChange = () => {
		if ($("#hidden_tenant").val() !== ''){
			datasetHistory.tenant = $("#hidden_tenant").val().split(".")[0]+"0";
			datasetHistory.filial = $("#hidden_filial").val();
		
			reloadZoomFilterValues("condicao", "TENANT_TABLE," + datasetHistory.tenant +",TENANT_FILIAL,"+datasetHistory.filial);
			reloadZoomFilterValues("especie", "TENANT_TABLE," + datasetHistory.tenant);
			reloadZoomFilterValues("fornecedor", "TENANT_TABLE," + datasetHistory.tenant+",TENANT_FILIAL,"+datasetHistory.filial);
			reloadZoomFilterValues("chave_nfe", "CHAVE," + datasetHistory.chaveNFE);
			clearItemsOrderTable();
			clearOrderItems();
			switchToCheckoutMode();
		}else{
			clearItemsOrderTable();
			clearOrderItems();
			switchToCheckoutMode();
			clearHeaderPreNota();
		}

		
		

		//$("#fornecedor").attr("readonly", datasetHistory.tenant == "");
		//$("#pedidos").attr("readonly", datasetHistory.tenant == "" || $("#hidden_fornecedor").val() == "");
	};





	setSelectedZoomItem = (selectedItem) => onZoomFieldChanged(selectedItem);

	onZoomFieldChanged = (selectedItem) => {

		if (selectedItem['inputName'].match(/tenant/g)) {
			var nomemp = selectedItem.fieldtext
			$(".tenant").children("p").text(nomemp)
			$("#fName_Emp").val(nomemp)
			$("#hidden_filial").val(selectedItem.filial)
			$("#descgrp").val(selectedItem.descgrp);

			empresa = selectedItem.chave.split(".")[0]+"0";
			//Carregas Fornecedor//
			var settings3 = {
                source: {
                    url:  '/api/public/ecm/dataset/search?datasetId=ds_fornecedor_preNota&searchField=A2_CGC&filterFields=empresa,'+empresa+'&',
                    contentType: 'application/json',
                    root: 'content',
                    pattern: '',
                    limit: 1,
                    offset: 0,
                    patternKey: 'searchValue',
                    limitkey: 'limit',
                    offsetKey: 'offset'
                },
                displayKey: 'A2_CGC',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {
                            'title': 'Nota',
                            'size': 'col-md-2',
                            'dataorder': 'A2_CGC',
                            'standard': true
                        },
						{
                            'title': 'Descrição',
                            'size': 'col-md-2',
                            'dataorder': 'A2_NREDUZ'
                        }
                    ],
                    renderContent: ['A2_CGC','A2_NREDUZ']
                }
            };
            var filter3 = FLUIGC.filter('#fornecedor', settings3);

			filter3.on('fluig.filter.item.added', function(data){
				reloadZoomFilterValues("pedidos", "TENANT_TABLE," + datasetHistory.tenant +",TENANT_FILIAL,"+datasetHistory.filial+",FORNECEDOR,"+data.item.A2_CGC);
            });




			//Carregas Fornecedor2//
			var settings4 = {
                source: {
                    url:  '/api/public/ecm/dataset/search?datasetId=ds_fornecedor_preNota&searchField=A2_CGC&filterFields=empresa,'+empresa+'&',
                    contentType: 'application/json',
                    root: 'content',
                    pattern: '',
                    limit: 1,
                    offset: 0,
                    patternKey: 'searchValue',
                    limitkey: 'limit',
                    offsetKey: 'offset'
                },
                displayKey: 'A2_CGC',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [
                        {
                            'title': 'Nota',
                            'size': 'col-md-2',
                            'dataorder': 'A2_CGC',
                            'standard': true
                        },
						{
                            'title': 'Descrição',
                            'size': 'col-md-2',
                            'dataorder': 'A2_NREDUZ'
                        }
                    ],
                    renderContent: ['A2_CGC','A2_NREDUZ']
                }
            };
            var filter4 = FLUIGC.filter('#fornecedor2', settings4);

			filter4.on('fluig.filter.item.added', function(data){
				$("#descricao2").val(data.item.A2_NREDUZ);
				
            });

			//carrega produtos
			carregaDados(empresa,selectedItem.filial);

		}
		
		if (selectedItem['inputName'].match(/chave_nfe/g)) {
			$("#numero").val(selectedItem.cNF);

		}

		if(selectedItem['inputName'].match(/A2_EST/g)){
			$("#A2_EST_COD").val(selectedItem.X5_CHAVE);
			reloadZoomFilterValues("A2_COD_MUN", "X5_CHAVE," + selectedItem["X5_CHAVE"]);
		}
		if(selectedItem['inputName'].match(/A2_COD_MUN/g)){
			$("#A2_COD_MUN_COD").val(selectedItem.CC2_CODMUN);
		}

		if (selectedItem['inputName'].match(/produto2/g)) {
			var index = selectedItem.inputName.split("___");
			$("#nome_produto2___"+index[1]).val(selectedItem.B1_COD);
			
	
		}	


		if (selectedItem['inputName'].match(/pedidos/g)) {
			var c1 = DatasetFactory.createConstraint("TENANT_TABLE", datasetHistory.tenant, datasetHistory.tenant, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("TENANT_FILIAL", datasetHistory.filial, datasetHistory.filial, ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("PEDIDO", selectedItem.C7_NUM, selectedItem.C7_NUM, ConstraintType.MUST);
			var dataset = DatasetFactory.getDataset("dsItensPedido", null, new Array(c1,c2,c3), null);


			if(dataset.values.length > 0){
				for (let index = 0; index < dataset.values.length; index++) {
					
					var retorno = validaItemPedido(dataset.values[index].C7_NUM,dataset.values[index].C7_ITEM)

					
					if(retorno == false){
						var n = wdkAddChild('itens');
						$("#pedido___"+n).val(dataset.values[index].C7_NUM);
						$("#item_pedido___"+n).val(dataset.values[index].C7_ITEM);
						$("#produto___"+n).val(dataset.values[index].C7_PRODUTO);
						$("#nome_produto___"+n).val(dataset.values[index].C7_DESCRI);
						$("#qtdade___"+n).val(dataset.values[index].C7_QUANT);
						$("#valor_unitario___"+n).val(dataset.values[index].C7_PRECO);
						$("#valor_total___"+n).val(dataset.values[index].C7_TOTAL);
						$("#centro_custo___"+n).val(dataset.values[index].C7_CC);
					}else{
						FLUIGC.toast({
							title: 'Atenção: ',
							message: 'Pedido: '+dataset.values[index].C7_NUM+" Item: "+dataset.values[index].C7_ITEM+" já está cadastro",
							type: 'danger'
						});
					}

					

						
					
				}
				
			}

			$("#pedidos").empty();

		}


		
		
	}



});

function validaItemPedido(C7_NUM,C7_ITEM){
	var ret = false;
    $('input[id^="pedido___"]').each(function(x) {
        var context = $(this);
        var linha = context.attr('id').split("___")[1];

        var pedido = $("#pedido___"+linha).val();
        var item = $("#item_pedido___"+linha).val();

        if(pedido == C7_NUM && item == C7_ITEM){
            ret = true;
        }
    });

	return ret;
}

