import "./style.scss";

//_____________SVGs
import leftArrow from '../../../../assets/brands/left-arrow.svg'
import rightArrow from '../../../../assets/brands/right-arrow.svg'



function HomePatient() {
  return ( 
    <main>
        <header>Dashboard &#62; Home</header>

        <article className="summary">
          <header>Historial de Turnos</header>

          <article className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Medico</th>
                  <th>Especialidad</th>
                  <th>Valor</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID </td>
                  <td>Fecha</td>
                  <td>Medico</td>
                  <td>Especialidad</td>
                  <td>Valor</td>
                  <td>Estado</td>
                </tr>
                {/* {currentCitas.map((cita, index) => (
                  <tr key={index}>
                    <td>{cita.Especialidad}</td>
                    <td>{cita.Medico}</td>
                    <td>{cita.Valor}</td>
                    <td>{cita.Estado}</td>
                    <td>{cita.Fecha}</td>
                    <td>{cita.IdDeCita}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </article>

        </article>

        <footer className="navigation">
          <button>
            <img src={leftArrow} alt="leftArrow" />
          </button>
          <button className="pageButton">
            1
          </button>
          <button>
            <img src={rightArrow} alt="rightArrow" />
          </button>
          
        </footer>
    </main>
  );
}

export default HomePatient;