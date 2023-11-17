function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	//Creates the columns
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("subcategoria");
    
    
    var funcao  = findConstraint('funcao', constraints);
     
    //Creates the constraint to search for the active forms
    var cst1 = DatasetFactory.createConstraint("funcao",funcao,funcao, ConstraintType.MUST);
    var cst2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst1,cst2);
     
    var datasetPrincipal = DatasetFactory.getDataset("ds_cadastro_funcao", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Creates the constraints to search for the child fields, passing the tablename, form number and version
        var c1 = DatasetFactory.createConstraint("tablename", "tableFuncao" ,"tableFuncao", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
        //Searches the dataset
        
        
        var datasetFilhos = DatasetFactory.getDataset("ds_cadastro_funcao", null, constraintsFilhos, null);
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adds the values to the respective columns.
            dataset.addRow(new Array(
                    datasetFilhos.getValue(j, "subcategoria")));
        }
    }
     
    return dataset;

}function onMobileSync(user) {

}

function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}