function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var empresa = findConstraint("TENANT_TABLE", constraints, "010");
	var filial  = findConstraint("TENANT_FILIAL", constraints, "01");
	
	log.info("@@@ filial "+filial);
	log.info("@@@ empresa "+empresa)
	
	
	var myQuery = "SELECT CT1_FILIAL,CT1_CONTA,CT1_DESC01,rtrim(concat(CT1_CONTA, ' - ', CT1_DESC01)) SEARCH_FIELD,CASE CT1_CLASSE WHEN '1' THEN 'Sintetica' WHEN '2' THEN 'Analitica' END AS CT1_CLASSE, CASE CT1_NORMAL WHEN '1' THEN 'Devedora' WHEN '2' THEN 'Credora' END AS CT1_NORMAL FROM CT1"+empresa+" WHERE CT1_FILIAL = "+filial+" AND CT1_CLASSE = '2' AND D_E_L_E_T_ <> '*'";
		
	log.info("@@@ SQL "+myQuery)
	var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/Protheus12";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    			
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
	
}
function onMobileSync(user) {

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