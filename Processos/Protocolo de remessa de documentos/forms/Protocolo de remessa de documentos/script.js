//#########################################################################################
//Altura dinâmica do campo obs, funciona em conjunto com css
const campoObs = document.getElementById("campoObs");

campoObs.addEventListener("input", function () {
    this.style.height = "auto"; // Redefine a altura para permitir a expansão
    this.style.height = this.scrollHeight + "px"; // Define a altura com base no conteúdo
});

//#########################################################################################