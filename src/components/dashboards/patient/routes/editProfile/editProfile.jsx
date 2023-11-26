import "./style.scss";

//_____________SVGs
import leftArrow from '../../../../assets/brands/left-arrow.svg'
import rightArrow from '../../../../assets/brands/right-arrow.svg'



function EditProfile() {
  return ( 
    <main>
        <header>Dashboard &#62; Editar Perfil</header>

        <article className="summary">
          <header>Editar Perfil</header>

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
                  <td>IDssssssssssssssss ssssssss</td>
                  <td>IDssssssssssssssss ssssssss</td>
                  <td>IDssssssssssssssss ssssssss</td>
                  <td>IDssssssssssssssss ssssssss</td>
                  <td>IDssssssssssssssss ssssssss</td>
                  <td>IDssssssssssssssss ssssssss</td>

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

export default EditProfile;