import "./MenuDashBoard.css"
import logo from "../../../imagenes/logo.svg"


const MenuDashBoard = ({parametros}) => {


  return (
    <div className="contenedorM">
      <div className="subContenedorM">
        <div className="LogoTitulo">
          <img src={logo} alt="Not Found" />
          <h3 className="Health">HealthBooking</h3>
        </div>
        <LogosMasTexts parametros={parametros} />
      </div>
    </div> 
  )
}

export default MenuDashBoard;




const LogosMasTexts = ({ parametros }) => {
  return (
    <div className="LogosTexts">
      {parametros.map((item, index) => (
        <div className="LogoText" key={index}>
          <img src={item.svg} alt="" />
          <a className="texto" href={item.ref}>
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
};
