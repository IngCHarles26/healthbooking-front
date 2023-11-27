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
    <div className="contDetail">
      <div className="contNombre">
        <h1 className="nombre">{filt[0].name}</h1>
        <img className="foto" alt="" src={filt[0].profilePicture} />
      </div>
      <div className="datos">
        <div className="contInfo">
          <label className="info">Informacion</label>
        </div>
        <div className="frame-2">
          <label className="text-wrapper-2">Especialidad</label>
          <label className="text-wrapper-3">{filt[0].specialty}</label>
        </div>
        <hr />
        <div className="group-2">
          <label className="text-wrapper-4">Licencia</label>
          <p className="text-wrapper-5">{filt[0].license}</p>
        </div>
        <hr />
        <div className="group-2">
          <label className="text-wrapper-6">Telefono</label>
          <label className="text-wrapper-5">{filt[0].phone}</label>
        </div>
        <hr />
        <div className="group-2">
          <div className="text-wrapper-7">email</div>
          <label className="text-wrapper-5">{filt[0].email}</label>
        </div>
        <hr />
        <div className="group-2">
          <div className="text-wrapper-7">Sure</div>
          <label className="text-wrapper-5">{filt[0].arraySure.join(', ')}</label>
        </div>
      </div>

      <div className="contBotones">
          <NavLink to={"/patient/new_appointment"}>
            <button className="Cancel">Cancelar</button>
          </NavLink>

        <button className="Seleccionar">Seleccionar</button>
     </div>

    </div>
  )
}

export default Detail;