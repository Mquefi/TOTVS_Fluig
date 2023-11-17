function createDataset(fields, constraints, sortFields) {

    log.dir(constraints);
    var FORNECEDOR   = findConstraint('FORNECEDOR', constraints);
   
    var TENANT_TABLE   = findConstraint('TENANT_TABLE', constraints);
    var TENANT_FILIAL   = findConstraint('TENANT_FILIAL', constraints);

    
    //modelo da query
    log.info("@@@ SQL TENANT_TABLE " + TENANT_TABLE)
    log.info("@@@ SQL TENANT_FILIAL " + TENANT_FILIAL)
    log.info("@@@ SQL FORNECEDOR " + FORNECEDOR);

    
    var sqlSelect = " SELECT DISTINCT(C7_NUM),C7_EMISSAO "
    var from      = " FROM SC7" + TENANT_TABLE + " SC7 "
    var leftJoin  = "  LEFT JOIN SC1" + TENANT_TABLE + " SC1 ON SC7.C7_NUMSC   = SC1.C1_NUM AND SC7.C7_ITEM = SC1.C1_ITEM "
                  + "  LEFT JOIN SB1" + TENANT_TABLE + " SB1 ON SC7.C7_PRODUTO = SB1.B1_COD  "
                  + "  LEFT JOIN SE4" + TENANT_TABLE + " SE4 ON SE4.E4_CODIGO  = SC7.C7_COND "
                  + "  LEFT JOIN SA2" + TENANT_TABLE + " SA2 ON SA2.A2_CGC     = '" + FORNECEDOR + "' AND SA2.A2_COD = SC7.C7_FORNECE AND SA2.A2_LOJA = SC7.C7_LOJA "
    var sqlWhere  = " WHERE SC7.C7_FILIAL = '" + TENANT_FILIAL + "' AND " +
                    " SC7.C7_QUANT > (SC7.C7_QUJE + C7_QTDACLA) AND " +               
                    " SC7.C7_RESIDUO <> 'S' AND " +
                    " SC7.C7_CONAPRO <> 'R' AND " +
                    " SB1.D_E_L_E_T_ <> '*' AND " +
                    " SC7.D_E_L_E_T_ <> '*' AND " +
                    " SA2.D_E_L_E_T_ <> '*' AND " +
                    " SE4.D_E_L_E_T_ <> '*' " 
         
                    

    var myQuery = sqlSelect + from +  leftJoin + sqlWhere

    log.info("@@@ SQL PEDIDOS NF " + myQuery)
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
            if (parseInt(c.initialValue)) {
                return c.initialValue;
            }
        }
    }
    return "010";
}

function getTenantFilial(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        if ("TENANT_FILIAL".equalsIgnoreCase(c.fieldName)) {
            if (parseInt(c.initialValue)) {
                return c.initialValue;
            }
        }
    }
    return "010101";
}

function getFornec(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        if ("FORNECEDOR".equalsIgnoreCase(c.fieldName)) {
            if (parseInt(c.initialValue)) {
                return c.initialValue;
            }
        }
    }
    return "80772577000150";
}

function getDataPedido(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        if ("DATA".equalsIgnoreCase(c.fieldName)) {
            if (parseInt(c.initialValue)) {
                return c.initialValue;
            }
        }
    }
    return "19000101";
}


function findConstraint(fieldName, constraints, defaultValue) {
	if (constraints != null) {
		for (var i=0; i<constraints.length; i++){
			
			log.info("constraints name "+constraints[i].fieldName)
			if (constraints[i].fieldName == fieldName){
				return constraints[i].initialValue;
			}
		}
	}
	return defaultValue;
}
