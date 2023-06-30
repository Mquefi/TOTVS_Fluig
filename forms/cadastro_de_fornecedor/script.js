var controle = [];
var FTDForms = {
		params: {},
		initForm: function(params) {    
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
		onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)
			if($("#cod_fornecedor").val() != ""){
				$(".fornecedorID").html($("#cod_fornecedor").val());
			}
			
		},
		onEdit: function(params) {  //Edição do formulário 
			var WKNumState = params.WKNumState;
			var cod_usuario = params.WKNumState;
			$(".fechado").hide();

			$("#A2_CEP").change(function(){
				getCep($(this).val());
			});
			
			if(WKNumState == 0 || WKNumState == 41 || WKNumState == 11 || WKNumState == 21 || WKNumState == 49 || WKNumState == 46){
				$('#A2_CEP').mask('00000-000');
				$('#A2_CGC').mask('00.000.000/0000-00', {reverse: true});
				$('#A2_TEL').mask('0000-0000');
				$('#A2_FAX').mask('00000-0000');
			}
			
			
			
			if(WKNumState == 11 || WKNumState == 14 || WKNumState == 17 ){
				$(".bloqueia").attr("readonly","readonly");
				$("#A2_TIPCTA option:not(:selected)").attr("disabled",true);
				$("#A2_TIPO option:not(:selected)").attr("disabled",true);
			}

			if(WKNumState == 0 || WKNumState == 0 || WKNumState == 14 || WKNumState == 17 ){
				$(".bloqueiaFiscal").attr("readonly","readonly");
				$("#A2_RECISS option:not(:selected)").attr("disabled",true);
				$("#A2_RECINSS option:not(:selected)").attr("disabled",true);
				$("#A2_TPESSOA option:not(:selected)").attr("disabled",true);
				$("#A2_RECPIS option:not(:selected)").attr("disabled",true);
				$("#A2_RECCOFI option:not(:selected)").attr("disabled",true);
				$("#A2_RECCSLL option:not(:selected)").attr("disabled",true);

			}


			if(WKNumState == 28 || WKNumState == 14 ){
				$('#A2_CGC').mask('00.000.000/0000-00', {reverse: false});

				$('#A2_CGC').val($('#A2_CGC').val().replace(".","").replace(".","").replace("/","").replace("-",""));
			}


			if(WKNumState == 41){

				setTimeout(alertFunc, 2000);
				
			}
		
		}                           
};

function UpperCaseA2_END() {
	var x = document.getElementById("A2_END");
	x.value = x.value.toUpperCase();
}
function UpperCaseA2_BAIRRO() {
	var x = document.getElementById("A2_BAIRRO");
	x.value = x.value.toUpperCase();
}


function alertFunc() {
	reloadZoomFilterValues("A2_BANCO", "TENANT_TABLE," + $("#hidden_tenant").val().split(".")[0] + "0" + ",TENANT_FILIAL," + $("#hidden_filial").val());
	reloadZoomFilterValues("A2_CONTA", "TENANT_TABLE," + $("#hidden_tenant").val().split(".")[0] + "0" + ",TENANT_FILIAL," + $("#hidden_filial").val());
  }




function setSelectedZoomItem(selectedItem) {

	if(selectedItem['inputName'].match(/A2_EST/g)){
		$("#A2_EST_COD").val(selectedItem.X5_CHAVE);
		reloadZoomFilterValues("A2_COD_MUN", "X5_CHAVE," + selectedItem["X5_CHAVE"]);
	}
	if(selectedItem['inputName'].match(/A2_COD_MUN/g)){
		$("#A2_COD_MUN_COD").val(selectedItem.CC2_CODMUN);
	}
	if(selectedItem['inputName'].match(/A2_PAIS/g)){
		$("#A2_COD_PAIS").val(selectedItem.YA_CODGI);
	}
	if(selectedItem['inputName'].match(/A2_BANCO/g)){
		$("#A2_BANCO_COD").val(selectedItem.A6_COD);
		//$("#A2_AGENCIA").val(selectedItem.A6_AGENCIA);
	}
	if(selectedItem['inputName'].match(/A2_CONTA/g)){
		$("#A2_CONTA_COD").val(selectedItem.CT1_CONTA);
		//$("#A2_AGENCIA").val(selectedItem.A6_AGENCIA);
	}
	if(selectedItem['inputName'].match(/A2_CODPAIS_DESCRICAO/g)){
		$("#A2_CODPAIS").val(selectedItem.CCH_CODIGO);
		//$("#A2_AGENCIA").val(selectedItem.A6_AGENCIA);
	}

	if(selectedItem['inputName'].match(/tenant/g)){
		$("#descricaoEmpresa").val(selectedItem.Companhia);
		$("#hidden_tenant").val(selectedItem.chave);
		$("#hidden_filial").val(selectedItem.filial)

		var url = selectedItem.chave.split(".");
		$("#url").val(url[0]);
		reloadZoomFilterValues("A2_BANCO", "TENANT_TABLE," + $("#hidden_tenant").val().split(".")[0] + "0" + ",TENANT_FILIAL," + $("#hidden_filial").val());
		reloadZoomFilterValues("A2_CONTA", "TENANT_TABLE," + $("#hidden_tenant").val().split(".")[0] + "0" + ",TENANT_FILIAL," + $("#hidden_filial").val());


		setZoomData("A2_CONTA", "FORNECEDORES");
		$("#A2_CONTA_COD").val("210101101");


		setZoomData("A2_CODPAIS_DESCRICAO", "BRASIL");
		$("#A2_CODPAIS").val("01058");

	}



	
}



function setZoomData(instance, value){
    window[instance].setValue(value);
}

function sendObservation(){

	var n = wdkAddChild('notificacaoQuadro');
	var obs = $('#S1_tex_descSolicitacao').val();

	$("#msg___"+n).val(obs);
	$("#userLogado___"+n).val(user);
	$("#idUser___"+n).val(idUser);
	$("#dataMsg___"+n).val(getDateNow("tds"));
	$("#typeBox___"+n).val("owner pull-left");
	$("#hashTicket___"+n).val($('#hid_hashProcesso').val());
	$("#actionMSG___"+n).val('Solicitação');

	if(obs != '' && obs != null){
		globalMsg.mensagens.push({
			msg:obs,
			user:user,
			idUser:idUser,
			data:getDateNow("tds"),
			typeBox:"owner pull-left",
			hashTicket:$('#hid_hashProcesso').val(),
			actionMSG:'Solicitação'
		});

		globalChats.mensagens.push({
			msg:obs,
			user:user,
			idUser:idUser,
			data:getDateNow("tds"),
			typeBox:"owner pull-left",
			hashTicket:$('#hid_hashProcesso').val(),
			actionMSG:'Solicitação'
		});

		$('#chatSolicitacao').children().remove();
		$('#chatSolicitacao').html(newMessage(globalChats));

		var totalHeight = 0;

			$("#chatSolicitacao").children().each(function(){
				totalHeight = totalHeight + $(this).outerHeight(true);
			});

			$("#chatSolicitacao").scrollTop(totalHeight);	

		$('#S1_tex_descSolicitacao').val('');
		
		
		//Grava DATASET - VIA WEBSERVICE DE CRIAR REGISTRO DE FORMULARIO (form_mensagens_chamados)

	   
	}else{
		FLUIGC.toast({
			title:'Ops!',
			message:'Adicione uma mensagem antes de enviar o comentario',
			type:'info'
		});
	}	
}

function somenteNumeros(num) {
	var er = /[^0-9.]/;
	er.lastIndex = 0;
	var campo = num;
	if (er.test(campo.value)) {
	  campo.value = "";
	}
}

function getCep(cep){
	var url = 'https://viacep.com.br/ws/'+cep+'/json/';

	$.ajax({
		url: url,
		dataType: 'jsonp',
		crossDomain: true,
		contentType: "application/json",
		success : function(json){
			if(json.logradouro){
				$("#A2_END").val(json.logradouro);
				$("#A2_BAIRRO").val(json.bairro);
			}
		}
	});
}


