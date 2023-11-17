function setSelectedZoomItem(selectedItem) {
  console.log(selectedItem);

  if (selectedItem.inputName == "S0_txt_ccusto") {
    $("#S0_txt_desc").val(selectedItem.S0_txt_Obra);
  }

  if (selectedItem["inputName"].match(/usuaio/g)) {
    var index = selectedItem.inputId.split("___");

    $("#codUsuario___" + index[1]).val(selectedItem.codUsuario);
  }

  if (selectedItem.inputName == "S0_txt_enca")
    document.querySelector("#hid_id_Enca").value = selectedItem.colleagueId;
  if (selectedItem.inputName == "S0_txt_eng")
    document.querySelector("#hid_id_Enge").value = selectedItem.colleagueId;
  if (selectedItem.inputName == "S0_txt_rh")
    document.querySelector("#hid_id_RH").value = selectedItem.colleagueId;
  if (selectedItem.inputName == "S0_txt_cordeng")
    document.querySelector("#hid_id_Cord").value = selectedItem.colleagueId;
  if (selectedItem.inputName == "S0_txt_dire")
    document.querySelector("#hid_id_Dire").value = selectedItem.colleagueId;
}

function removedZoomItem(removedItem) {
  if (removedItem.inputName == "S0_txt_ccusto") {
    $("#S0_txt_desc").val("");
  }
}
