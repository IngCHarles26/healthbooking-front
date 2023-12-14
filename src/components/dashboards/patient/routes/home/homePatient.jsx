
import "./homepatient.scss";
import { useState, useEffect } from "react";
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";
import starYellow from "../../../../assets/img/Iconos/star-yellow.png";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import ModalStar from "./ModalStar";
import { useSelector } from "react-redux";

function HomePatient() {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await healthApi.get(`/patient/appointment/${user.id}`);
          console.log(user)
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Lógica para manejar errores
        }
      };

      fetchData();
    }
  }, [user]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const max = Math.ceil(data.length / perPage);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    setCurrentPage(currentPage - 1);
  };


  const renderButton = (cita) => {

    if (cita.status === 'pago') {
      if (cita.score) {
        return <div className="score"> <img src={starYellow} className='starPuntaje' alt='Estrella' /> {cita.score}/5 </div>;

      } else {
        return <ModalStar idAppointment={cita.id} onScoreSubmitted={handleScoreSubmitted} />
      }
    }
    else {
      return <div className="score"> - </div>;
    }
  };

  const handleScoreSubmitted = async () => {
    try {
      const response = await healthApi.get(`/patient/appointment/${user.id}`);
      setData(response.data);
    } catch (error) {
      throw alert("Error fetching data:", error);
    }
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
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Calificación</th>

              </tr>
            </thead>
            <tbody>
              {(Array.isArray(data) && data.length > 0) ? (data.slice(
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
                    <td>{renderButton(cita)}</td>
                  </tr>
                ))) : (
                <tr>
                  <td>
                    <span>No hay citas registradas</span>
                  </td>
                </tr>
              )}
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