import "./InfoPaciente.css"
// import foto from "../../../imagenes/Image.png"

const InfoPaciente = () => {


  return (
    <div className="contenedor">
      <div className="subContenedor">
        <h2 className="paciente">Paciente</h2>
        <img  className="foto" src={''} alt="No found" />
        <div className="contNombre">
          <h3 className="Info" >Jose Abel Aguilar</h3>
          <h4 className="editPer">Editar perfil</h4>
        </div>
        <div className="contInfo">
          <h3 className="Info">Informacion</h3>
          <div className="altura">
            <h3 className="texto1">Altura</h3>
            <h3 className="texto2">190cm (74.8in)</h3>
          </div>
          <div className="altura">
            <h3 className="texto1">Peso</h3>
            <h3 className="texto2">79kg (39,5Lb)</h3>
          </div>
          <div className="altura">
            <h3 className="texto1" >Cumpleaños</h3>
            <h3 className="texto2">Sep 04, 1996</h3>
          </div>
          <div className="altura">
            <h3 className="texto1">RH</h3>
            <h3 className="texto2">+O</h3>
          </div>
        </div>
      </div>
     
    </div> 
  )
}

export default InfoPaciente;