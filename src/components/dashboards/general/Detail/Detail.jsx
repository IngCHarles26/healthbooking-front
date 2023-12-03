import "./Detail.css"
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { healthApi } from "../../../../Api/HealthBookingApi";

const Detail = ({ handlePage }) => {

  const { id } = useParams();
  const [doctor, setDoctors] = useState([]);  

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
        <div className="contInfor">
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
        
      <hr className="hr"/>
      </div>

      <div className="contBotones">
            <button className="boton" onClick={()=>handlePage(1)}>Regresar</button>
     </div>
     </div>
    </div>
    </div>
    
  )
}

export default Detail;