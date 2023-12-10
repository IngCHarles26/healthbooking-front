import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import { useDispatch } from "react-redux";
import { changePage } from "../../../../../redux/slices/pageNav";



const EditDate = ({ id }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [appointment, setAppointment] = useState({})
    const [newDate, setNewDate] = useState({
        date: '',
        time: ''
    })

    const { Patient } = appointment;


    const getAppointment = async () => {
        const { data } = await healthApi.get(`/doctor/appointmentById/${id}`)
        setAppointment(data)

    }
    const handleTime = (e) => {
        const newTime = e.target.value
        setNewDate({
            ...newDate,
            time: newTime
        })
    }

    const handleDate = (e) => {
        let newDates = e.target.value
        setNewDate({
            ...newDate,
            date: newDates
        })
    }

    const handleCancel = () => {
        dispatch(changePage(1))
    }

    const handleSubmit = async () => {
        const newAppointment = await healthApi.patch(`/doctor/updateAppointment/${id}`, newDate)
        //notificacion
        if (newAppointment) {
            Swal.fire("Se camio la fecha de la cita con exito!");
            dispatch(changePage(1))
        }

    }

    useEffect(() => {
        getAppointment()
    }, [])



    return (
        Patient && (<div>

            <label>Nombre de paciente</label>
            <h2>{Patient.name}</h2>
            <label>Paciente DNI</label>
            <h2>{appointment.patientId}</h2>
            <label>Fecha de la cita</label>
            <h2>{appointment.date}</h2>
            <label>Hora de la cita</label>
            <h2>{appointment.time}</h2>
            <label>Nueva fecha de la cita</label>
            <input type="date" onChange={handleDate} />
            <label>Nueva hora de la cita</label>
            <input type="time" min="08:00" max="16:00" step="3600" value={newDate.time} onChange={handleTime} />


            <button onClick={() => handleSubmit()}>Listo</button>
            <button onClick={() => handleCancel()}>Cancelar</button>


        </div>)
    )
}


export default EditDate