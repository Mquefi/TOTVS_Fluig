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
    var cod_usuario = params.WKUser;

    $("#trabalho option:not(:selected)").attr("disabled",true);
    $("#trabalho").attr("readonly",true);
    $("#indicacao option:not(:selected)").attr("disabled",true);
    $("#indicacao").attr("readonly",true);
    $("#parente option:not(:selected)").attr("disabled",true);
    $("#parente").attr("readonly",true);
   

    if($("#temCandidato").val() == "Sim"){
      $(".temCandidato").show();
      $(".semCandidato").hide();
    }else{
      $(".semCandidato").show();
      $(".temCandidato").hide();
    }

    if(WKNumState == "11" || WKNumState == "20"  ){
      bloqueiaCampos();
    }

    if(WKNumState == "29"){
      bloqueiaCampos();
    }


    if(WKNumState == "24"){
      bloqueiaCampos();
    }

    if(WKNumState == "18"){
      setTimeout(function() {

        desabilitaZoom("estado");
        desabilitaZoom("municipio");
    
      }, 1000);
      $(".bloc").attr("readonly",true);
      $("#numeroMatricula").attr("readonly",true);
      

    }

    if(WKNumState == "14"){
      bloqueiaCampos();
      $("#estadoCivil option:not(:selected)").attr("disabled",false);
      $("#estadoCivil").attr("readonly",false);

      $("#escolaridade option:not(:selected)").attr("disabled",false);
      $("#escolaridade").attr("readonly",false);

      $("#dependenteIRRF option:not(:selected)").attr("disabled",false);
      $("#dependenteIRRF").attr("readonly",false);


      
      $("#numeroMatricula").attr("readonly",true);

      $("#anexoDocumento").attr("disabled",false);

      
      $(document).on('change', '#dependenteIRRF', function(){	
        var dependenteIRRF = $(this).val();

        if(dependenteIRRF == '1'){
          $("#inputAdicionar").attr("disabled",false);
        }else{
          $("#inputAdicionar").attr("disabled",true);
          
        }
      });


      $("#telefoneColaborador").attr("readonly",false);
      $("#telefoneEmergencia").attr("readonly",false);
      $("#nomePessoaEmergincia").attr("readonly",false);

      $(".bloc").attr("readonly",false);
      $(".bloc").prop("disabled", false);
   
    }




  }
};

function desabilitaZoom(instance){
  window[instance].disable(true);
return;
}



function showCamera(obj) {
  console.log(obj);
    JSInterface.showCamera();
}

function bloqueiaCampos(){

  setTimeout(function() {

    desabilitaZoom("estado");
    desabilitaZoom("municipio");

	}, 1000);
  $("#nomeCompletoCandidato").attr("readonly",true);
  $("#obsSemCandidato").attr("readonly",true);

  $("#estadoCivil option:not(:selected)").attr("disabled",true);
  $("#estadoCivil").attr("readonly",true);

  $("#escolaridade option:not(:selected)").attr("disabled",true);
  $("#escolaridade").attr("readonly",true);

  $("#dependenteIRRF option:not(:selected)").attr("disabled",true);
  $("#escolaridade").attr("readonly",true);

  $("#inputAdicionar").attr("disabled",true);
  $("#anexoDocumento").attr("disabled",true);

  $("#dependenteIRRF option:not(:selected)").attr("disabled",true);
  $("#dependenteIRRF").attr("readonly",true);


  $("#telefoneColaborador").attr("readonly",true);
  $("#telefoneEmergencia").attr("readonly",true);
  $("#nomePessoaEmergincia").attr("readonly",true);


  
  $(".bloc").attr("readonly",true);
 



  

  

}


var beforeSendValidate = function(numState,nextState) {

  var retorno = true;
  var permiteSolicitacao = true;


  if(numState == "11" ){
    if($("#numeroMatricula").val() == ""){
			$("#numeroMatricula").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#numeroMatricula").css({"border-color":"green"});
		}
  }


  if(numState == "14" ){
    if($("#estadoCivil").val() == ""){
			$("#estadoCivil").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#estadoCivil").css({"border-color":"green"});
		}

    if($("#escolaridade").val() == ""){
			$("#escolaridade").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#escolaridade").css({"border-color":"green"});
		}

    if($("#telefoneColaborador").val() == ""){
			$("#telefoneColaborador").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#telefoneColaborador").css({"border-color":"green"});
		}


    if($("#telefoneEmergencia").val() == ""){
			$("#telefoneEmergencia").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#telefoneEmergencia").css({"border-color":"green"});
		}


    if($("#nomePessoaEmergincia").val() == ""){
			$("#nomePessoaEmergincia").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#nomePessoaEmergincia").css({"border-color":"green"});
		}



  }


    


  if(permiteSolicitacao == false){
    FLUIGC.toast({
      title: 'Atenção: ',
      message: 'Você não pode iniciar uma solicitação para a Seção solicitada',
      type: 'danger'
    });

    retorno = false;
  }
return retorno;


}



function addDependentes(){
	var id = wdkAddChild('tableFuncao');
}


function setSelectedZoomItem(selectedItem) {



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
