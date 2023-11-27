import "./AsideRight.css"
//import foto from "../../../imagenes/Image.png"


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
