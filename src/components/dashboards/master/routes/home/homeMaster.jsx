import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import "./style.scss";

function HomeMaster(props) {

  const [ dataUsers, setDataUsers] = useState([])
  const [ aux, setAux] = useState(false)
  const [ aux2, setAux2] = useState(false)

  useEffect(()=>{
    healthApi.get('/master')
    .then(({data}) => {
      setDataUsers(data);
    })
  },[])

  useEffect(()=>{
    healthApi.get('/master')
    .then(({data}) => {
      setDataUsers(data);
    })
  },[aux, aux2])
  
  let dataPatients = dataUsers.filter((item)=> item.id.toString().length>5).sort((a, b) => a.name.localeCompare(b.name))

   const disable = (id) => {

    if (aux) setAux(false)

    let patient = dataPatients.find((item)=> item.id === id)

     if (patient.state === "active" ) {
       healthApi.patch(`/master/toggle/${id}`)
    .then(({data}) => {
      alert(data.mensaje);
      setAux(true)
    })
    }
  }

  const enable = (id) => {
    if (aux2) setAux2(false)

    let patient = dataPatients.find((item)=> item.id === id)

    if (patient.state === "inactive" ) {
       healthApi.patch(`/master/toggle/${id}`)
    .then(({data}) => {
      alert(data.mensaje);
      setAux2(true)
    })
    }
  }

  return ( 
    <div className="ContenedorM">
    <ol>
      {dataPatients?.map((item)=>(
        <li>{item.name}: 
        ...|<button onClick={()=> enable(item.id)} className={item.state==='active'?"ButonActive":"ButonNotActive"}>✔</button>|...|
        <button onClick={()=> disable(item.id)} className={item.state==='inactive'? "ButonDisabled" : "ButonNotDisabled"}>❌</button>|</li>  
      ))}
    </ol>
    </div>
  );
}

export default HomeMaster;