import "./AsideRight.css"
//import foto from "../../../imagenes/Image.png"

const AsideRight = (props) => {
  const {image,name,info,type} = props;

// console.log({image})

  return (
    <aside className="contenedor">
      <div className="subContenedor">
        <h2 className="paciente">{type}</h2>
        
          {image !==undefined 
            ? <img  className="foto" src={image} alt="" /> 
            : <div className="marco" />}
        
        <div className="contNombre">
          <h3 className="Info" >{name}</h3>
          <h4 className="editPer">Editar perfil</h4>
        </div>
        <div className="contInfo">
          <h3 className="Info">Informacion</h3>
          {info.map((item) => infor(item))}
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
