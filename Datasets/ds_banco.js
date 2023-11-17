function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var cnpj   = findConstraint('A2_CGC', constraints);
	var EMPRESA = findConstraint('TENANT_TABLE', constraints);
	var FILIAL  = findConstraint('TENANT_FILIAL', constraints);
	
	log.info("@@@ EMPRESA "+EMPRESA);
	log.info("@@@ FILIAL "+FILIAL);


		var myQuery = "SELECT A6_COD,A6_AGENCIA,A6_DVAGE,A6_NOMEAGE,A6_NUMCON,A6_DVCTA,A6_NOME FROM SA6"+EMPRESA+" WHERE D_E_L_E_T_ <> '*' AND A6_FILIAL = '"+FILIAL+"' ";
	
	
	
	
	log.info("@@@ SQL ENVIADA "+myQuery)
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