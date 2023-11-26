import "./style.scss";

function AsideRight() {
  return ( 
    <div>
      
    </div>
  );
}

export default AsideRight;

/*
import "./AsideRight.css"
//import foto from "../../../imagenes/Image.png"

const AsideRight = ({ parametros, perfil }) => {

  return (
    <aside className="contenedor">
      <div className="subContenedor">
        <h2 className="paciente">{perfil.rol}</h2>
        
        {perfil.img !==undefined ? <img  className="foto" src={perfil.img} alt="" /> : <div className="marco" />}
        
        <div className="contNombre">
          <h3 className="Info" >{perfil.name}</h3>
          <h4 className="editPer">Editar perfil</h4>
        </div>
        <div className="contInfo">
          <h3 className="Info">Informacion</h3>
          {parametros.map((item) => infor(item))}
        </div>
      </div>
    </aside>
    
  )
}

export default AsideRight;


const infor = (item) => {
  return(
    <div className="altura">
      <h3 className="texto1">{item.text}</h3>
      <h3 className="texto2">{item.info}</h3>
    </div>
  )
}

*/