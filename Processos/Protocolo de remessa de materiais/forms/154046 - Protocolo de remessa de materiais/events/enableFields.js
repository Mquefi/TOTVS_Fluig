function enableFields(form,customHTML){
	
    var processo = getValue("WKNumState");

    if(processo == 0 || processo == 4 || processo == 11){    	
      	form.setEnabled("setorDestino",false);
      	form.setEnabled("tipoDeVaga",false);
      	form.setEnabled("campoObs",false);
    }
    if(processo == 5 || processo == 15){   
    	form.setEnabled("setorOrigem",false);
      	form.setEnabled("nome_documento",false);
      	form.setEnabled("descricao_documento",false);
      	form.setVisibleById("trash",false);
    }
}