import "./style.scss";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { Link } from "react-router-dom";

import leftArrow from '../../../../assets/brands/left-arrow.svg'
import rightArrow from '../../../../assets/brands/right-arrow.svg'



function HomeDoctor(props) {
  const [selectedDate, setSelectedDate] = useState();
  const [datesDoctor, setDatesDoctor] = useState(new Date());
  const [dateList, setDateList] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthApi.get('/doctor/appointment/45289');
        console.log(response.data)
        setDatesDoctor(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const handleDateChange = (date) => {   //cambia y filtra el dia en las citas

    const formattedDate = date.toISOString().split('T')[0];
    // const dateSelected = new Date(date);
    console.log(formattedDate)

    setSelectedDate(formattedDate);

    const citasDelDia = datesDoctor.filter((cita) => {
      return cita.date === formattedDate
    });
    console.log(citasDelDia)
    setDateList(citasDelDia)
  }

  // paginacion
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const max = Math.ceil(dateList.length / perPage)

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    setCurrentPage(currentPage - 1);
  };


  function menorHoras(fechaSeleccionada) {       //verifica si las horas son menos que 24
    const actualDate = new Date();
    const selectDate = new Date(fechaSeleccionada);

    const timestampsActual = actualDate.getTime();
    const timestampSelect = selectDate.getTime();

    const diferencia = timestampSelect - timestampsActual;

    const diferenciaEnHoras = diferencia / (1000 * 60 * 60);
    return diferenciaEnHoras < 24;
  }


  const tileClassName = ({ date }) => {   //saca sabados y domingos
    return date.getDay() !== 0 && date.getDay() !== 6 ? 'allowed-day' : 'not-allowed-day';
  };


  return (
    < main >
      <article className="summary">
        <header>Historial de Citas</header>

        <article className="table-wrapper">
          {dateList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Obra Social</th>
                  <th>Detalle</th>
                  <th>Historia Clinica</th>
                  <th>Reprogramar</th>
                </tr>
              </thead>

              <tbody>
                {dateList?.slice((currentPage - 1) * perPage,
                  Math.min((currentPage - 1) * perPage + perPage, dateList.length)).map((cita) => (
                    <tr key={cita.id}>
                      <td>{cita.time}</td>
                      <td>{cita.Patient.name}</td>
                      <td>{cita.Patient.Sure.name}</td>
                      <td><button onClick={() => alert('aca iria el detail con un dispatch')}>x</button> </td>
                      <td>
                        {cita.Patient.history === null ? (
                          <button onClick={() => alert('aca iria el form con un dispatch')}>x</button>
                        ) : (
                          <Link to={cita.Patient.history} target="_blank">
                            <button>x</button>
                          </Link>
                        )}
                      </td>
                      <td>
                        {menorHoras(cita.date) ? (
                          <button onClick={() => alert('No puedes reprogramar esta cita en menos de 24 horas.')}>
                            x
                          </button>
                        ) : (
                          <button onClick={() => console.log('aca iria el reprogramar con un dispatch')}>x</button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>) : (<p>{dateList.length === 0 && selectedDate ? 'No hay citas para el día seleccionado.' : 'Seleccione un día para ver las citas.'}</p>)}
        </article>
      </article >
      {dateList.length !== 0 && selectedDate ? (
        <footer className="navigation">
          <button disabled={currentPage === 1} onClick={previous}>
            <img src={leftArrow} alt="leftArrow" />
          </button>
          <button className="pageButton">
            {currentPage}
          </button>
          <button disabled={currentPage === max} onClick={next}>
            <img src={rightArrow} alt="rightArrow" />
          </button>
        </footer>) : null}
      <div>
        <Calendar className="custom-calendar-style" onChange={handleDateChange} tileClassName={tileClassName} />
      </div>
    </main >

  );
}

export default HomeDoctor;