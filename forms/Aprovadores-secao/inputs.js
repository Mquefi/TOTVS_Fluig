function preenhe_desc() {
  $("#hid_desc_reg").val("");
  var txt = "Seção: " + $("#S0_txt_cod").val() + " - " + $("#S0_txt_desc").val();
  console.log(txt);
  $("#hid_desc_reg").val(txt);
}
