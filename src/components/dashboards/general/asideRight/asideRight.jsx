import { useAuth0 } from "@auth0/auth0-react";
// import "./AsideRight.css";
import './asideRight.scss';
import { useEffect } from "react";
import { useSelector } from "react-redux";
//import foto from "../../../imagenes/Image.png"

//EL ASIDE RIGHT ES UN COMPONENTE QUE SE RENDERIZA EN CADA TIPO DE USUARIO, YA SEA POR AUTH0 O DE MANERA LOCAL
const AsideRight = (props) => {
  const dataUser = useSelector(state => state.user)
  const { image, name, info, type } = props;
  const { user, logout } = useAuth0();
  // console.log({image})
  useEffect(() => {

  }, [dataUser])
  //console.log(user);

  const handleLogOut = () => {

    localStorage.clear();

    logout({ logoutParams: { returnTo: window.location.origin } })

  }

  return (
    <aside className="aside-right">
      <h2 className="type">{type}</h2>

      {user.picture !== undefined
        ? <img className="foto" src={user.picture} alt="" />
        : <div className="marco" />}

      <div className="contNombre">
        <h3 className="Info" >{name}</h3>
        <h4 className="editPer"></h4>
      </div>

      <div className="contInfo">
        <h3 className="Info">Informacion</h3>
        {info.map((item, index) => infor(item, index))}
      </div>
      <div className="botonSalir">
        <button className="salir" onClick={() => handleLogOut()}>Cerrar Sesión</button>
      </div>
    </aside>

  )
}

export default AsideRight;

const infor = (item, index) => {
  return (
    <div className="data-user" key={index}>
      <h3 className="label">{item.text}</h3>
      <h3 className="info">{item.info}</h3>
    </div>
  )
}