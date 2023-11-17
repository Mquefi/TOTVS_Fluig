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
  onView: function (params) {
    //Visualização do formulário sem a possibilidade de edição (consulta)
  },
  onEdit: function (params) {
    //Edição do formulário
    var WKNumState = params.WKNumState;
    var cod_usuario = params.WKNumState;





    $(document).on("keyUp", "#especie", function () {
      alert("teste");
      $(this).val($(this).val().toUpperCase());
    });
   

    if(params.PreNotaSemPedido == false){
    	$("#tipo_entrada").val("C");
    	$("#tipo_entrada option:not(:selected)").attr("disabled",true);
		$("#tipo_entrada").attr("readonly",true);
    }
    
    $(".documentos").hide();
    $(".pre-nota-part").hide();
    $(".pre-nota-Num").hide();
    $(".pre-nota-Num2").hide();
    $(".itens2").hide();

    var tipo = $("#tipo_entrada").val();

    if (tipo == "C") {
      $(".documentos").show();
      $(".pre-nota-part").show();
      $(".pre-nota-Num").show();
      $(".pre-nota-Num2").hide();
      $(".itens2").hide();
    } else if (tipo == "S") {
      $(".documentos").show();
      $(".pre-nota-part").hide();
      $(".pre-nota-Num2").show();
      $(".pre-nota-Num").show();
      $(".itens2").show();
    }

    $(document).on("change", "#tipo_entrada", function () {
      var tipo = $(this).val();
      if (tipo == "C") {
        $(".documentos").show();
        $(".pre-nota-part").show();
        $(".pre-nota-Num").show();
        $(".pre-nota-Num2").hide();
        $(".itens2").hide();
      } else {
        $(".documentos").show();
        $(".pre-nota-part").hide();
        $(".pre-nota-Num2").show();
        $(".pre-nota-Num").show();
        $(".itens2").show();
      }
    });

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

    $(document).on("change", ".calcula", function () {
      var quant = $(this).val();
      var context = $(this);
      var linha = context.attr("id").split("___")[1];

      if (quant > 0) {
        var valorTotal = parseFloat(quant) * parseFloat($("#valor_unitario___" + linha).val());
        $("#valor_total___" + linha).val(valorTotal);
      } else {
        FLUIGC.toast({
          title: "Atenção: ",
          message: "A quantidade não pode ser 0",
          type: "danger",
        });

        $("#qtdade___" + linha).val("");
        $("#valor_total___" + linha).val("0");
      }
    });

    /*
    $(document).on("change", ".calcula2", function () {
      var quant = parseFloat($(this).val());
      var context = $(this);
      var linha = context.attr("id").split("___")[1];

      console.log("quant " + quant);

      console.log(
        "valor " +
          $("#valor_unitario2___" + linha)
            .val()
            .replace(/\./g, "")
            .replace(",", ".")
      );

      if (quant > 0) {
        var valorTotal =
          quant *
          parseFloat(
            $("#valor_unitario2___" + linha)
              .val()
              .replace(/\./g, "")
              .replace(",", ".")
          );
        $("#valor_total2___" + linha).val(valorTotal.toFixed(6));
      } else {
        FLUIGC.toast({
          title: "Atenção: ",
          message: "A quantidade não pode ser 0",
          type: "danger",
        });

        $("#qtdade2___" + linha).val("");
        $("#valor_total2___" + linha).val("0");
      }

      calculaTotalSemNota();
    });*/

    //Carregas Notas//
    var settings2 = {
      source: {
        url: "/api/public/ecm/dataset/search?datasetId=ds_header_chave_xml&searchField=IdNota&",
        contentType: "application/json",
        root: "content",
        pattern: "",
        limit: 1,
        offset: 0,
        patternKey: "searchValue",
        limitkey: "limit",
        offsetKey: "offset",
      },
      displayKey: "IdNota",
      multiSelect: false,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Nota",
            size: "col-md-12",
            dataorder: "IdNota",
            standard: true,
          },
        ],
        renderContent: ["IdNota", "nNF", "serie", "dhEmi"],
      },
    };
    var filter2 = FLUIGC.filter("#chave_nfe", settings2);

    filter2.on("fluig.filter.item.added", function (data) {
      var dEmi = data.item.dhEmi.split("T");
      $("#numero").val(data.item.nNF);
      $("#serie").val(data.item.serie);

      var date = dEmi[0].split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];

      $("#data_emissao").val(date);
      reloadFiltroDataEmissao(date);

      calculaData(date);
    });

    if (params.PreNotaSemPedido) {
      const $tipo_entrada = document.querySelector("[tipo_entrada]");
      $tipo_entrada.options[2].removeAttribute("disabled");
    }
  },
};

function calcula2(input) {
  const seq = input.id.split("___")[1];
  const $valorUnitario = document.querySelector("#valor_unitario2___" + seq);
  const $quantidade = document.querySelector("#qtdade2___" + seq);
  const $valorTotal = document.querySelector("#valor_total2___" + seq);

  if ($quantidade.valueAsNumber <= 0) {
    FLUIGC.toast({
      title: "Atenção: ",
      message: "A quantidade não pode ser 0",
      type: "warning",
    });
    $valorTotal.value = "0";
    $quantidade.value = "";
  } else {
    const valorTotal = $valorUnitario.valueAsNumber * $quantidade.valueAsNumber;
    if (Number.isNaN(valorTotal) === false) $valorTotal.value = valorTotal.toFixed(2);
    else $valorTotal.value = "";
  }

  calculaTotalSemNota();
}

function calculaTotalSemNota() {
  var total = 0;
  $('input[id^="valor_unitario2___"]').each(function (x) {
    var context = $(this);
    var linha = context.attr("id").split("___")[1];

    var valorItem = $("#valor_total2___" + linha).val();
    total = parseFloat(total) + parseFloat(valorItem);
  });

  $("#totalSemPedidos").val(total);
}

function calculaData(data) {
 
  var data = $("#data_emissao").val();
  data = data.split("/");
  var dataSelecionada = data[2] + "-" + data[1] + "-" + data[0];
  var date = new Date(data[2] + "-" + data[1] + "-" + data[0]);
  // add a day
  date.setDate(date.getDate() + 7);
  dataCalculada = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  var date2 = new Date();
  dataAtual = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

  var atual = new Date(dataAtual);
  var calculada = new Date(dataCalculada);
  $("#data_emissao_integra").val(dataSelecionada);
  if (dataAtual > dataCalculada) {
    FLUIGC.toast({
      title: "Atenção: ",
      message: "A nota selecionada está fora do prazo para realizar a pre-nota.<br>Está solicitação irá passar por uma aprovação",
      type: "danger",
    });
    $("#hidden_current_date").val("sim");
  } else {
    $("#hidden_current_date").val("nao");
  }
}

function dateStringToDate(dateString) {
  try {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var date = new Date(year, month - 1, day);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date;
  } catch (error) {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const $dataEmissao = document.querySelector("#data_emissao");
  $dataEmissao.onchange = (e) => reloadFiltroDataEmissao(e.target.value);
});

function reloadFiltroDataEmissao(dataEmissao) {
  //Desativando função
  return;
  const value = dataEmissao ? moment(dataEmissao, "DD/MM/YYYY").format("YYYYMMDD") : "";

  reloadZoomFilterValues(
    "pedidos",
    "DATA," + value + ",TENANT_TABLE," + $("#hidden_tenant").val().split(".")[0] + "0",
    $("#hidden_tenant").val().split(".")[0] + "0" + ",TENANT_FILIAL," + $("#hidden_tenant").val().split(".")[0] + "0",
    $("#hidden_tenant").val().split(".")[1] + ",FORNECEDOR," + $("#fornecedor").val()
  );
}
