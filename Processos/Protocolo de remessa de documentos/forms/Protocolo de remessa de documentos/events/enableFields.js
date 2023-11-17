function enableFields(form,customHTML){
	
    var processo = getValue("WKNumState");

    if(processo == 0 || processo == 4 || processo == 11){    	
      	form.setEnabled("setorDestino",false);
      	
      	form.setEnabled("campoObs",false);
    }
    if(processo == 5 || processo == 15){   
    	form.setEnabled("discriminacao",false);
      	form.setEnabled("nFolhas",false);
      	form.setEnabled("revisao",false);
      	form.setEnabled("qtde",false);
      	form.setEnabled("tipo",false);
      	form.setEnabled("trash",false);
      	form.setVisible("trash",false);
      	//form.getElementById("trash").type = "hidden";
    }
}