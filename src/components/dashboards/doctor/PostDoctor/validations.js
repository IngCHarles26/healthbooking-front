export default function validation({ name, id, email, phone, profilePicture, sure, specialty}){

  let error = {};
  let rxNoSimNum = /^[A-Za-z\s]*$/;
  let rxPriLetMay = /^(?:[A-Z][a-z])(?:\s[A-Z][a-z])*$/;
  let rxNoNum = /^[A-Za-z ]*$/;
  let rxNoLet = /^[0-9]+$/;
  let rxExaCinNum = /^[0-9]{5}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!profilePicture) error.profilePicture = "La imagen es requerida"
  else error.profilePicture = ""
    

  if (name) {
    if (rxNoSimNum.test(name) || rxPriLetMay.test(name) ) error.name = ""; 
    if (rxNoNum.test(name)) error.name = ""; 
    else error.name = "Debe ser un nombre valido";
    if (name.length > 50) error.name = "Máximo 50 caracteres";
    if (name.length < 5 ) error.name = "Minimo 5 caracteres";
  } else error.name = "El nombre es requerido";

  if (id) {
    if (rxExaCinNum.test(id)) error.id = "" ;
    else error.id = "Debe contener exactamente 5 números";
  } else error.id = "La licencia es requerida";
  

  if (email){
    if (emailRegex.test(email)) error.email = ""
    else error.email = "Debe ser un email valido"
  } else error.email = "El email es requerido";
 

  if (phone){
    if(rxNoLet.test(phone)) error.phone = "";
    else error.phone = 'Debe contener solo números'
    if (phone.length > 10) error.phone = "Máximo 10 caracteres";
    if (phone.length < 8 ) error.phone = "Minimo 8 caracteres";
  } else error.phone = "El telefono es requerido";
 

  if (!specialty) error.specialty = "Seleccione una especialidad";
  else error.specialty = ""

  if (sure.length === 0) error.sure = "Seleccione al menos una Obra Social";
  else error.sure = ""
      
  return error

}