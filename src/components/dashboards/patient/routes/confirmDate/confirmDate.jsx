import "./style.scss";
import { useSelector,useDispatch } from "react-redux";
import { changePage } from "../../../../../redux/slices/pageNav";
//_____________SVGs



function ConfirmDate(props) {
  //console.log(props.infoFinishDate)
  const data = props.infoFinishDate;
  const {idPatient,namePatient,idDoctor,nameDoctor,specialty,date,time,costo} = data;
/*
  


const infoFinishDate = {
  idPatient:28271453,
  namePatient:"Santiago Chaparro",
  idDoctor:89657,
  nameDoctor:"Santiago paz",
  specialty:"Cardiología",
  date:"2023-11-11",
  time:"11:00",
  costo:4500

}*/


  return ( 
    <main>
        <header>Dashboard &#62; Resumen Cita</header>

        <article className="summary">
          <header>RESUMEN DE CITA</header>

          <div className="table-wrapperr">
            <h1>Confirma tu cita !</h1>
            <div>
              <div>
                  <h2>Datos del paciente</h2>
                  <p>Nombre: {namePatient}</p>
                  <p>Dni: {idPatient}</p>
              </div>
              <div>
                  <h2>Datos del Médico</h2>
                  <p>Nombre: {nameDoctor}</p>
                  <p>Licencia: {idDoctor}</p>
                  <p>Especialidad: {specialty}</p>
              </div>
              <div>
                  <h2>Datos de la cita</h2>
                  <p>Fecha: {date}</p>
                  <p>Hora: {time}</p>
                  
                  <p>Monto a pagar: {costo}</p>
              </div>
              <button>VOLVER</button>
              <button>REALIZAR PAGO</button>
            </div>
          </div>

        </article>

    </main>
  );
}

export default ConfirmDate;