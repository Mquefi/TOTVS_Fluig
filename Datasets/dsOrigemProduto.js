function createDataset(fields, constraints, sortFields) {
	
	log.dir(constraints);
	
	var mapFields = [
		["GENERAL_ID", "X5_CHAVE", "string"],
		["DOCUMENT_TYPE", "X5_DESCRI", "string"],
		["SEARCH_FIELD", "SEARCH_FIELD", "string"],
		["X5_TABELA", "X5_TABELA", "string"],
		["TENANT_TABLE", "", "string"]
	];
	
	var filter = getFilter(constraints, mapFields, {"where":" X5_TABELA = 'S0'"});
	
	var output = executeQuery("SELECT * FROM " +
			"(SELECT X5_CHAVE, X5_DESCRI, rtrim(concat(X5_CHAVE, ' - ', X5_DESCRI)) SEARCH_FIELD, X5_TABELA, '"
			+ getTenantTable(constraints)
			+ "' TENANT_TABLE from SX5"
			+ getTenantTable(constraints)
			+ ") r " + filter.where, filter.params);
    
    return generateDataset(output, mapFields);
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
			//if (parseInt(c.initialValue)) {
				return c.initialValue;
			//}
		}
	}
	return "010101";
}

/**
 * Executa uma query com opção de parametros
 * @param query query a ser executada (ex: "select * from tabela where fieldA = ? and fieldB = ?
 * @param params lista dos parametros (ex: [{"type": "int", "value": 1},{"type": "string", "value": "valor"}])
 * @returns Retorna os dados {"columns": ["fieldA","fieldB"], "rows": [{"fieldA": 1, "fieldB": "valor"}]} ou {error: "mensagem"} em caso de falha
 */
function executeQuery(query, params) {
	var output = {};
    
    var dataSource = "/jdbc/Protheus12";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);

    try {
        var conn = ds.getConnection();
        var stmt = conn.prepareStatement(query);
        
        // TODO insert params here
        if (params && params.length > 0) {
        	for (var i = 0; i < params.length; i++) {
        		if ("boolean".equals(params[i].type)) {
        			stmt.setBoolean(i+1, params[i].value);
        		} else if ("string".equals(params[i].type)) {
        			stmt.setString(i+1, params[i].value);
        		} else if ("int".equals(params[i].type)) {
        			stmt.setInt(i+1, params[i].value);
        		} else if ("date".equals(params[i].type)) {
        			stmt.setDate(i+1, params[i].value);
        		} else if ("float".equals(params[i].type)) {
        			stmt.setFloat(i+1, params[i].value);
        		}
			}
        }
        
        var rs = stmt.executeQuery();
        
        output.columns = [];
        output.rows = [];
        
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	if (output.columns.length == 0) {
                for (var i = 1; i <= columnCount; i++) {
                	output.columns.push(rs.getMetaData().getColumnName(i));
                }
            }
            
            var row = {};
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                	row[output.columns[i - 1]] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                	row[output.columns[i - 1]] = null;
                }
            }
            
            output.rows.push(row);
        }
    } catch (e) {
    	log.error("erro ao executar a query: " + e.message);
    	log.error(query);
    	log.dir(params);
    	
    	output.error = e.message;
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return output;
}

function getFilter(constraints, mapFields, result) {
	var result = result || {};
	
	result.where = result.where || "";
	result.params = result.params || [];
	
	for (var i = 0; i < constraints.length; i++) {
		var c = constraints[i];
		
		for (var j = 0; j < mapFields.length-1; j++) { // -1 evita pegar o tenant_table/tenant_filial
			var f = mapFields[j]; 
			
			if (f[0].equals(c.fieldName)) {
				if (result.where) {
					result.where += " and ";
				}
				
				if (c.likeSearch || c.initialValue.equals(c.finalValue)) {
					if (f[2].equals("string") && c.likeSearch) {
						result.where += f[1] + " like ? ";
						result.params.push({"value": "%"+c.initialValue+"%", "type": f[2]});
					} else {
						result.where += f[1] + " = ? ";
						result.params.push({"value": c.initialValue, "type": f[2]});
					}
				} else {
					result.where += f[1] + " >= ? and ";
					result.where += f[1] + " <= ? ";
					
					result.params.push({"value": c.initialValue, "type": f[2]});
					result.params.push({"value": c.finalValue, "type": f[2]});
				}
			}
		}
	}
	
	if (result.where) {
		result.where = " where " + result.where;
	}
	
	return result;
}

function addColumns(newDataset, mapFields) {
	for (var i = 0; i < mapFields.length; i++) {
		newDataset.addColumn(mapFields[i][0]);
	}
}

function generateDataset(output, mapFields) {
	var newDataset = DatasetBuilder.newDataset();
	
    if (output.error) {
    	log.error("ERRO==============> " + output.error);
    } else {
    	addColumns(newDataset, mapFields);
    	
    	for (var i = 0; i < output.rows.length; i++) {
    		var row = new Array();
    		for (var j = 0; j <= output.columns.length; j++) {
        		row[j] = output.rows[i][output.columns[j]];
        		if (row[j] == null) {
        			row[j] = "null";
        		}
        	}
    		newDataset.addRow(row);
    	}
    }
    return newDataset;
}
