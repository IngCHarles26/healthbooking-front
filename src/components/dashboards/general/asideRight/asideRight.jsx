import { useAuth0 } from "@auth0/auth0-react";
// import "./AsideRight.css";
import './asideRight.scss';
//import foto from "../../../imagenes/Image.png"

//EL ASIDE RIGHT ES UN COMPONENTE QUE SE RENDERIZA EN CADA TIPO DE USUARIO, YA SEA POR AUTH0 O DE MANERA LOCAL
const AsideRight = (props) => {
  const {image,name,info,type} = props;
  const {user} = useAuth0();
// console.log({image})

  //console.log(user);

  return (
    <aside className="aside-right">
        <h2 className="type">{type}</h2>

        {user.picture !== undefined 
          ? <img className="foto" src={user.picture} alt="" /> 
            : <div className="marco" />}

        <div className="contNombre">
          <h3 className="Info" >{user.name}</h3>
          <h4 className="editPer"></h4>
        </div>
      
        <div className="contInfo">
          <h3 className="Info">Informacion</h3>
          {info.map((item, index) => infor(item, index))}
        </div>
    </aside>

  )
}

export default AsideRight;

const infor = (item, index) => {
  return(
    <div className="data-user" key={index}>
      <h3 className="label">{item.text}</h3>
      <h3 className="info">{item.info}</h3>
    </div>
  )
}