'use strict';

var getDataset = (datasetId, resultFields, filterFields, searchField) => {
  if (!datasetId) {
    throw 'nome do dataset não foi informado';
  }

  if (!resultFields || !resultFields.length) {
    throw 'nenhum campo do dataset não foi informado';
  }

  if (!searchField) {
    searchField = resultFields[0];
  }

  if (!filterFields) {
    filterFields = filterFields || [];
  }
  filterFields.push('TENANT_TABLE');
  filterFields.push(datasetHistory.tenant);

  let datasetConfiguration = {
    searchField: searchField,
    filterFields: filterFields,
    resultFields: resultFields,
    datasetId: datasetId
  };

  let datasetPagination = '?limit=300&offset=0&orderby=SUPPLIER_NAME_ASC';

  let url = '/ecm/api/rest/ecm/dataset/datasetZoom/' + encodeURIComponent(JSON.stringify(datasetConfiguration)) + datasetPagination;

  return send(url, null, 'GET');
};
