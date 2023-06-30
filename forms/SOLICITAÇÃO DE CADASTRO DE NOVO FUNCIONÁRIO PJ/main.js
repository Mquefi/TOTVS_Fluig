function main(){
    FLUIGC.calendar("#previsaoInicial")
}


<script>
function mostrarOcultarCamposRm() {
  var utilizaRm = document.getElementById("utilizaRm");
  var moduloRM = document.getElementById("moduloRM");			    
  var coligaRM = document.getElementById("coligaRM");				
  if (utilizaRm.value === "01") {
  	moduloRM.style.display = "none";coligaRM.style.display = "none";
  } else {
  	moduloRM.style.display = "";coligaRM.style.display = "";
  }
}
window.onload = mostrarOcultarCamposRm;
</script>
