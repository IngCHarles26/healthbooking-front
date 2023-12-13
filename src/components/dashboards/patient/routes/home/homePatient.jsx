import "./homepatient.scss";

import { useState, useEffect } from "react";
import axios from "axios";

//_____________SVGs
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";

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

  return (
    <div className="homepatient-main">
      <header>Dashboard &#62; Home</header>

      <article className="homepatient-summary">
        <header className="homePatient-header">Historial de Turnos</header>

        <article className="table-wrapper">
          <table className="table-table-wrapper">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Medico</th>
                <th>Especialidad</th>
                <th>Valor</th>
                <th>Estado</th>
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
        <p className="">Pag. {currentPage}</p>
        <button disabled={currentPage === max} onClick={next}>
          <img src={rightArrow} alt="rightArrow" />
        </button>
      </footer>
    </div>
  );
}

export default HomePatient;
