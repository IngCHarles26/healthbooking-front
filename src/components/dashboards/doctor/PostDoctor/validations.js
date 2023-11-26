export default function validation({ name, id, email, phone, profilePicture, sure, specialty, price }){

  let error = {};
  let rxNoSimNum = /^[A-Za-z\s]*$/;
  let rxPriLetMay = /\b[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*\b/g; 
  let rxNoNum = /^[A-Za-z ]*$/;
  let rxNoLet = /^\d+$/;
  var numEntPos = /^[1-9]\d*$/;
  let rxExaCinNum = /^[0-9]{5}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let rxEspacios = /\s/;

  if (!profilePicture) error.profilePicture = "La imagen es requerida"
  else error.profilePicture = ""
    

  if (name) {
    if (!rxPriLetMay.test(name)) error.name = "La primera letra deberia ser Mayúscula";
    else if (rxEspacios.test(name)){
      if (!rxPriLetMay.test(name)) error.name = "La primera letra deberia ser Mayúscula";
    }
    else if (!rxNoSimNum.test(name)) error.name = "No debe contender Simbolos ni Numero";
    else if (name.length > 50) error.name = "Máximo 50 caracteres";
    else if (name.length < 5 ) error.name = "Minimo 5 caracteres";
    else error.name = "";
  } else error.name = "El nombre es requerido";

  if (id) {
    if(!rxNoLet.test(id)) error.id = 'Debe contener solo números';
    else if(!numEntPos.test(id)) error.id = 'Debe ser un numero entero positivo';
    else if (!rxExaCinNum.test(id)) error.id = "Debe contener exactamente 5 números" ;
    else error.id = "";
  } else error.id = "La licencia es requerida";
  

  if (email){
    if (!emailRegex.test(email)) error.email = "Debe ser un email valido"
    else error.email = ""
  } else error.email = "El email es requerido";
 

  if (phone){
    if(!rxNoLet.test(phone)) error.phone = 'Debe contener solo números';
    else if(!numEntPos.test(phone)) error.phone = 'Debe ser un numero entero positivo';
    else if (phone.length > 10) error.phone = "Máximo 10 caracteres";
    else if (phone.length < 8 ) error.phone = "Minimo 8 caracteres";
    else error.phone = "";
  } else error.phone = "El telefono es requerido";
 

  if (!specialty) error.specialty = "Seleccione una especialidad";
  else error.specialty = ""

  if (price){
    if(!rxNoLet.test(price)) error.price = 'Debe contener solo números';
    else if(!numEntPos.test(phone)) error.phone = 'Debe ser un numero entero positivo';
    else error.price = "";
  } else error.price = "El precio es requerido"
  
  
  if (sure.length === 0) error.sure = "Seleccione al menos una Obra Social";
  else error.sure = ""
      
  return error

}