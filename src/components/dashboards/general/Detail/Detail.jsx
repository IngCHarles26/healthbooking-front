import "./Detail.css"
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios"
import Data from './data.json'

const Detail = () => {

  const { id } = useParams();
  const [doctor, setDoctors] = useState([]);  
  
  let filt = Data.doctors.filter((doc)=>doc.license === id)


  //console.log(filt[0].name);

  // useEffect(() => {
  //   if (doctor.length === 0) {
  //     axios.get(`http://localhost:3001/doctors/${id}`)
  //     .then(({data}) => {
  //       if (data) setDoctors(data);
  //       //console.log(data);
  //     }) 
  //     return setDoctors({});
  //   }
  // },[id]);

  // let sure = doctor?.Sures?.map((sur)=> sur.name);
  // let specialty = doctor.Specialty;

  // let sure = filt.arraySure.map((sur)=> sur.name);
  // let specialty = filt.specialty;


  return (
    <div className="containDetail">
      <div className="contDetail">
      <div className="subConten">
        <h1 className="nombre">{filt[0].name}</h1>
        <img className="fotoDetail" alt="" src={filt[0].profilePicture} />
      
      <div className="datos">
        <div className="contInfo">
          <label className="info">Informacion</label>
        </div>
        <div className="textos">
          <label className="textoIzq">Especialidad</label>
          <label className="textoDer">{filt[0].specialty}</label>
        </div>
       
        <div className="textos">
          <label className="textoIzq">Licencia</label>
          <p className="textoDer">{filt[0].license}</p>
        </div>
        
        <div className="textos">
          <label className="textoIzq">Telefono</label>
          <label className="textoDer">{filt[0].phone}</label>
        </div>
        
        <div className="textos">
          <div className="textoIzq">email</div>
          <label className="textoDer">{filt[0].email}</label>
        </div>
        
        <div className="textos">
          <div className="textoIzq">Sure</div>
          <label className="textoDer">{filt[0].arraySure.join(', ')}</label>
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