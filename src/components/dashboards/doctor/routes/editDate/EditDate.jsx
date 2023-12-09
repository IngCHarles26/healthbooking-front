import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";



const EditDate = ({ id }) => {

    const navigate = useNavigate()
    const [appointment, setAppointment] = useState({})
    const [newDate, setNewDate] = useState({
        date: '',
        time: ''
    })

    const getAppointment = (idDate) => {
        const appointment = healthApi.get(`/doctor/appointmentById/${idDate}`)
        setAppointment(appointment)
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
        navigate('rutadecitas')
    }

    const handleSubmit = async () => {
        const newAppointment = await healthApi.patch(`/doctor/updateAppointment/${id}`, newDate)
        //notificacion
        if (newAppointment) {
            Swal.fire("Se camio la fecha de la cita con exito!");
            navigate('rutadecitas')
        }

    }

    useEffect(() => {
        getAppointment(id)
    }, [])
    3

    return (
        <div>
            <h2>{appointment.Patient.name}</h2>
            <h2>{appointment.patientId}</h2>
            <h2>{appointment.date}</h2>
            <h2>{appointment.time}</h2>

            <input type="date" onChange={handleDate} />
            <input type="time" min="08:00" max="16:00" step="3600" value={newDate.time} onChange={handleTime} />


            <button onClick={() => handleSubmit()}>Listo</button>
            <button onClick={() => handleCancel()}>Cancelar</button>


        </div>
    )
}


export default EditDate