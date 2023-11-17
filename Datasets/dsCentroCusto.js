function createDataset(fields, constraints, sortFields) {

    log.dir(constraints);

    
    var empresa = findConstraint('TENANT_TABLE', constraints);
    var filial = findConstraint('TENANT_FILIAL', constraints);
    
    log.info("@@@ TENANT_TABLE " + empresa)
    log.info("@@@ TENANT_FILIAL " + filial)
    
    
    
    //modelo da query
    log.info("@@@ EMPRESA " + getTenantTable(constraints))
    log.info("@@@ FILIAL " + getTenantFilial(constraints))
   
    var sqlSelect = " SELECT CTT_FILIAL,CTT_CUSTO,CTT_DESC01 "
    var from      = " FROM CTT" + getTenantTable(constraints) + " CTT "
    var sqlWhere  = " WHERE CTT.CTT_FILIAL = '" + getTenantFilial(constraints) + "' AND " +
                    " CTT_CLASSE = '2' AND CTT.CTT_BLOQ <> '1' AND CTT.D_E_L_E_T_ <> '*' "
                    

    var myQuery = sqlSelect + from + sqlWhere
    
    log.info("@@@ SQL " + myQuery)
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


function getTenantTable(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        if ("TENANT_TABLE".equalsIgnoreCase(c.fieldName)) {
           // if (parseInt(c.initialValue)) {
                return c.initialValue;
            //}
        }
    }
    return "010";
}

function getTenantFilial(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        if ("TENANT_FILIAL".equalsIgnoreCase(c.fieldName)) {
            //if (parseInt(c.initialValue)) {
                return c.initialValue;
            //}
        }
    }
    return "";
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


