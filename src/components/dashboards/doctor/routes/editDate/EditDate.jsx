import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";



const EditDate = ({ id }) => {
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
    const handleSubmit = async () => {
        const newAppointment = await healthApi.patch(`/doctor/updateAppointment/${id}`, newDate)
        //notificacion
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
        </div>
    )
}


export default EditDate