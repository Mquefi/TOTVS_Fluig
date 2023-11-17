var oProdutos = null;
var row = null;

window.dataTableItens = $(this);
window.oProdutos = $(this).attr('oProdutos')


const carregaDados = (empresa,filial) => {
	FLUIGC.loading(window, {
		textMessage: 'Carregando Produtos da Empresa/Filial selecionada.....aguarde'
	}).show();
	setTimeout(function () {
		loadProdutos(empresa,filial);
		FLUIGC.loading(window).hide();
        $("#addItem").prop('disabled', false);
	}, 8000);
}

loadProdutos = (empresa,filial) => {
    //CARREGA PRODUTOS


    var c1 = DatasetFactory.createConstraint("TENANT_TABLE", empresa, empresa, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("TENANT_FILIAL",filial,filial, ConstraintType.MUST);
    var constraints = new Array(c1, c2);
    var datasetReturned = DatasetFactory.getDataset("dsProdutosProtheus", null, constraints, null);
    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
        var records = datasetReturned.values;
        dataTableItens.myProd = [];
        for (var index in records) {
            var record = records[index];
            dataTableItens.myProd.push({
                B1_COD: record.B1_COD,
                B1_DESC: record.B1_DESC,
                B1_UM: record.B1_UM
            });
        }
    }


    $('#tableSolicitacaoProducts').on('click', '.btn', function (event) {
        var $botao = $(event.target);
        var campo = $botao.closest('tr .btn').attr('id').split('___')[0];
        row = $botao.closest('tr .btn').attr('id').split('___')[1]//$botao.closest('tr').index()
        switch (campo) {
            case "listProdutos":
                openModalPRD();
                break;
        }

    });



    openModalPRD = () => {
        var myTableProd = dataTableItens.myProd;
        var myModal = FLUIGC.modal({
            title: 'Lista de Produtos',
            content: '<span>Selecione um dos itens e clique duas vezes para inseri-lo no formulario</span><div id="produtosModal" style ="height:400px"><table id="tableProd"></table></div>',
            id: 'modalProduto',
            size: 'large',
            actions: [{
                'label': 'Cancelar',
                'autoClose': true,
                'bind': 'data-cancel-modal',
                'classType': 'btn-default'
            }, {
                'label': 'INSERIR >',
                'bind': 'data-produto-modal',
                'classType': 'btn-primary'
            }]

        }, function (err, data) {
            if (err) {
                // do error handling
            } else {
                var table = $('#tableProd').DataTable({
                    "bLengthChange": false,
                    "info": false,
                    "language": {
                        "search": "Buscar",
                        "paginate": {
                            "previous": "Anterior",
                            "next": "Próximo"
                        }
                    },
                    "select": true,
                    "aaData": myTableProd,
                    "aoColumns": [

                        { "mData": "B1_COD", "title": "Codigo" },
                        { "mData": "B1_DESC", "title": "Descrição" },
                        { "mData": "B1_UM", "title": "Unid.Medida" },

                    ]

                })
            }
            $('#tableProd tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    oProdutos = table.row(this).data();
                }
            });
        });

        $("body").on("click", "#modalProduto [data-produto-modal]", function () {
            var fieldID = "produto___" +row;
            var fieldDesc = "nome_produto___" +row;
            var fieldUnid = "unidade_medida___" +row;
            $("#" + fieldID).val(oProdutos.B1_COD);
            $("#" + fieldDesc).val(oProdutos.B1_DESC);
            $("#" + fieldUnid).val(oProdutos.B1_UM);
            $("[data-cancel-modal]").trigger("click");
        });
    
        $("body").on("dblclick", "#modalProduto tr", function () {
            var fieldID   = "produto___" +row;
            var fieldDesc = "nome_produto___" +row;
            var fieldUnid = "unidade_medida___" +row;
            $("#" + fieldID).val(oProdutos.B1_COD);
            $("#" + fieldDesc).val(oProdutos.B1_DESC);
            $("#" + fieldUnid).val(oProdutos.B1_UM);
            $("[data-cancel-modal]").trigger("click");
     
        });
        
    };
}