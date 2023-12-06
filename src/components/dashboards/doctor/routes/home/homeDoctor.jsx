import "./homeDoctor.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";

function HomeDoctor(props) {

  const [ patients, setPatients ] = useState([])
  const [ selectName, setSelectName ] = useState('')
  const [ errors, setErrors ] = useState({});
  const [ medicalHistory, setMedicalHistory ] = useState({
    name: '',
    link: ''
  })

  useEffect(()=>{
    healthApi.get('/master')
    .then(({data}) => {
      setPatients(data)
    })
  },[])

  const alphabetically = patients.sort((a ,b) => a.name.localeCompare(b.name) ) 

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === "name") setSelectName(value)
    setMedicalHistory({...medicalHistory, [name]: value})
    setErrors(validatios({...medicalHistory, [name]: value}))
  }

  const seteo = () => {
    setErrors('')
    setSelectName('')
    setMedicalHistory({
      name: '',
      link: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (medicalHistory.name === '' && medicalHistory.link === ''){
        alert("Por Favor llena los campos")
      } else if (medicalHistory.name === ''){
        alert("Falta el paciente, por favor seleccione un nombre")
      } else if (medicalHistory.link === ''){
        alert("Falta el historial clinico, por favor ingrese el valor correspondiente")
      } else {
        //const { data } = await healthApi.post("/", medicalHistory);
        setSelectName('')
        setMedicalHistory({
         name: '',
         link: ''
        })
      
        alert('Registro Exitoso!')
      }
    } catch (error) {
      alert (error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="contentDoctor">
        <p>Historial Clinico del Paciente</p>

      <div>
        <p> Paciente:</p>
        <select name="name" value={selectName} onChange={handleChange}>
          <option value="">Seleccionar</option>
          {alphabetically.map((pat, index)=> (
            <option key={index} value={pat.name}>{pat.name}</option>
          ))}
        </select>
        <p className="MessageError">{errors.name}</p>
      </div>
      <div>
        <p> Historial Clinico: </p>
        <input type="text" name="link" placeholder="link del Historial Clinico" value={medicalHistory.link} onChange={handleChange}/>
        <p className="MessageError">{errors.link}</p>
      </div>

      <div>
        <button type="button" className="botones" onClick={()=> seteo()}>Cancelar</button>
        <button type="submit" className="botones">Enviar</button>
      </div>
      </div>
      

    </form>
  );
}

export default HomeDoctor;


const validatios = ({ name, link }) => {
  
  let error = {};

  if (!name) error.name = "Debe seleccionar un paciente"
  else error.name = ""

  if (!link) error.link = "Este campo no debe estar vacio"
  else error.link = ""
  

  return error
}