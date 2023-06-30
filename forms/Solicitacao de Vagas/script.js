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
    $("#nome_adm_obra").html("Aprovador: "+$("#aprovador_Adm_Obra_nome").val());
    $("#nome_adm_Enge").html("Aprovador: "+$("#aprovador_Eng_Gestor_nome").val());
    $("#nome_rh").html("Aprovador: "+$("#aprovador_Rh_Sede_nome").val());


  },
  onEdit: function (params) {
    //Edição do formulário
    var WKNumState = params.WKNumState;
    var cod_usuario = params.WKUser;

    $("#alert").hide();
    $("#nome_adm_obra").html("Aprovador: "+$("#aprovador_Adm_Obra_nome").val());
    $("#nome_adm_Enge").html("Aprovador: "+$("#aprovador_Eng_Gestor_nome").val());
    $("#nome_rh").html("Aprovador: "+$("#aprovador_Rh_Sede_nome").val());

    $(".categoria").hide();
    $(".aprovacao").hide();

    $(".aprova_Adm_Obra").hide();
    $(".aprova_Eng_Gestor").hide();
    $(".aprova_Rh_Sede").hide();

    $("#tipoParente option:not(:selected)").attr("disabled",true);
    $("#tipoParente").attr("readonly",true);

    if(WKNumState == "0" || WKNumState == "4"){
      var dataPrevista = FLUIGC.calendar('#dataPrevista');
      $('#dataPrevista').on('click', function() {
        dataPrevista.setMinDate(new Date());
      })

      setTimeout(function() {
        reloadZoomFilterValues('sec_fun', 'codUsuario,' +cod_usuario);
      }, 1000);


      
    }
    if(WKNumState == "5"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
    }
    if(WKNumState == "15"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
      $(".aprova_Eng_Gestor").show();

      $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
      $("#aprova_Adm_Obra").attr("readonly",true);
      $("#obs_Adm_Obra").attr("readonly",true);
      
    }
    if(WKNumState == "20"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
      $(".aprova_Eng_Gestor").show();
      $(".aprova_Rh_Sede").show();

      $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
      $("#aprova_Adm_Obra").attr("readonly",true);
      $("#obs_Adm_Obra").attr("readonly",true);


      $("#aprova_Eng_Gestor option:not(:selected)").attr("disabled",true);
      $("#aprova_Eng_Gestor").attr("readonly",true);
      $("#obs_Eng_Gestor").attr("readonly",true);
    }

  
    $(document).on('click', '#substituicao', function(){	
        var substituicao = $(this).val();
        if(substituicao == '1'){
          $("#matricula").attr("readonly",false);
          $("#nome").attr("readonly",false);
        }else{
          $("#matricula").attr("readonly",true);
          $("#nome").attr("readonly",true);
        }
    });

    $(document).on('click', '#possuiCandidato', function(){	
      var possuiCandidato = $(this).val();
      if(possuiCandidato == '1'){
        $("#nomeCandidato").attr("readonly",false);
        $("#cpfCandidato").attr("readonly",false);
        $("#estado").attr("readonly",false);
        $("#municipio").attr("readonly",false);
        $("#trabalho").attr("readonly",false);
        $("#indicacao").attr("readonly",false);
        $("#parente").attr("readonly",false);
      }else{
        $("#nomeCandidato").attr("readonly",true);
        $("#cpfCandidato").attr("readonly",true);
        $("#estado").attr("readonly",true);
        $("#municipio").attr("readonly",true);
        $("#trabalho").attr("readonly",true);
        $("#indicacao").attr("readonly",true);
        $("#parente").attr("readonly",true);
      }
    });

    $(document).on('click', '#indicacao', function(){	
      var indicacao = $(this).val();
      if(indicacao == '1'){
        $("#nomeQUemIndicou").attr("readonly",false);
      }else{
        $("#nomeQUemIndicou").attr("readonly",true);
      }
    });

    $(document).on('click', '#parente', function(){	
      var parente = $(this).val();
      if(parente == '1'){
        $("#NomeParente").attr("readonly",false);
        $("#tipoParente option:not(:selected)").attr("disabled",false);
        $("#tipoParente").attr("readonly",false);

      }else{
        $("#NomeParente").attr("readonly",true);
        $("#tipoParente option:not(:selected)").attr("disabled",true);
        $("#tipoParente").attr("readonly",true);
      }
    });



  }
};

function desabilitaZoom(instance){
  window[instance].disable(true);
return;
}


function bloqueiaCampos(){

  setTimeout(function() {
		desabilitaZoom("sec_fun");
		desabilitaZoom("funcao");


    desabilitaZoom("estado");
    desabilitaZoom("municipio");

	}, 1000);
  $("#tipoDeVaga").attr("readonly",true);
  $("#tipoDeVaga option:not(:selected)").attr("disabled",true);

  $("#quantidadeFuncao").attr("readonly",true);
  $("#dataPrevista").attr("readonly",true);

  $("#substituicao").attr("readonly",true);
  $("#substituicao option:not(:selected)").attr("disabled",true);

  $("#possuiCandidato").attr("readonly",true);
  $("#possuiCandidato option:not(:selected)").attr("disabled",true);


  $("#substituicao").attr("readonly",true);
  $("#substituicao option:not(:selected)").attr("disabled",true);


  $("#trabalho").attr("readonly",true);
  $("#trabalho option:not(:selected)").attr("disabled",true);


  $("#indicacao").attr("readonly",true);
  $("#indicacao option:not(:selected)").attr("disabled",true);


  $("#parente").attr("readonly",true);
  $("#parente option:not(:selected)").attr("disabled",true);

}


var beforeSendValidate = function(numState,nextState) {

  var retorno = true;
  var permiteSolicitacao = true;
  if(numState == "0" || numState == "4" ){

    if($("#permiteSolicitacao").val() == "false"){
      permiteSolicitacao = false;
    }
    if($("#tipoDeVaga").val() == ""){
			$("#tipoDeVaga").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#tipoDeVaga").css({"border-color":"green"});
		}


    if($("#funcao").val() == "" || $("#funcao").val() == null ){
			$("#funcao").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#funcao").css({"border-color":"green"});
		}


    if($("#sec_fun").val() == "" || $("#sec_fun").val() == null){
			$("#sec_fun").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#sec_fun").css({"border-color":"green"});
		}

    if($("#quantidadeFuncao").val() == "" && parseInt($("#quantidadeFuncao").val()) > 0){
			$("#quantidadeFuncao").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#quantidadeFuncao").css({"border-color":"green"});
		}


    if($("#dataPrevista").val() == ""){
			$("#dataPrevista").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#dataPrevista").css({"border-color":"green"});
		}

    if($("#substituicao").val() == "1" && $("#matricula").val() == ""){
			$("#matricula").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#matricula").css({"border-color":"green"});
		}

    if($("#substituicao").val() == "1" && $("#nome").val() == ""){
			$("#nome").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#nome").css({"border-color":"green"});
		}


    if($("#possuiCandidato").val() == "1" && $("#nomeCandidato").val() == ""){
			$("#nomeCandidato").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#nomeCandidato").css({"border-color":"green"});
		}


    if($("#estado").val() == "" || $("#estado").val() == null){
			$("#estado").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#estado").css({"border-color":"green"});
		}

    if($("#municipio").val() == "" || $("#municipio").val() == null){
			$("#municipio").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#municipio").css({"border-color":"green"});
		}


    if($("#indicacao").val() == "1" && $("#nomeQUemIndicou").val() == ""){
			$("#nomeQUemIndicou").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#nomeQUemIndicou").css({"border-color":"green"});
		}

    if($("#parente").val() == "1" && $("#NomeParente").val() == ""){
			$("#NomeParente").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#NomeParente").css({"border-color":"green"});
		}


    
    if($("#parente").val() == "1" && $("#tipoParente").val() == ""){
			$("#tipoParente").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#tipoParente").css({"border-color":"green"});
		}

  }

  if(numState == "5" ){
    if($("#aprova_Adm_Obra").val() == "2" && $("#obs_Adm_Obra").val() == ""){
			$("#obs_Adm_Obra").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#obs_Adm_Obra").css({"border-color":"green"});
		}
  }


  if(numState == "15" ){
    if($("#aprova_Eng_Gestor").val() == "2" && $("#obs_Eng_Gestor").val() == ""){
			$("#obs_Eng_Gestor").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#obs_Eng_Gestor").css({"border-color":"green"});
		}
  }


  if(numState == "20" ){
    if($("#aprova_Rh_Sede").val() == "2" && $("#obs_Rh_Sede").val() == ""){
			$("#obs_Rh_Sede").css({"border-color":"red"});
			retorno = false;
		}else{
			$("#obs_Rh_Sede").css({"border-color":"green"});
		}
  }

  if(retorno == false){
    FLUIGC.toast({
      title: 'Atenção: ',
      message: 'Campos sinalizados em vermelho são obrigatórios',
      type: 'warning'
    });
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


function setSelectedZoomItem(selectedItem) {
  console.log(selectedItem);

  if (selectedItem['inputName'].match(/funcao/g)) {
    $('#descricaoFuncao').val(selectedItem.Descricao);
    $('#salarioBase').val(selectedItem.SalarioBase);

    
    var c24 = DatasetFactory.createConstraint("funcao", selectedItem.Funcao, selectedItem.Funcao, ConstraintType.MUST);
    var func = DatasetFactory.getDataset('get_subCategorias',null,[c24],null);
    if(func.values.length > 0){
      $(".categoria").show();
      reloadZoomFilterValues('subcategoria', 'funcao,' +selectedItem.Funcao);
    }else{
      $(".categoria").hide();
    }

  }

  if (selectedItem['inputName'].match(/estado/g)) {
    $('#descricaoEstado').val(selectedItem.Descricao);

    reloadZoomFilterValues('municipio', 'X5_CHAVE,' +selectedItem.X5_CHAVE);
  }


  if (selectedItem["inputName"].match(/sec_fun/g)) {
    $("#aprovador_Adm_Obra").val(selectedItem["hid_id_Enca"]);
    $("#aprovador_Eng_Gestor").val(selectedItem["hid_id_Enge"]);
    $("#aprovador_Rh_Sede").val(selectedItem["hid_id_RH"]);


    $("#aprovador_Adm_Obra_nome").val(selectedItem["S0_txt_enca"]);
    $("#aprovador_Eng_Gestor_nome").val(selectedItem["S0_txt_eng"]);
    $("#aprovador_Rh_Sede_nome").val(selectedItem["S0_txt_rh"]);



    

    var papel = selectedItem["S0_txt_papel"];

    
    
    var c24 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", selectedItem["S0_txt_papel"], selectedItem["S0_txt_papel"], ConstraintType.MUST);
    var c25 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getUserCode(), getUserCode(), ConstraintType.MUST);
    var role = DatasetFactory.getDataset('workflowColleagueRole',null,[c24,c25],null);
    role = role.values;
    
    if(role.length == 0){
      FLUIGC.toast({
        title: 'Atenção: ',
        message: 'Você não pode iniciar uma solicitação para a Seção solicitada',
        type: 'danger'
        });
        $("#permiteSolicitacao").val("false");
    }else{
        $("#permiteSolicitacao").val("true");
    }
  }








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
