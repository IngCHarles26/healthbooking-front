import { useEffect, useState } from "react";
import axios from "axios";
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";

import { healthApi } from "../../../../../Api/HealthBookingApi";
import "./historialpagos.scss";

const HistorialPagos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthApi.get("/master/appointment");
        const filterData = response.data.filter(
          (cita) => cita.status === "pending"
        );
        setData(filterData);
      } catch (error) {
        console.error({ message: "Error al cargar los datos", error });
      }
    };
    fetchData();
  }, [data]);

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
    <main className="historialPagos-main">
      <header className="historialPagos-header">
        Dashboard &#62; Historial de pago
      </header>

      <article className="historialPagos-article">
        <header className="historialPagos-header2">Historial de pagos</header>

        <article className="historialPagos-table-wrapper">
          <table className="historialPagos-table">
            <thead>
              <tr>
                <th>Transacciones</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody className="historialPagos-tbody">
              {data
                ?.slice(
                  (currentPage - 1) * perPage,
                  (currentPage - 1) * perPage + perPage
                )
                .map((cita) => (
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
      </article>

      <footer className="historialPagos-navigation">
        <button
          className={`historialPagos-pageButton ${
            currentPage === 1 ? "disabled" : ""
          }`}
          disabled={currentPage === 1}
          onClick={previous}
        >
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <button className="historialPagos-pageButton">{currentPage}</button>
        <button
          className={`historialPagos-pageButton ${
            currentPage === max ? "disabled" : ""
          }`}
          disabled={currentPage === max}
          onClick={next}
        >
          <img src={rightArrow} alt="rightArrow" />
        </button>
      </footer>
    </main>
  );
};

export default HistorialPagos;
