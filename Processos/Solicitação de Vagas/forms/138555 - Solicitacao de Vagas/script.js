//SCRIPT DE VALIDAÇÃO DE PRENCHIMENTO E VISUALIZAÇÃO CONFORME ACESSO

var controle = [];//???
//---------------- NOVA FUNÇÃO ----------------\\
// 1.00.00 - FUNÇÃO PRINCIPAL
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
  
  //1.01.00 SE O FORMULÁRIO ESTIVER EM FORMA DE VISUALIZAÇÃO//
  onView: function (params) {
	    $("#nome_adm_obra").html("Aprovador: "+$("#aprovador_Adm_Obra_nome").val());
	    $("#nome_adm_Enge").html("Aprovador: "+$("#aprovador_Eng_Gestor_nome").val());
	    $("#nome_rh").html("Aprovador: "+$("#aprovador_Rh_Sede_nome").val());
	    $("#nome_diretor").html("Aprovador: "+$("#aprovador_Diretor").val());
	  },
  
  // 1.02.00 SE O FORMULÁRIO ESTIVER EM FORMA DE EDIÇÃO - STATUS ADD OU MOD//
  onEdit: function (params) {
    var WKNumState = params.WKNumState;
    var cod_usuario = params.WKUser;
    
    if(WKNumState == "0" || WKNumState == "4"){
      var dataPrevista = FLUIGC.calendar('#dataPrevista');
      $('#dataPrevista').on('click', function() {
        dataPrevista.setMinDate(new Date());
      })

      setTimeout(function() {
        reloadZoomFilterValues('sec_fun', 'codUsuario,' +cod_usuario);
      }, 1000); 
    }
    
    
    // 1.02.01 VISUALIZAR CAMPOS CONFORME ETAPA DO PROCESSO - FILTRO PELA ID DO CAMPO + N DO PROCESSOs
    if(WKNumState == "0" || WKNumState == "4"){
        $(".aprovacao").show();
        $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
        $("#aprova_Adm_Obra").attr("readonly",true);
        $("#obs_Adm_Obra").attr("readonly",true);

        $("#aprova_Eng_Gestor option:not(:selected)").attr("disabled",true);
        $("#aprova_Eng_Gestor").attr("readonly",true);
        $("#obs_Eng_Gestor").attr("readonly",true);
        
        $("#aprova_Diretor option:not(:selected)").attr("disabled",true);
        $("#aprova_Diretor").attr("readonly",true);
        $("#obs_aprova_Diretor").attr("readonly",true);
        
        $("#aprova_Rh_Sede option:not(:selected)").attr("disabled",true);
        $("#aprova_Rh_Sede").attr("readonly",true);
        $("#obs_Rh_Sede").attr("readonly",true);
      }
    
    
    if(WKNumState == "5"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
      $(".aprova_Diretor").hide();
      $(".aprova_Eng_Gestor").hide();
      $(".aprova_Rh_Sede").hide();
    }
    
    if(WKNumState == "55"){
        bloqueiaCampos();
        $(".aprovacao").show();
        $(".aprova_Diretor").show();
        $(".aprova_Eng_Gestor").hide();
        $(".aprova_Rh_Sede").hide();
     }
    
    if(WKNumState == "15"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
      $(".aprova_Eng_Gestor").show();
      $(".aprova_Rh_Sede").hide();
      $(".aprova_Diretor").hide();

      $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
      $("#aprova_Adm_Obra").attr("readonly",true);
      $("#obs_Adm_Obra").attr("readonly",true);
      
    }
    if(WKNumState == "20"){
      bloqueiaCampos();
      $(".aprovacao").show();
      $(".aprova_Adm_Obra").show();
      $(".aprova_Eng_Gestor").show();
      $(".aprova_Diretor").show();
      $(".aprova_Rh_Sede").show();

      $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
      $("#aprova_Adm_Obra").attr("readonly",true);
      $("#obs_Adm_Obra").attr("readonly",true);

      $("#aprova_Eng_Gestor option:not(:selected)").attr("disabled",true);
      $("#aprova_Eng_Gestor").attr("readonly",true);
      $("#obs_Eng_Gestor").attr("readonly",true);
      
      $("#aprova_Diretor option:not(:selected)").attr("disabled",true);
      $("#aprova_Diretor").attr("readonly",true);
      $("#obs_aprova_Diretor").attr("readonly",true);
    }
    
    if(WKNumState == "28" || WKNumState == "35"){
        
        $(".aprovacao").show();
        $(".aprova_Adm_Obra").show();
        $(".aprova_Eng_Gestor").show();
        $(".aprova_Diretor").show();
        $(".aprova_Rh_Sede").show();

        $("#aprova_Adm_Obra option:not(:selected)").attr("disabled",true);
        $("#aprova_Adm_Obra").attr("readonly",true);
        $("#obs_Adm_Obra").attr("readonly",true);

        $("#aprova_Eng_Gestor option:not(:selected)").attr("disabled",true);
        $("#aprova_Eng_Gestor").attr("readonly",true);
        $("#obs_Eng_Gestor").attr("readonly",true);
        
        $("#aprova_Diretor option:not(:selected)").attr("disabled",true);
        $("#aprova_Diretor").attr("readonly",true);
        $("#obs_aprova_Diretor").attr("readonly",true);
        
        $("#aprova_Rh_Sede option:not(:selected)").attr("disabled",true);
        $("#aprova_Rh_Sede").attr("readonly",true);
        $("#obs_Rh_Sede").attr("readonly",true);
      }

    // 1.02.02 BLOQUEAR CAMPO EDIÇÃO CONFORME SELEÇÃO EM CAMPO PAI
    $(document).on('click', '#substituicao', function(){	
        var substituicao = $(this).val();
        if(substituicao == '1'){
          $("#matricula").attr("readonly",false);
          $("#nome").attr("readonly",false);
          $("#fluigRescisao").attr("readonly",false);
        }else{
          $("#matricula").attr("readonly",true);
          $("#nome").attr("readonly",true);
          $("#fluigRescisao").attr("readonly",true);
        }
    });
  }//TERMINA FUNÇÃO DE EDIÇÃO OU MOD
};//TERMINA FUNÇÃO PRINCIPAL


//---------------- NOVA FUNÇÃO ----------------\\

// DESABILITAR ZOOM //
function desabilitaZoom(instance){
  window[instance].disable(true);
return;
}

//---------------- NOVA FUNÇÃO ----------------\\
// FUNÇÃO PRA BLOQUEAR OS CAMPOS DO FORMULÁRIO PRA EDIÇÃO, NOS PROCESSOS DE APROVAÇÃO//
function bloqueiaCampos(){

	setTimeout(function() {
	desabilitaZoom("S0_txt_desc");
	desabilitaZoom("funcao");
	desabilitaZoom("gestorVaga");

	}, 1000);
	
	// DIV DADOS DA SOLICITAÇÃO
	
	//DEPARTAMENTO
	$("#S0_txt_grupo").attr("readonly",true);
	$("#S0_txt_grupo option:not(:selected)").attr("disabled",true);
	
	//SEÇÃO
	$("#S0_txt_desc").attr("readonly",true);
	$("#S0_txt_desc option:not(:selected)").attr("disabled",true);
	
	//SETOR
	$("#setor").attr("readonly",true);
	$("#setor option:not(:selected)").attr("disabled",true);
	
	//REGIME DE CONTRATAÇÃO
	$("#tipoDeVaga").attr("readonly",true);
	$("#tipoDeVaga option:not(:selected)").attr("disabled",true);

	//QTDE VAGAS
	$("#quantidadeFuncao").attr("readonly",true);

	//DATA PREVISTA ADMISSÃO
	$("#dataPrevista").attr("readonly",true);

	//GESTOR DA VAGA
	$("#gestorVaga").attr("readonly",true);
	$("#gestorVaga option:not(:selected)").attr("disabled",true);
	
	//TIPO DE VAGA
	$("#substituicao").attr("readonly",true);
	$("#substituicao option:not(:selected)").attr("disabled",true);
  
	//MATRICULA
	$("#matricula").attr("readonly",true);
  
	//NOME DO SUBSTITUÍDO
	$("#nome").attr("readonly",true);
  
	//NÚMERO RESCISÃO FLUIG
	$("#fluigRescisao").attr("readonly",true);
	
	//FUNÇÃO
	$("#funcao").attr("readonly",true);
	$("#funcao option:not(:selected)").attr("disabled",true);

	//SUBCATEGORIA
	$("#subcategoria").attr("readonly",true);
	$("#subcategoria option:not(:selected)").attr("disabled",true);
	
	//SALÁRIO  
	$("#salarioBase").attr("readonly",true);


	//---------------- NOVA FUNÇÃO ----------------\\
	//FUNÇÃO QUE VALIDA OS CAMPOS NÃO PREENCIDOS, SINALIZA CAMPOS OBRIGATÓRIOS E DISPARA UM POP-UP DE AVISO//
	var beforeSendValidate = function(numState,nextState) {

	  var retorno = true;
	  var permiteSolicitacao = true;
	  
	  //PROCESSO 0 OU 4
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
	    
	    if($("#S0_txt_desc").val() == "" || $("#S0_txt_desc").val() == null){
				$("#S0_txt_desc").css({"border-color":"red"});
				retorno = false;
			}else{
				$("#S0_txt_desc").css({"border-color":"green"});
			}
	    
	    if($("#quantidadeFuncao").val() == "" || parseInt($("#quantidadeFuncao").val()) < 1){
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

	  // PROCESSO 5
	  if(numState == "5" ){
	    if($("#aprova_Adm_Obra").val() == "2" && $("#obs_Adm_Obra").val() == ""){
				$("#obs_Adm_Obra").css({"border-color":"red"});
				retorno = false;
			}else{
				$("#obs_Adm_Obra").css({"border-color":"green"});
			}
	  }

	  // PROCESSO 15
	  if(numState == "15" ){
	    if($("#aprova_Eng_Gestor").val() == "2" && $("#obs_Eng_Gestor").val() == ""){
				$("#obs_Eng_Gestor").css({"border-color":"red"});
				retorno = false;
			}else{
				$("#obs_Eng_Gestor").css({"border-color":"green"});
			}
	  }

	  // PROCESSO 20
	  if(numState == "20" ){
	    if($("#aprova_Rh_Sede").val() == "2" && $("#obs_Rh_Sede").val() == ""){
				$("#obs_Rh_Sede").css({"border-color":"red"});
				retorno = false;
			}else{
				$("#obs_Rh_Sede").css({"border-color":"green"});
			}
	  }
	  
		// PROCESSO 55
		  if(numState == "55" ){
		    if($("#aprova_Diretor").val() == "2" && $("#obs_aprova_Diretor").val() == ""){
					$("#aprova_Diretor").css({"border-color":"red"});
					retorno = false;
				}else{
					$("#aprova_Diretor").css({"border-color":"green"});
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
	      message: 'Você não pode iniciar uma solicitação para a Seção solicitada, caso você deseje acesso, entre em contato com o RH Sede e solicite o cadastro do seu usuário na seção.',
	      type: 'danger'
	    });

	    retorno = false;
	  }
	return retorno;
	}

//---------------- NOVA FUNÇÃO ----------------\\
//ADICIONA A DESCRIÇÃO AUTOMATICAMENTE CONFORME ZOOM E CAMPO AUXILIAR
function setSelectedZoomItem(selectedItem) {
	  console.log(selectedItem);

	  if (selectedItem['inputName'].match(/funcao/g)) {
	    $('#descricaoFuncao').val(selectedItem.Descricao);
	    $('#salarioBase').val(selectedItem.SalarioBase);	    
	    var c24 = DatasetFactory.createConstraint("funcao", selectedItem.Funcao, selectedItem.Funcao, ConstraintType.MUST);
	    var func = DatasetFactory.getDataset('get_subCategorias',null,[c24],null);
	    if(func.values.length > 0){
	      /*$(".categoria").show();*/
	      reloadZoomFilterValues('subcategoria', 'funcao,' +selectedItem.Funcao);
	    }else{
	      $(".categoria").hide();
	    }
	  }
	  
	  if (selectedItem['inputName'].match(/estado/g)) {
	    $('#descricaoEstado').val(selectedItem.Descricao);

	    reloadZoomFilterValues('municipio', 'X5_CHAVE,' +selectedItem.X5_CHAVE);
	  }

	  if (selectedItem["inputName"].match(/S0_txt_desc/g)) {
	    $("#aprovador_Adm_Obra").val(selectedItem["hid_id_Enca"]);
	    $("#aprovador_Eng_Gestor").val(selectedItem["hid_id_Enge"]);
	    $("#aprovador_Rh_Sede").val(selectedItem["hid_id_RH"]);
	    $("#aprovador_Diretor").val(selectedItem["hid_id_Dire"]);
	    $("#aprovador_Coordenador").val(selectedItem["hid_id_Cord"]);


	    $("#aprovador_Adm_Obra_nome").val(selectedItem["S0_txt_enca"]);
	    $("#aprovador_Eng_Gestor_nome").val(selectedItem["S0_txt_eng"]);
	    $("#aprovador_Rh_Sede_nome").val(selectedItem["S0_txt_rh"]);
	    $("#aprovador_Diretor_nome").val(selectedItem["S0_txt_dire"]);
	    $("#aprovador_Coordenador_nome").val(selectedItem["S0_txt_cordeng"]);
	    
	    $("#centrocusto").val(selectedItem["S0_txt_ccusto"]);
	    $("#desccentrocusto").val(selectedItem["S0_txt_desc"]);
	    $("#regional").val(selectedItem["S0_txt_grupo"]);


	    var papel = selectedItem["S0_txt_papel"];

	    
	    var c24 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", selectedItem["S0_txt_papel"], selectedItem["S0_txt_papel"], ConstraintType.MUST);
	    var c25 = DatasetFactory.createConstraint("workflowColleagueRolePK.colleagueId", getUserCode(), getUserCode(), ConstraintType.MUST);
	    var role = DatasetFactory.getDataset('workflowColleagueRole',null,[c24,c25],null);
	    role = role.values;
	    
	    if(role.length == 0){
	      FLUIGC.toast({
	        title: 'Atenção: ',
	        message: 'Você não pode iniciar uma solicitação para a Seção solicitada,caso você deseje acesso, entre em contato com o RH Sede e solicite o cadastro do seu usuário na seção.',
	        type: 'danger'
	        });
	        $("#permiteSolicitacao").val("false");
	    }else{
	        $("#permiteSolicitacao").val("true");
	    }
	  }
	}

//---------------- NOVA FUNÇÃO ----------------\\
//PERMITIR SOMENTE NUMEROS
function somenteNumeros(num) {
	  var er = /[^0-9.]/;
	  er.lastIndex = 0;
	  var campo = num;
	  if (er.test(campo.value)) {
	    campo.value = '';
	  }
	}

//---------------- NOVA FUNÇÃO ----------------\\
//CAPTURAR O ENDEREÇO À PARTIR DE UM CEP
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