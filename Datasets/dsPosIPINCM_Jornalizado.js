function defineStructure() {
    addColumn('GENERAL_ID');
    addColumn('DOCUMENT_TYPE');
    addColumn('SEARCH_FIELD');
    addColumn('TENANT_TABLE');
    setKey(["GENERAL_ID", "DOCUMENT_TYPE"]);
    addIndex(["GENERAL_ID"]);
    addIndex(["GENERAL_ID", "DOCUMENT_TYPE", "SEARCH_FIELD", "TENANT_TABLE"]);
}

function onSync(lastSyncDate) {
    var dataset = DatasetBuilder.newDataset();
    log.info("*** INICIO")
	var ds = DatasetFactory.getDataset('dsPosIPINCM', null,[], null);
	log.info("*** RETORNO DS: "	+ ds)
	if (ds.rowsCount > 0) {
		for (var i = 0; i < ds.rowsCount; i++) {
			dataset.addOrUpdateRow(new Array(
				ds.getValue(i, "GENERAL_ID"),
				ds.getValue(i, "DOCUMENT_TYPE"),
				ds.getValue(i, "SEARCH_FIELD"),
				ds.getValue(i, "TENANT_TABLE")
			));
		}
	}

	return dataset
}