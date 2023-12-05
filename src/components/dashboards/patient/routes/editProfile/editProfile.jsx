import "./style.scss";

//_____________SVGs
import leftArrow from '../../../../assets/brands/left-arrow.svg'
import rightArrow from '../../../../assets/brands/right-arrow.svg'

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from 'axios'



function EditProfile() {

  //analizar si traer el id por parametro y realizar la busqueda en la base de datos o si existe un estado global que almacena esa informacion
  const id= useSelector((state=> state.infoSend.idPatient))
  const [patient, setPatient]=useState({}) //esto puede ser un estado global o cargalo a traves del useEffect
  const [edit, setEdit]=useState(false)
  const [editPatient, setEditPatient]=useState({})

  
  useEffect(()=>{
    const searchPatient= axios(`http://localhost:3001/patient/${id}`)
    .then(({data}) => {
      setPatient(data)
      setEditPatient(data) 
    })
    
  
  },[id])
  
  console.log("Paciente ",patient)
  console.log("A Editar" , editPatient)

  const handleEdit =()=>{

    setEdit(true)
  }

  const handleCancel =()=>{

    setEdit(false)
    setEditPatient(patient)
  }

  const handleInputChange=(e)=>{
    const {name, value} = e.target

    setEditPatient({...editPatient, [name]:value})

  }

  const handleSaveChanges =async()=>{

    try {
       await axios.put(`http://localhost:3001/patient/${id}`, editPatient)

       setEdit(false)

    } catch (error) { 
      throw alert(error.message)
    }
  }
  
  const sureString=()=>{
    switch (Number(editPatient.sureId)) {
      case 1: return  'OSDE'

      case 2: return 'Swiss Medical'

      case 3: return 'Medifé'

      case 4: return 'Galeno'

      case 5: return 'Sancor Salud'

      default: return 'None'
        
    }
  }

  return ( 
    <main>
        <header>Dashboard &#62; Editar Perfil</header>

        <article className="summary">
          <header>Edit profile</header>
      {patient &&
        
        <div>
          <div >
            <label htmlFor="name">Name: </label>
            {edit ? <input style={{color:"red"}}  type="text" name="name" value={editPatient.name} onChange={handleInputChange}/> : <span>{editPatient.name}</span>}
            
          </div>
          <div >
            <label htmlFor="id">Dni: </label>
            <span>{editPatient.id}</span>
            
          </div>
          <div >
            <label htmlFor="email">Email: </label>
            <span>{editPatient.email}</span>

          </div>
          <div >
            <label htmlFor="phone">Phone: </label>
            {edit ? (<input style={{color:"red"}}  type="text" name="phone" value={editPatient.phone} onChange={handleInputChange}/>) : (<span>{editPatient.phone}</span>)}

          </div>
          <div >
            <label htmlFor="sure">Sure: </label>
            {edit ? (
                <select style={{color:"red"}} name="sureId" value={editPatient.sureId} onChange={handleInputChange}>
                    <option default value>Select an option</option>
                    <option  value="1">OSDE</option>
                    <option  value="2">Sweet Medical</option>
                    <option  value="3">Medifé</option>
                    <option  value="4">Galeno</option>
                    <option  value="5">Sancor Salud</option>
                    <option  value="" >None</option>
                </select>
            ) : (<span>{sureString()}</span>)}

          </div>
          <div >
            <label htmlFor="height">Height: </label>
            {edit ? (<input style={{color:"red"}}  type="text" name="height" value={editPatient.height} onChange={handleInputChange}/>) : (<span>{editPatient.height}</span>)}

          </div>
          <div >
            <label htmlFor="weight">Weight:</label>
            {edit ? (<input  style={{color:"red"}} type="text" name="weight" value={editPatient.weight} onChange={handleInputChange}/> ) :( <span>{editPatient.weight}</span>)}

          </div>
          <div >
            {
              edit ? (<div>
                        <button style={{border: 'solid',padding: '5px', backgroundColor:'green', borderRadius: '5px'}} onClick={handleSaveChanges}>Save changes</button>
                        <button style={{border: 'solid',padding: '5px', backgroundColor:'red',borderRadius: '5px'}} onClick={handleCancel}>Cancel</button>
                    </div>)
                    :
                    (<button style={{border: 'solid',padding: '5px', backgroundColor:'blue', borderRadius: '5px'}} onClick={handleEdit}>Edit</button>)
            }

          </div>

          </div>
          }
        </article>

    </main>
  );
}

export default EditProfile;