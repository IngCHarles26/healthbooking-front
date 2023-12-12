import "./homepatient.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//_____________SVGs
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";
import star from "../../../../assets/img/Iconos/star-fill-svg";

import { healthApi } from "../../../../../Api/HealthBookingApi";

function HomePatient() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthApi.get("/patient/appointment/39421857");
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const max = Math.ceil(data.length / perPage);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    setCurrentPage(currentPage - 1);
  };


  const handleQualify= (id)=>{
    Swal.fire({
      title:"¿Como valoras la atención de tu doctor?",
      html: `<input type="number" id="score" placerholder="Ingresa un puntaje" min="1" max="5"/>
            <button id="submitScore">Enviar</button>
      `,
      showClass:{
        popup:`
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass:{
        popup:`
        animate__animated
        animate__fadeOutDown
        animate__faster
        `
      },
      didOpen:  ()=>{
        const buttonEnviar= document.getElementById('submitScore');
        buttonEnviar.addEventListener('click', async ()=>{

          const score= document.getElementById('score').value;

          try{
              const bodyScore={
                idAppoinment:id,
                score:score,
              }
              const patchScore = await healthApi.patch(`/patient/appointment`, bodyScore)

              Swal.fire({
                position: "top-end",
                icon: "success",
                title:"¡Calificación enviada!",
                showConfirmButton: false,
                timer:1200
              });

              Swal.close()
          }

          catch(error){
              Swal.fire({
                position: "top-end",
                icon: "error",
                title:"Tuvimos un problema",
                text:error.response.data,
                showConfirmButton: false,
                timer:1600
              });
          }
        })
     }
    });
  }

  return (
    <main className="homepatient-main">
      <header>Dashboard &#62; Home</header>

      <article className="homepatient-summary">
        <header className="homePatient-header">Historial de Turnos</header>

        <article className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Medico</th>
                <th>Especialidad</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.slice(
                  (currentPage - 1) * perPage,
                  (currentPage - 1) * perPage + perPage
                )
                .map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.date}</td>
                    <td>{cita.time}</td>
                    <td>{cita.Doctor.name}</td>
                    <td>{cita.Doctor.Specialty.name}</td>
                    <td>{cita.finalAmount}</td>
                    <td>{cita.status}</td>
                    <td>{cita.score ? (<div className="score"> <img src={star}/> {cita.score} </div>): <button onClick={()=>handleQualify(cita.id)}>Qualify</button> }</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </article>
      </article>

      <footer className="homepatient-footer">
        <button disabled={currentPage === 1} onClick={previous}>
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <button className="pageButton">{currentPage}</button>
        <button disabled={currentPage === max} onClick={next}>
          <img src={rightArrow} alt="rightArrow" />
        </button>
      </footer>
    </main>
  );
}

export default HomePatient;
