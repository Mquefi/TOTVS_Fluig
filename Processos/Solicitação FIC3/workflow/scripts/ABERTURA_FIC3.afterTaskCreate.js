function afterTaskCreate(colleagueId){
	
	var sequenceId = getValue("WKCurrentState");
	
	if(sequenceId == 5){	
		var prazoDt = hAPI.getCardValue("S0_txt_prazo_sol");
		var dt_praz = prazoDt.split("/");
		var data_prazo = dt_praz[1] + "/" + dt_praz[0] + "/" + dt_praz[2];
		var data = new Date(data_prazo);
		
		log.info("PRAZO_AFTER: " + data_prazo);
		var praz ='07';
		log.info("PRAZOHORA: " + praz);
		if (prazoDt == "" || prazoDt == null || prazoDt == undefined) return;
		
	    var segundos = (((data.getHours() * 60) + data.getMinutes()) * 60) + data.getSeconds();
	    
	    //Calcula o prazo
	    var obj = hAPI.calculateDeadLineHours(data, segundos, parseInt(praz), "Default");
	    var dt = obj[0];
	    var segundos = obj[1];
	 
	    //Recupera o numero da solicitação
	    var processo = getValue("WKNumProces");
	 
	    //Altera o prazo do processo
	    hAPI.setDueDate(processo,0,colleagueId, dt, segundos);
	}
}