function createDataset(fields, constraints, sortFields) {

    log.dir(constraints);

    //modelo da query
    log.info("@@@ EMPRESA " + getTenantTable(constraints))
    log.info("@@@ FILIAL " + getTenantFilial(constraints))
   
    var sqlSelect = " SELECT F4_CODIGO "
    var from      = " FROM SF4" + getTenantTable(constraints) + " SF4 "
    var sqlWhere  = " WHERE SF4.F4_FILIAL = '' AND " +
                    " SF4.F4_CODIGO >= 500 AND SF4.D_E_L_E_T_ <> '*' "
                    

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
            //if (parseInt(c.initialValue)) {
                return c.initialValue;
            //}
        }
    }
    return "";
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


