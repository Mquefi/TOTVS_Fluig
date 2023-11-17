$(function () {
  datasetHistory = {
    fornecedor: $('#hidden_fornecedor').val() || '',
    tenant: $('#hidden_tenant').val() || '',
    filial: $('#hidden_filial').val() || '',
    chaveNFE: $('#chave_nfe').val() || '',
    orders: $('#pedidos').val() || []
  };

  function onTenantChange() {
    if ($('#hidden_tenant').val() !== '') {
      datasetHistory.tenant = $('#hidden_tenant').val().split('.')[0] + '0';
      datasetHistory.filial = $('#hidden_filial').val();

      reloadZoomFilterValues('condicao', 'TENANT_TABLE,' + datasetHistory.tenant + ',TENANT_FILIAL,' + '');
      reloadZoomFilterValues('especie', 'TENANT_TABLE,' + datasetHistory.tenant);
      reloadZoomFilterValues('fornecedor', 'TENANT_TABLE,' + datasetHistory.tenant + ',TENANT_FILIAL,' + datasetHistory.filial);
      reloadZoomFilterValues('chave_nfe', 'CHAVE,' + datasetHistory.chaveNFE);
      clearItemsOrderTable();
      clearOrderItems();
      switchToCheckoutMode();
    } else {
      clearItemsOrderTable();
      clearOrderItems();
      switchToCheckoutMode();
      clearHeaderPreNota();
    }

    //$("#fornecedor").attr("readonly", datasetHistory.tenant == "");
    //$("#pedidos").attr("readonly", datasetHistory.tenant == "" || $("#hidden_fornecedor").val() == "");
  }

  setSelectedZoomItem = selectedItem => onZoomFieldChanged(selectedItem);

  onZoomFieldChanged = selectedItem => {
    console.log(selectedItem);

    if (selectedItem['inputName'].match(/tenant/g)) {
      var nomemp = selectedItem.fieldtext;
      $('.tenant').children('p').text(nomemp);
      $('#fName_Emp').val(nomemp);
      $('#hidden_filial').val(selectedItem.filial);
      $('#descgrp').val(selectedItem.descgrp);

      empresa = selectedItem.chave.split('.')[0] + '0';
      //Carregas Fornecedor//
      var settings3 = {
        source: {
          url: '/api/public/ecm/dataset/search?datasetId=ds_fornecedor_preNota&searchField=A2_CGC&filterFields=empresa,' + empresa + '&',
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
              title: 'Nota',
              size: 'col-md-2',
              dataorder: 'A2_CGC',
              standard: true
            },
            {
              title: 'Descrição',
              size: 'col-md-2',
              dataorder: 'A2_NREDUZ'
            },
            {
              title: 'Loja',
              size: 'col-md-2',
              dataorder: 'A2_LOJA '
            },
            {
              title: 'Codigo',
              size: 'col-md-2',
              dataorder: 'A2_COD '
            }
          ],
          renderContent: ['A2_CGC', 'A2_NREDUZ','A2_LOJA','A2_COD']
        }
      };

      if (window.filter3) {
        window.filter3.reload(settings3);
      } else {
        window.filter3 = FLUIGC.filter('#fornecedor', settings3);
        filter3.on('fluig.filter.item.added', function (data) {

          setTimeout(function() {
            
            reloadZoomFilterValues(
              'pedidos',
              'TENANT_TABLE,' + $('#hidden_tenant').val().split('.')[0] +'0'+ ',TENANT_FILIAL,' + $('#hidden_tenant').val().split('.')[1]+ ',FORNECEDOR,' + $('#fornecedor').val()
            );
          }, 1000);
  
         
          //$('#descricao2').val(data.item.A2_NREDUZ);
          $('.fFornece').children('p').text(data.item.A2_NREDUZ);
          $('#A2AUTSPED').val(data.item.A2_AUTSPED);
          $('#loja').val(data.item.A2_LOJA);
          $('#codFornecedor').val(data.item.A2_COD);
          
          
        });
      }

      //Carregas Fornecedor2//
      var settings4 = {
        source: {
          url: '/api/public/ecm/dataset/search?datasetId=ds_fornecedor_preNota&searchField=A2_CGC&filterFields=empresa,' + empresa + '&',
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
              title: 'Nota',
              size: 'col-md-2',
              dataorder: 'A2_CGC',
              standard: true
            },
            {
              title: 'Descrição',
              size: 'col-md-2',
              dataorder: 'A2_NREDUZ'
            }
          ],
          renderContent: ['A2_CGC', 'A2_NREDUZ','A2_LOJA','A2_COD']
        }
      };

      if (window.filter4) {
        window.filter4.reload(settings4);
      } else {
        window.filter4 = FLUIGC.filter('#fornecedor2', settings4);

        filter4.on('fluig.filter.item.added', function (data) {
          $('#descricao2').val(data.item.A2_NREDUZ);

          $('#loja2').val(data.item.A2_LOJA);
          $('#codFornecedor2').val(data.item.A2_COD);

        });
      }

      //carrega produtos
      carregaDados(empresa, selectedItem.filial);
    }

    if (selectedItem['inputName'].match(/chave_nfe/g)) {
      $('#numero').val(selectedItem.cNF);
    }

    if (selectedItem['inputName'].match(/produto2/g)) {
      var index = selectedItem.inputName.split('___');
      $('#nome_produto2___' + index[1]).val(selectedItem.B1_COD);
    }

    if (selectedItem['inputName'].match(/pedidos/g)) {
      var dEmissPed = '';
      var c1 = DatasetFactory.createConstraint(
        'TENANT_TABLE',
        $('#hidden_tenant').val().split('.')[0] + '0',
        $('#hidden_tenant').val().split('.')[0] + '0',
        ConstraintType.MUST
      );
      var c2 = DatasetFactory.createConstraint(
        'TENANT_FILIAL',
        $('#hidden_tenant').val().split('.')[1],
        $('#hidden_tenant').val().split('.')[1],
        ConstraintType.MUST
      );
      var c3 = DatasetFactory.createConstraint('PEDIDO', selectedItem.C7_NUM, selectedItem.C7_NUM, ConstraintType.MUST);
      var dataset = DatasetFactory.getDataset('dsItensPedido', null, new Array(c1, c2, c3), null);

      if (dataset.values.length > 0) {
        for (let index = 0; index < dataset.values.length; index++) {
          var retorno = validaItemPedido(dataset.values[index].C7_NUM, dataset.values[index].C7_ITEM);

          if (retorno == false) {
            var n = wdkAddChild('itens');
            dEmiss = dataset.values[index].C7_EMISSAO;
            $('#pedido___' + n).val(dataset.values[index].C7_NUM);
            $('#item_pedido___' + n).val(dataset.values[index].C7_ITEM);
            $('#produto___' + n).val(dataset.values[index].C7_PRODUTO);
            $('#nome_produto___' + n).val(dataset.values[index].C7_DESCRI);
            $('#qtdade___' + n).val(dataset.values[index].C7_QUANT);
            $('#valor_unitario___' + n).val(dataset.values[index].C7_PRECO);
            
            $('#centro_custo___' + n).val(dataset.values[index].C7_CC);

           var total = parseFloat(dataset.values[index].C7_QUANT)*parseFloat(dataset.values[index].C7_PRECO);
            $('#valor_total___' + n).val(total);


          } else {
            FLUIGC.toast({
              title: 'Atenção: ',
              message: 'Pedido: ' + dataset.values[index].C7_NUM + ' Item: ' + dataset.values[index].C7_ITEM + ' já está cadastro',
              type: 'danger'
            });
          }
        }

        dEmissPed = dateStringToDate(dEmiss);
        var data = $('#data_emissao').val();
        data = data.split('/');
        var dataSelecionada = data[2] + '-' + data[1] + '-' + data[0];
        var date = new Date(data[2] + '-' + data[1] + '-' + data[0]);

        if (dEmissPed > date) {
          var year = dEmiss.substring(0, 4);
          var month = dEmiss.substring(4, 6);
          var day = dEmiss.substring(6, 8);
          var dtPed = day + '/' + month + '/' + year;
          FLUIGC.toast({
            title: 'Atenção: ',
            message:
              'A data do pedido selecionado é maior que a data de emissao da NF.<br>Data do Pedido: ' +
              dtPed +
              '<br>Está solicitação irá passar por uma aprovação',
            type: 'danger'
          });
        }
      }

      $('#pedidos').empty();
    }
  };
});

function validaItemPedido(C7_NUM, C7_ITEM) {
  var ret = false;
  $('input[id^="pedido___"]').each(function (x) {
    var context = $(this);
    var linha = context.attr('id').split('___')[1];

    var pedido = $('#pedido___' + linha).val();
    var item = $('#item_pedido___' + linha).val();

    if (pedido == C7_NUM && item == C7_ITEM) {
      ret = true;
    }
  });

  return ret;
}
