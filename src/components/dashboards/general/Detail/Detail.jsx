import "./Detail.css"
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
//import axios from "axios"
import { healthApi } from "../../../../Api/HealthBookingApi";
//import Data from './data.json'

const Detail = () => {

  const { id } = useParams();
  const [doctor, setDoctors] = useState([]);  
  
  //let filt = Data.doctors.filter((doc)=>doc.license === id)
  // let sure = filt.arraySure.map((sur)=> sur.name);
  // let specialty = filt.specialty;
  //console.log(filt[0].name);

  useEffect(() => {
    if (doctor.length === 0) {
      healthApi.get(`/doctors/${id}`)
      .then(({data}) => {
        if (data) setDoctors(data);
      }) 
      return setDoctors({});
    }
  },[id]);

  let sure = doctor?.Sures?.map((sur)=> sur.name);
  let specialty = doctor.Specialty;


  return (
    <div className="containDetail">
      <div className="contDetail">
      <div className="subConten">
        <h1 className="nombre">{doctor?.name}</h1>
        <img className="fotoDetail" alt="" src={doctor?.profilePicture} />
      
      <div className="datos">
        <div className="contInfo">
          <label className="info">Informacion</label>
        </div>
        <div className="textos">
          <label className="textoIzq">Especialidad</label>
          <label className="textoDer">{specialty?.name}</label>
        </div>
       
        <div className="textos">
          <label className="textoIzq">Licencia</label>
          <p className="textoDer">{doctor?.id}</p>
        </div>
        
        <div className="textos">
          <label className="textoIzq">Telefono</label>
          <label className="textoDer">{doctor?.phone}</label>
        </div>

        <div className="textos">
          <div className="textoIzq">Correo</div>
          <label className="textoDer">{doctor?.email}</label>
        </div>
        
        <div className="textos">
          <div className="textoIzq">Tarifa</div>
          <label className="textoDer">${doctor?.price}</label>
        </div>
        
        <div className="textos">
          <div className="textoIzq">Seguro</div>
          <label className="textoDer">{sure?.join(', ')}</label>
        </div>
        
      <hr />
      </div>

      <div className="contBotones">
          <NavLink to={"/patient"}>
            <button className="boton">Regresa</button>
          </NavLink>

        <button className="boton">Seleccionar</button>
     </div>
     </div>
    </div>
    </div>
    
  )
}

export default Detail;