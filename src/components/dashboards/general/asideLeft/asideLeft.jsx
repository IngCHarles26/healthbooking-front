import "./style.css";

import logo from '../../../assets/logo.svg';


function AsideRight({props}) {
  return (
    <div className="contenedorM">
      <div className="subContenedorM">
        <div className="LogoTitulo">
          <img src={logo} alt="Not Found"/>
          <h3 className="Health">HealthBooking</h3>
        </div>
        <LogosMasTexts parametros={props} />
      </div>
    </div> 
  );
}

export default AsideRight;

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
