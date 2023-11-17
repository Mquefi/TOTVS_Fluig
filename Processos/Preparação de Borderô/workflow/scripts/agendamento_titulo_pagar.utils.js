function utils() {}

function formatDate(data, format) {
  var dateFormat = new java.text.SimpleDateFormat(format || "dd/MM/yyyy");
  return dateFormat.format(data);
}

function removerFormatacaoNumero(numberString) {
  if (!numberString) return new java.lang.String("0");
  return numberString.replaceAll("\\.", "").replaceAll("\\,", ".");
}

function asInt(num) {
  var numString = new java.lang.String(num + "");
  var numWithoutFormating = removerFormatacaoNumero(numString);
  if (numWithoutFormating.isEmpty()) return 0;
  return java.lang.Long.parseLong(numWithoutFormating, 10);
}

function asFloat(num) {
  var numString = new java.lang.String(num + "");
  var floatValue = parseFloat(removerFormatacaoNumero(numString));
  if (isNaN(floatValue)) return 0;
  return floatValue;
}

function getTableValues(tablename, fields) {
  var values = [];
  hAPI.getChildrenIndexes(tablename).forEach(function (index) {
    var value = {
      index: index
    };
    fields.forEach(function (campo) {
      value[campo] = hAPI.getCardValue(campo + "___" + index);
    });
    values.push(value);
  });

  return values;
}

function addRightPad(str, padstr, len) {
  return java.lang.String.format("%-" + len + "s", str).replace(" ", padstr) + "";
}

var DBUtils = {};
DBUtils.returnTypes = { OBJECTS: 1, ARRAY: 2 };
DBUtils.getDatasource = function (db) {
  var dataBase = "java:/jdbc/" + db;
  var context = new javax.naming.InitialContext();
  var dataSource = context.lookup(dataBase);
  return dataSource;
};
DBUtils.parseResultSetToArray = function (resultSet) {
  var columnCount = resultSet.getMetaData().getColumnCount();
  var columns = [];
  var columnTypes = [];
  for (var i = 1; i <= columnCount; i++) {
    var columnName = resultSet.getMetaData().getColumnLabel(i);
    var columnType = resultSet.getMetaData().getColumnTypeName(i);
    columns.push(columnName);
    columnTypes.push(columnType);
  }

  var rows = [];
  while (resultSet.next()) {
    var row = [];
    for (var i = 0; i < columnCount; i++) {
      var obj = resultSet.getObject(columns[i]);
      if (obj) {
        if (columnTypes[i] == "varchar" || columnTypes[i] == "nvarchar") row.push((obj + "").trim());
        else row.push(obj);
      } else row.push("");
    }
    rows.push(row);
  }

  return { columns: columns, rows: rows };
};
DBUtils.parseResultSetToObjectArray = function (resultSet) {
  var objects = [];
  var columnCount = resultSet.getMetaData().getColumnCount();
  while (resultSet.next()) {
    var obj = {};
    for (var i = 1; i <= columnCount; i++) {
      var columnName = resultSet.getMetaData().getColumnLabel(i);
      var value = resultSet.getObject(columnName) || "";
      obj[columnName] = value;
    }
    objects.push(obj);
  }
  return objects;
};
DBUtils.executeQuery = function (db, sql, returnType, params) {
  var connection = null;
  var statement = null;
  var resultSet = null;

  try {
    var dataSource = DBUtils.getDatasource(db);
    connection = dataSource.getConnection();
    statement = connection.prepareStatement(sql);

    if (params) {
      params.forEach(function (param, index) {
        param.type ? statement.setObject(index + 1, param.value, param.type) : statement.setObject(index + 1, param);
      });
    }

    resultSet = statement.executeQuery();
    return returnType === DBUtils.returnTypes.OBJECTS ? DBUtils.parseResultSetToObjectArray(resultSet) : DBUtils.parseResultSetToArray(resultSet);
  } catch (error) {
    log.error("Erro ao executar query: " + sql);
    log.error("Error: " + error.toString() + " at line: " + error.lineNumber);
    throw error;
  } finally {
    if (resultSet != null) resultSet.close();
    if (statement != null) statement.close();
    if (connection != null) connection.close();
  }
};
DBUtils.execute = function (db, sql) {
  var connection = null;
  var statement = null;
  var resultSet = null;

  try {
    var dataSource = DBUtils.getDatasource(db);
    connection = dataSource.getConnection();
    statement = connection.createStatement();
    statement.execute(sql);
  } catch (error) {
    log.error("Erro ao executar sql: " + sql);
    log.error("Error: " + error.toString() + " at line: " + error.lineNumber);
    throw error;
  } finally {
    if (resultSet != null) resultSet.close();
    if (statement != null) statement.close();
    if (connection != null) connection.close();
  }
};
