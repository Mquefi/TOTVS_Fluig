function servicetask27(attempt, message) {
	
	var cst1 = DatasetFactory.createConstraint("idSolicitacao", getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
	 var constraints = new Array(cst1);
	 var datasetPrincipal = DatasetFactory.getDataset("ds_abre_chamado", null, constraints, null);
	 	
}