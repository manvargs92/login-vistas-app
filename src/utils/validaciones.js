function validarEmail(email) {
  let regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regx.test(email);
}

function validarUrl(url) {
  let regx =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return regx.test(url);
}

// function validaTodosCamposVaciosActUsr(nombre, usuario, contrasenia) {
//   if (nombre.length === 0 || usuario.length === 0 || contrasenia.length === 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function validaCampoVacio(nombreCampo) {
//   if (nombreCampo.length == 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

export { validarEmail, validarUrl };
