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

    $(".recepcao").hide();
    $(".solicitante").hide();
    if(WKNumState == "0" || WKNumState == "4"){
      $("#solicitacaoDeValor").mask('000.000.000.000.000,00', {reverse: true});
      var dataDoServico = FLUIGC.calendar('#dataDoServico');
      $('#dataDoServico').on('click', function() {
        dataDoServico.setMinDate(new Date());
      })
    }


    if(WKNumState == "5"){
      bloqueaCampo();
      $(".recepcao").show();

      if($("#observaocaoSolicitante").val() != ""){
        $("#observaocaoSolicitante").attr("readonly", true);
        $(".solicitante").show();
      }
    }


    if(WKNumState == "13"){
      $(".recepcao").show();
      $("#observaocaoRecepcao").attr("readonly", true);
    }

    if(WKNumState == "11"){
      bloqueaCampo();
      $(".recepcao").show();
      $("#observaocaoRecepcao").attr("readonly", true);
      $(".solicitante").show();

    
    }
    
    

  }
};

function desabilitaZoom(instance){
  window[instance].disable(true);
return;
}

function bloqueaCampo(){

  setTimeout(function() {
		desabilitaZoom("centroCusto");

	}, 1000);
  $("#dataDoServico").attr("readonly", true);
  $("#solicitacaoDeValor").attr("readonly", true);
  $("#relacaoDoc").attr("readonly", true);
  $("#descricaoDoServico").attr("readonly", true);


  $("#empresa").attr("readonly", true);
  $("#contato").attr("readonly", true);
  $("#endereco").attr("readonly", true);
  $("#numero").attr("readonly", true);
  

}

var beforeSendValidate = function(numState,nextState) {

  var retorno = true;
  if(numState == "0" || numState == "4" ){
    if($("#dataDoServico").val() == ""){
			$("#dataDoServico").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#dataDoServico").css({"border-color":"green"});
		}


    if($("#descricaoDoServico").val() == ""){
			$("#descricaoDoServico").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#descricaoDoServico").css({"border-color":"green"});
		}


    if($("#empresa").val() == ""){
			$("#empresa").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#empresa").css({"border-color":"green"});
		}

    if($("#contato").val() == ""){
			$("#contato").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#contato").css({"border-color":"green"});
		}


    if($("#endereco").val() == ""){
			$("#endereco").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#endereco").css({"border-color":"green"});
		}

    if($("#numero").val() == ""){
			$("#numero").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#numero").css({"border-color":"green"});
		}



    if(retorno == false){
      
        FLUIGC.toast({
          title: 'Atenção: ',
          message: 'Campos sinalizados em vermelho são obrigatórios',
          type: 'warning'
        });
      
    }
    return retorno;




  }






}

