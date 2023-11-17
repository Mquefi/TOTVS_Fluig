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
			
			
		},
		onEdit: function(params) {  //Edição do formulário 
			var WKNumState = params.WKNumState;
			var cod_usuario = params.WKUser;
			
			console.log("Atividade "+WKNumState);

			if(WKNumState == 5 || WKNumState == 19 || WKNumState == 9 || WKNumState == 29){
				montaIformacao();
			}


			$("#S0_txt_prazo_sol").change(function(){
				var S0_txt_prazo_sol = $(this).val();
				var S0_txt_prazo_sol = S0_txt_prazo_sol.split('/');

				var diaS0_txt_prazo_sol = S0_txt_prazo_sol[0];
				var mesS0_txt_prazo_sol = S0_txt_prazo_sol[1];
				var anoS0_txt_prazo_sol = S0_txt_prazo_sol[2];

				var novaData = anoS0_txt_prazo_sol+mesS0_txt_prazo_sol+diaS0_txt_prazo_sol;

               
				var S0_txt_prazo_estima = $("#S0_txt_prazo_estima").val();


				var S0_txt_prazo_estima2 = $("#S0_txt_prazo_estima").val();

				var S0_txt_prazo_estima = S0_txt_prazo_estima.split('/');

				var diaS0_txt_prazo_estima = S0_txt_prazo_estima[0];
				var mesS0_txt_prazo_estima= S0_txt_prazo_estima[1];
				var anoS0_txt_prazo_estima = S0_txt_prazo_estima[2];

				var novaData2 = anoS0_txt_prazo_estima+mesS0_txt_prazo_estima+diaS0_txt_prazo_estima;

                
				if(novaData < novaData2){
					alert("Prazo estimado não pode ser menos que "+S0_txt_prazo_estima2);
					$(this).val("");
				}
				

				
			});
			

			
		
		}                           
};

function setSelectedZoomItem(selectedItem) {
    if (selectedItem['inputName'].match(/usuario/g)) {
		var index = selectedItem.inputName.split("___");
		$("#nome_usuario___"+index[1]).val(selectedItem.colleagueName);
        $("#email___"+index[1]).val(selectedItem.mail);
		

	}	
}
function excluir(id){
	fnWdkRemoveChild(id);
}

function montaIformacao(){
	

	var c1 = DatasetFactory.createConstraint("hid_numSolicitacao", $("#hid_numSolicitacao").val(), $("#hid_numSolicitacao").val(), ConstraintType.MUST);      
	var constraints   = new Array(c1);
	var dados = DatasetFactory.getDataset('ds_get_monta_info_solicitacao',null,constraints,null);

	if(dados.values.length > 0){
		

		for (var x = 0; x < dados.values.length; x++) {
			

			if(dados.values[x].actionMSG == "Solicitação"){
				globalMsg.mensagens.push({
					msg:dados.values[x].msg,
					user:dados.values[x].userLogado,
					idUser:dados.values[x].idUser,
					data:dados.values[x].dataMsg,
					typeBox:dados.values[x].typeBox,
					hashTicket:dados.values[x].hashTicket,
					actionMSG:dados.values[x].actionMSG
				});
		
				globalChats.mensagens.push({
					msg:dados.values[x].msg,
					user:dados.values[x].userLogado,
					idUser:dados.values[x].idUser,
					data:dados.values[x].dataMsg,
					typeBox:dados.values[x].typeBox,
					hashTicket:dados.values[x].hashTicket,
					actionMSG:dados.values[x].actionMSG
				});
			}else{
				globalMsg.mensagens.push({
					msg:dados.values[x].msg,
					user:dados.values[x].userLogado,
					idUser:dados.values[x].idUser,
					data:dados.values[x].dataMsg,
					typeBox:"other pull-right",
					hashTicket:dados.values[x].hashTicket,
					actionMSG:dados.values[x].actionMSG
				});
	
				globalChats.mensagens.push({
					msg:dados.values[x].msg,
					user:dados.values[x].userLogado,
					idUser:dados.values[x].idUser,
					data:dados.values[x].dataMsg,
					typeBox:"other pull-right",
					hashTicket:dados.values[x].hashTicket,
					actionMSG:dados.values[x].actionMSG
				});
			}
		
	
			$('#chatResolucao ,#chatSolicitacao, #chatValidacao').children().remove();
			$('#chatResolucao ,#chatSolicitacao,  #chatValidacao').html(newMessage(globalChats));
	
			var totalHeight = 0;
	
				$("#chatResolucao , #chatSolicitacao, #chatValidacao").children().each(function(){
					totalHeight = totalHeight + $(this).outerHeight(true);
				});
	
				$("#chatResolucao ,#chatSolicitacao , #chatValidacao").scrollTop(totalHeight);	
	
			$('#S1_tex_descSolicitacao').val('');

			
		}
	}
		
}




