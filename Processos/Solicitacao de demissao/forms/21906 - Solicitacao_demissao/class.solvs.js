
const SOLVS_LOADING					=	false;
const SOLVS_LOG_ERRO				=	false;
const SOLVS_LOG_ERRO_DOCUMENT_ID	=	null;

const SOLVS_COMPANY_ID				=	'';
const SOLVS_USERNAME_ECM    		=   '';
const SOLVS_PASSWORD_ECM    		=	'';
const SOLVS_MATRICULA_ECM  	 		=	'';


if(SOLVS_LOADING){
	$( document ).ajaxSend(function(data) {
		setTimeout(function(){
			FLUIGC.loading(window, {textMessage: '<h1>Processando...</h1>'}).show();
		}, 500);
		
		setTimeout(function(){
			FLUIGC.loading(window, {textMessage: '<h1>Processando...</h1>'}).hide();
		}, 3000);
	});
}

class SOLVS{

	static getDados(p){
		var that = this
		if(typeof p == 'object'){
	        if(p.dataset){
	        	try{
		            if(p.filtros != null){
		               var f = new Array();
		                for(var i = 0; i < p.filtros.length; i++){
		                    var tipo = p.filtros[i].tipo;
		                        if(tipo == "MUST"){
		                            tipo = ConstraintType.MUST;
		                        }else if(tipo == "SHOULD"){
		                            tipo = ConstraintType.SHOULD;
		                        }else{
		                            tipo = ConstraintType.MUST_NOT;
		                        }
		                    f.push(
		                        DatasetFactory.createConstraint(
		                            p.filtros[i].campo,
		                            p.filtros[i].initial,
		                            p.filtros[i].final,
		                            tipo,
		                            p.filtros[i].like
		                        )
		                    );
		                }
		            }else{
		                var f = p.filtros;
		            }
	            
	          
	            	var retorno = DatasetFactory.getDataset(p.dataset,p.campos,f,p.ordem);	
	            	//LOG DE ERROS DATASET
	            	if(SOLVS_LOG_ERRO){
	            		this.validaCreateLogErro(retorno,p);	
	            	}	
	            	
	            	return retorno;
	            }catch(e){
	                throw e;
	            }
	        }else{
	        	this.msgDanger("Dataset Não Encontratdo","Ops!");
	        }            
	    }else{
	    	this.msgDanger("Parametros inválidos","Ops!");
	    }
	}

	/**
	* Cria linha no Dataset
	* @param {p}		=	tipo objeto 
	* Ex.: var p        = 	new Array();
	* 	       p.card	=	[{
 	*  		  					cardData_1:{field:'{{nome_campo_1}}',value: {{valor_campo_1}} },
 	*  		  					cardData_2:{field:'{{nome_campo_2}}',value: {{valor_campo_2}} },
 	*  		  					parentDocumentId: {{Codigo_do_formulário}}
 	*  		 				}]);
	*/
	static createDados(p){
		var prm = new SOAPClientParameters();
			prm.add("companyId", SOLVS_COMPANY_ID);
			prm.add("username", SOLVS_USERNAME_ECM);
			prm.add("password", SOLVS_PASSWORD_ECM);
			prm.add("card"		, p.card);
		var jsonText = SOAPClient.invoke(this.returnCurrentURL()+"webdesk/ECMCardService", "create", prm, false, null, "result").json;
		return(jsonText);
	}

	
	/**
	* Atualização de dados do Dataset
	* @param {p}		=	tipo objeto 
	* Ex.: var p 		= 	new Array();
	* 	   p.cardId		=	{{documentid}}
	* 	   p.cardData	=	[
	*						{field:'{{nome_campo1}}',value: {{valor_campo1}} },
	*						{field:'{{nome_campo2}}',value: {{valor_campo2}} },
	*						{field:'{{nome_campo3}}',value: {{valor_campo3}} },
	*						] 
	*/
	static updateDados(p){
		var prm = new SOAPClientParameters();
			prm.add("companyId"	, SOLVS_COMPANY_ID);
			prm.add("username"	, SOLVS_USERNAME_ECM);
			prm.add("password"	, SOLVS_PASSWORD_ECM);
			prm.add("cardId"	, p.cardId);
			prm.add("cardData"	, p.cardData);
		var jsonText = SOAPClient.invoke(this.returnCurrentURL()+"webdesk/ECMCardService", "updateCardData", prm, false, null, "result").json;
	}

	/**
	* Delete dados do Dataset
	* @param {cardId}		=	tipo String 
	* Ex.:	var cardId 		= 	{{documentid}};
	*/
	static	deleteDados(cardId){
		var prm = new SOAPClientParameters();
		prm.add("companyId"	, SOLVS_COMPANY_ID);
		prm.add("username"	, SOLVS_USERNAME_ECM);
		prm.add("password"	, SOLVS_PASSWORD_ECM);
		prm.add("cardId"	, cardId);
		var jsonText = SOAPClient.invoke(this.returnCurrentURL()+"/webdesk/ECMCardService", "deleteCard", prm, false, null, "result").json;
		return jsonText;
	}



	///////////////////////////
	static validaCreateLogErro(retorno,p){
		if(typeof retorno !== "undefined"){
        	if(typeof retorno.values !== "undefined"){
            	if(typeof retorno.values[0] !== "undefined"){
	            	if(typeof retorno.values[0].MSG !== "undefined"){
	            		if((retorno.values[0].MSG.trim().length)>20){
	                		var DATASET 	= 	p.dataset;
	                		var PARAMETROS 	=	JSON.stringify(p.filtros);
	                		var ERRO		=	JSON.stringify(retorno);
	                		if(SOLVS_LOG_ERRO){
	                			this.createLogErro(DATASET,PARAMETROS,ERRO);
	                			return(true);	
	                		}
	                	}
	            	}
            	}
        	}
    	}
    	return(false);		
	}
	
	createLogErro(DATASET,PARAMETROS,ERRO){
		var prm = new SOAPClientParameters();
		//LEMBRETE2
		prm.add("companyId", SOLVS_COMPANY_ID);
		prm.add("username", SOLVS_USERNAME_ECM);
		prm.add("password", SOLVS_PASSWORD_ECM);
	 	//LEMBRETE4
		prm.add("card", [{
		cardData_1:{field:'DATASET',value: DATASET},
		cardData_2:{field:'PARAMETROS',value: PARAMETROS},
		cardData_3:{field:'ERRO',value: ERRO},
		parentDocumentId:getDocumentId_logErrosRM()
	 	}]);
	 	/*LEMBRETE3*/  
	 	var jsonText = SOAPClient.invoke(this.returnCurrentURL()+"/webdesk/ECMCardService", "create", prm, true, function(ret){
	 	 	});
	}



	static returnCurrentURL(){
		var protocolo = String(document.location).split("?")[0].split(":")[0];
		var servidor = String(document.location).split("?")[0].split("//")[1].split("/")[0].split(":")[0];
		var porta = "";
		if(String(document.location).split("?")[0].split("//")[1].split("/")[0].split(":").length > 1){
			porta = String(document.location).split("?")[0].split("//")[1].split("/")[0].split(":")[1];
		}

		if(porta != ""){
	   		return protocolo + "://" + servidor + ":" + porta + "/";
		}else{
	   		return protocolo + "://" + servidor + "/";
		}
	}
	
	
	static msgDanger(msg,titlex){
		titlex = (this.validaObj(titlex))?titlex:"";
		FLUIGC.toast({
	        title:titlex,
	        message:msg,
	        type:"danger" 
	    });
	}
	
	static msgWarning(msg,titlex){
		titlex = (this.validaObj(titlex))?titlex:"";
		FLUIGC.toast({
	        title:titlex,
	        message:msg,
	        type:"warning" 
	    });
	}
	
	static msgSuccess(msg,titlex){
		titlex = (this.validaObj(titlex))? titlex:"";
		
		FLUIGC.toast({
	        title:titlex,
	        message:msg,
	        type:"success" 
	    });
	}
	static arrayUnique(array){
		var arrayRetorno = array.filter(function(este, i){
		    					return array.indexOf(este) == i;
						})
		return(arrayRetorno);
	}
	
	static arrayRemoveEmpty(array){
		return(array.filter(function(n){ return n != undefined && n != "" && n != null}));
	}
	
	static validateEmail(email){
		 var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		 if (reg.test(email)){
			 return true; }
		 else{
			 return false;
		 }
	} 
	
	static testaCPF(strCPF) {
	    var Soma;
	    var Resto;
	    Soma = 0;
		if (strCPF == "00000000000" ||
			strCPF == "11111111111" ||
			strCPF == "22222222222" ||
			strCPF == "33333333333" ||
			strCPF == "44444444444" ||
			strCPF == "55555555555" ||
			strCPF == "66666666666" ||
			strCPF == "77777777777" ||
			strCPF == "88888888888" ||
			strCPF == "99999999999"){
			return false;
		}
	    
		for (i=1; i<=9; i++){
			Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
		}
		Resto = (Soma * 10) % 11;
		
	    if ((Resto == 10) || (Resto == 11)){
	    	Resto = 0;
	    }
	    if (Resto != parseInt(strCPF.substring(9, 10)) ){
	    	return false;
	    }
		
		Soma = 0;
	    for (i = 1; i <= 10; i++){
	    	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
	    }
	    Resto = (Soma * 10) % 11;
		
	    if ((Resto == 10) || (Resto == 11)){
	    	Resto = 0;
	    }
	    if (Resto != parseInt(strCPF.substring(10, 11) ) ){
	    	return false;
	    }
	    return true;
	}
	
	static validateCpf(cpf){
		 var reg = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/
		 if (reg.test(cpf)){
			 return this.testaCPF(this.onlyNumber(cpf));
		 }else{
			 return false;
		 }
	} 


	static validateCnpj(cnpj) {
		 
	    cnpj = cnpj.replace(/[^\d]+/g,'');
	 
	    if(cnpj == '') return false;
	     
	    if (cnpj.length != 14)
	        return false;
	 
	    // Elimina CNPJs invalidos conhecidos
	    if (cnpj == "00000000000000" || 
	        cnpj == "11111111111111" || 
	        cnpj == "22222222222222" || 
	        cnpj == "33333333333333" || 
	        cnpj == "44444444444444" || 
	        cnpj == "55555555555555" || 
	        cnpj == "66666666666666" || 
	        cnpj == "77777777777777" || 
	        cnpj == "88888888888888" || 
	        cnpj == "99999999999999")
	        return false;
	         
	    // Valida DVs
	   var tamanho = cnpj.length - 2
	   var  numeros = cnpj.substring(0,tamanho);
	   var  digitos = cnpj.substring(tamanho);
	   var  soma = 0;
	   var  pos = tamanho - 7;
	    for (i = tamanho; i >= 1; i--) {
	      soma += numeros.charAt(tamanho - i) * pos--;
	      if (pos < 2)
	            pos = 9;
	    }
	    var  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	    if (resultado != digitos.charAt(0))
	        return false;
	         
	    tamanho = tamanho + 1;
	    numeros = cnpj.substring(0,tamanho);
	    soma = 0;
	    pos = tamanho - 7;
	    for (i = tamanho; i >= 1; i--) {
	      soma += numeros.charAt(tamanho - i) * pos--;
	      if (pos < 2)
	            pos = 9;
	    }
	    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	    if (resultado != digitos.charAt(1))
	          return false;
	           
	    return true;
	    
	}
	
	static focusFalse(id){
		id = id.split(" ");
		id = id[0];
		$("#"+id).css("border","1px solid red");
		$("#"+id).focus();
	}
	static focusTrue(id){
		id = id.split(" ");
		id = id[0];
		$("#"+id).css("border","1px solid #ccc");
	}
	static validaInput(id){
		var valor	= $("#"+id).val();	
		if(valor=="" || valor=="undefined" || valor==undefined){
			this.focusFalse(id);
			return false;
		}else{
			if(valor.trim()==""){
				this.focusFalse(id);
				return false;
			}else{
				this.focusTrue(id);
				return true;
			}
				
		}
	}
	
	static undefinedToBlank(aux){
		if(aux==undefined || aux=="undefined"){
			aux = '';
		}
		return(aux);
	}
	
	static validaSelect(id){
		return (this.validaInput(id));
	}
	
	static validaRadio(id){
		if($('input[name="'+id+'"]:checked').val().trim()==""){
			//this.focusFalse(id);
			return false;
		}else{
			//this.focusTrue(id);
			return true;	
		}
	}
	
	
	static stodbr(data){
		data	=	String(data);
		data	=	data.substring(0, 10);
		var datax = data.split("-").reverse().join("/");
		return(datax);
	}
	
	static brtos(data){
		data	=	String(data);
		data	=	data.substring(0, 10);
		var datax = data.split("/").reverse().join("-");
		return(datax);
	}
	
	static onlyNumber(number){
		if(this.validaObj(number)){
			number = number.split(new RegExp(/[^\d]/)).join("")	
		}
		return(number);
	}
	

	static numberToReal(numero) {
	    	numero = parseFloat(numero).toFixed(2).split('.');
	    	numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
	    return numero.join(',');
	}
	
	static numberToCurrency(numero) {
	     	numero = parseFloat(numero).toFixed(2).split('.');
	    	numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
	    return numero.join(',');
	}
	
	static currencyToNumber(numero) {
			if(numero!=null && numero!=undefined && numero!=''){
				numero = numero.split(',');
				numero[0] = numero[0].split('.').join('');
				return parseFloat(numero.join('.'))
			}else{
				return 0
			}
		
	}
	/**
	 * Adiciona Zero a esquerda
	 * @param {number} Número a ser adicionado Zeros.
	 * @param {tamanho} Tamanho da string de retorno.
	 * @return {codigo} String retornada com Zeros.
	 */
	static zeroEsquerda(number,tamanho){
		number		=	String(number).trim();	
		var str		= 	'0000000000000000000000000000000000000000000000000'+number;
		var inicio 	= 	str.length-tamanho;
		var fim 	= 	str.length;
		var codigo	=	str.substring(inicio,fim);
		
		return(codigo);
	}
	
	
	//TROCA NaN POR ZERO
	static trocaNaN(number){
		let c1	=	Number.isNaN(number);
		let c2	=	number=='NaN'; 
		let c3	=	number==null; 
		let c4	=	number=='';
		let result	=	(c1 || c2 || c3 || c4 )?0:number;
		return(result);
	}
	//VERIFICA SE É NUMERO INTEIRO POSITIVO
	static isNumber(number){
		//var patt1 = /^(0|[1-9][0-9]*)$/
		var patt1 = /[^\d]/;
	    var result = (patt1.test(number))?false:true;
	    return(result);
	}
	
	//ORDENA ARRAY POR KEY
	static sortByKey(arrDados){
		var ordered = {};
		Object.keys(arrDados).sort().forEach(function(key) {
		  ordered[key] = arrDados[key];
		});
		return(ordered);
	}
	
	static mesNome(mes){
		mes = String(mes);
		switch(mes){
			case '0':
				var nome	=	'JANEIRO';
				break;
			case '1':
				var nome	=	'FEVEREIRO';
				break;
			case '2':
				var nome	=	'MARÇO';
				break;
			case '3':
				var nome	=	'ABRIL';
				break;
			case '4':
				var nome	=	'MAIO';
				break;
			case '5':
				var nome	=	'JUNHO';
				break;
			case '6':
				var nome	=	'JULHO';
				break;
			case '7':
				var nome	=	'AGOSTO';
				break;
			case '8':
				var nome	=	'SETEMBRO';
				break;
			case '9':
				var nome	=	'OUTUBRO';
				break;
			case '10':
				var nome	=	'NOVEMBRO';
				break;
			case '11':
				var nome	=	'DEZEMBRO';
				break;
			default:
				var nome =	mes;
				break;	
		}
		return(nome);
	}
	
	static gerarPrint(elem)
	{	
		var head_atual 	= $('head').html();
	    var mywindow 	= window.open('', 'PRINT', 'height=400,width=600');
	    mywindow.document.write('<html><head><link type="text/css" rel="stylesheet" href="/portal/resources/style-guide/css/fluig-style-guide.min.css"></head><body >');
	    mywindow.document.write(document.getElementById(elem).innerHTML);
	    mywindow.document.write('</body></html>');
	
	    mywindow.document.close(); // necessary for IE >= 10
	    mywindow.focus(); // necessary for IE >= 10*/
	
	    mywindow.print();
	    mywindow.close();
	
	    return true;
	}
	
	static gerarExcel(elem)
	{	
		var htmltable = document.getElementById(elem);
		
	    var html = htmltable.outerHTML;
	    window.open('data:application/vnd.ms-excel, ' + encodeURIComponent(html));
	
	    return true;
	}
	
	static calculaDatas(dt1,dt2,delimitador){
		let data1	='';
		let data2	='';
		if ((dt1.split(delimitador) == "") && (dt2.split(delimitador) == "")) {
		   data1 = new Date();
		   data2 = new Date();
		}else {
		   var dtInicio = dt1.split(delimitador);
		   var dtFim 	= dt2.split(delimitador);
		   data1 		= new Date(dtInicio[0] + "/" + dtInicio[1] + "/" + dtInicio[2]);
		   data2 		= new Date(dtFim[0] + "/" + dtFim[1] + "/" + dtFim[2]);
		}
		var retorno = this.dateDiferenca( data1, data2 );
		return retorno;
	}
	
	// a e b são objetos Date do JS
	static dateDiferenca(a, b) {
	   // Descartando timezone e horário de verão
	   var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
	   var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
	   var dDiff = utc2 - utc1;
	   
	   this.ano	=	Math.floor(dDiff/1000/60/60/24/30/12);
	   this.mes	=	Math.floor(dDiff/1000/60/60/24/30);
	   this.dia	=	Math.floor(dDiff/1000/60/60/24);
	   this.hora=	Math.floor(dDiff/1000/60/60);
	   this.min	=	Math.floor(dDiff/1000/60)
	   this.seg	=	Math.floor(dDiff/1000/1);
	   
	   return this;
	}
	
	static dataAtual(){
		var data	= 	new Date();
		this.dia		=	SOLVS.zeroEsquerda(data.getDate(),2);		
		this.mes		=	SOLVS.zeroEsquerda(data.getMonth()+1,2);
		this.ano		=	data.getFullYear();
		this.data		=	this.ano+'-'+this.mes+'-'+this.dia;
		this.month      =  	data.getMonth();
		return this
	}
		/**
	* Calcula dias para frente
	* @param quantidade de dias 
	*/
	static dataPosterior(diasx){
		//DIA ATUAL
		var data	= 	new Date();
		var dia		=	data.getDate()		
		var mes		=	data.getMonth()
		var ano		=	data.getFullYear()
		this.date	= 	new Date(ano,mes,dia+diasx);
		this.dia	=	SOLVS.zeroEsquerda(this.date.getDate(),2);		
		this.mes	=	SOLVS.zeroEsquerda(this.date.getMonth()+1,2);
		this.ano	=	this.date.getFullYear();
		this.data	=	this.ano+'-'+this.mes+'-'+this.dia;
		return this
	}
	
	static isEmpty(valida){
		switch(typeof valida){
			case 'string':
				var validacao = valida != "" && valida != null ? false : true;
				return validacao;
			break;
			case 'object':
				var validacao = valida.length > 0 ? false : true;
				return validacao;
			break;
		}
	}

	static isNotEmpty(valida){
		switch(typeof valida){
			case 'string':
				var validacao = valida != "" && valida != null ? true : false;
				return validacao;
			break;
			case 'object':
				var validacao = valida.length > 0 ? true : false;
				return validacao;
			break;
		}
	}

	static getDateToday(lg=""){
		var data = this.dataAtual().data
		switch(lg){
			case 'BR':
				return(this.stodbr(data));
			break;
			case 'EN':
				return(data);
			break;
			default:
				return(this.stodbr(data));
			break;			
		}
		
	}
	
	/**
	 * Valida se é um objeto
	 * @param {obj} Objeto para ser analizado.
	 * @return {boolean} True é um objeto/ false não é objeto.
	 */
	static validaObj(obj){
		 if (obj != null && 
			 obj != "null" &&
			 obj != undefined && 
			 obj != "undefined" && 
			 obj != false &&
			 obj != "false" &&
			 obj != "") {
			return(true);
		}else{
			return(false);
		}
	}
	

	static hash(complemento){
		var dt 		= new Date()
		var ano		=	dt.getFullYear()
		var mes		=	dt.getMonth()
		var dia		=	dt.getDate()
		var hora	=	dt.getHours()
		var min		=	dt.getMinutes()
		var seg		=	dt.getSeconds()
		
		var hash 	= ano+""+mes+""+dia+""+hora+""+min+""+seg+""+complemento
		
		return hash
	}
}



