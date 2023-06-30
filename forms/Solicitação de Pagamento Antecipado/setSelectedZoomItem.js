function setSelectedZoomItem(selectedItem) {
  const item = trimObject(selectedItem);
  console.log(item);

  if (item['inputName'].match(/cCusto/g)) {
    $('#descCentCusto').val(item.descCentroCusto);
    $('#regional').val(item.regional);
    document.querySelector('#pedido').value = '';
  }

  if (item['inputName'].match(/codEmpresa/g)) {
    $('#filial').val(item.filial);
    $('#descricaoEmpresa').val(item.nomecom);
    document.querySelector('#pedido').value = '';
  }
}

function removedZoomItem(removedItem) {
  if (removedItem['inputName'].match(/cCusto/g)) {
    $('#descCentCusto').val('');
    $('#regional').val('');
  }

  if (removedItem['inputName'].match(/codEmpresa/g)) {
    $('#filial').val('');
    $('#descricaoEmpresa').val('');
  }
}

function trimObject(obj) {
  const finalObj = {};
  for (const prop in obj) {
    if (obj[prop] instanceof String || typeof obj[prop] === 'string') finalObj[prop] = obj[prop].trim();
    else finalObj[prop] = obj[prop];
  }
  return finalObj;
}
