


import { useEffect, useState } from 'react';
import axios from 'axios';
import leftArrow from '../../../../assets/brands/left-arrow.svg';
import rightArrow from '../../../../assets/brands/right-arrow.svg';

import { healthApi } from "../../../../../Api/HealthBookingApi";

const HistorialPagos = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthApi.get('/master/appointment');
        const filterData = response.data.filter(cita => cita.status === 'pendiente');
        setData(filterData);

      } catch (error) {
        console.error({ message: 'Error al cargar los datos', error });
      }
    };
    fetchData();
  }, []);

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
    <main >
      <header>Dashboard &#62; Inicio</header>

      <article className="summary">
        <header >Historial de pagos</header>
        {data.length > 0 ? (
          <>
            <article className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Transacciones</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.slice(
                    (currentPage - 1) * perPage,
                    (currentPage - 1) * perPage + perPage
                  ).map((cita) => (
                    <tr key={cita.id}>
                      <td>Pago turno médico</td>
                      <td>{cita.finalAmount}</td>
                      <td>{cita.status}</td>
                      <td>{cita.paymentDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </>) : (<p>Cargando datos...</p>)
        }
      </article>

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
      </footer>

    </main>
  );
};

export default HistorialPagos;

