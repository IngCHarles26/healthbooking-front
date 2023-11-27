import "./AsideRight.css"
//import foto from "../../../imagenes/Image.png"
<<<<<<< HEAD
import { useAuth0 } from '@auth0/auth0-react'


const AsideRight = ({ parametros, perfil }) => {
=======
>>>>>>> 9b63cadf935e85e419b39a9c6a7f737392e6cc59


const AsideRight = (props) => {
  const {image,name,info,type} = props;

// console.log({image})

  console.log(user);

  return (
    <aside className="contenedor">
      <div className="subContenedor">
        <h2 className="paciente">Master</h2>

        {user?.img !== undefined ? <img className="foto" src={user?.img} alt="" /> : <div className="marco" />}

        <div className="contNombre">
          <h3 className="Info" >{user.name}</h3>
          <h4 className="editPer">Editar perfil</h4>
        </div>
        <div className="contInfo">
          <h3 className="Info">Informacion</h3>
          {/* {parametros.map((item) => infor(item))} */}
        </div>
      </div>
    </aside>

  )
}

export default AsideRight;
<<<<<<< HEAD




const infor = (item) => {
  return(
    <div className="altura">
      <h3 className="texto1">{item.text}</h3>
      <h3 className="texto2">{item.info}</h3>
    </div>
  )
}

=======
>>>>>>> 9b63cadf935e85e419b39a9c6a7f737392e6cc59
