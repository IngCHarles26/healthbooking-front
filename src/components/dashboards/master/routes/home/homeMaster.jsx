import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import "./style.scss";
import Statistics from "../../statistics";

function HomeMaster(props) {

  // const [ dataUsers, setDataUsers] = useState([])
  // const [ aux, setAux] = useState(false)
  // const [ aux2, setAux2] = useState(false)

  // useEffect(()=>{
  //   healthApi.get('/master')
  //   .then(({data}) => {
  //     setDataUsers(data);
  //   })
  // },[])

  // useEffect(()=>{
  //   healthApi.get('/master')
  //   .then(({data}) => {
  //     setDataUsers(data);
  //   })
  // },[aux, aux2])

  // let dataPatients = dataUsers.filter((item)=> item.id.toString().length>5).sort((a, b) => a.name.localeCompare(b.name))

  //  const disable = (id) => {

  //   if (aux) setAux(false)

  //   let patient = dataPatients.find((item)=> item.id === id)

  //    if (patient.state === "active" ) {
  //      healthApi.patch(`/master/toggle/${id}`)
  //   .then(({data}) => {
  //     alert(data.mensaje);
  //     setAux(true)
  //   })
  //   }
  // }

  // const enable = (id) => {
  //   if (aux2) setAux2(false)

  //   let patient = dataPatients.find((item)=> item.id === id)

  //   if (patient.state === "inactive" ) {
  //      healthApi.patch(`/master/toggle/${id}`)
  //   .then(({data}) => {
  //     alert(data.mensaje);
  //     setAux2(true)
  //   })
  //   }
  // }

  return (
    <div>

      <Statistics />



    </div>

  );
}

export default HomeMaster;