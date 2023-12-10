import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../../../../redux/slices/pageNav";
import "./editDate.scss"
//import logoWhite from "../../../../assets/util/full-logo-black.svg";


const EditDate = () => {
    const dispatch = useDispatch()
    const [appointment, setAppointment] = useState({})
    const [newDate, setNewDate] = useState({
        date: '',
        time: ''
    })

    const id = useSelector(state => state.idDate)
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
    console.log(newDate);
    const handleSubmit = async () => {
        const newAppointment = await healthApi.patch(`/doctor/updateAppointment/${id}`, newDate)
        //notificacion
        console.log(newAppointment);
        if (newAppointment) {
            Swal.fire("Se camio la fecha de la cita con exito!");
            dispatch(changePage(0))
        }

    }

    useEffect(() => {
        getAppointment()
    }, [])



    return (
        Patient && (
            <div className="appointment-details">
                {/* <img src={logoWhite} alt="Logo" className="logo-white" /> */}


                <div className="appointment-info">
                    <h2 className="patient-name">{Patient.name}</h2>
                    <h2 className="patient-id">{appointment.patientId}</h2>
                    <h2 className="appointment-date">{appointment.date}</h2>
                    <h2 className="appointment-time">{appointment.time}</h2>
                </div>


                <div className="edit-cita-time">
                    <input type="date" onChange={handleDate} className="date-input" />
                    <input
                        type="time"
                        min="08"
                        max="16"
                        step="3600"
                        value={appointment.time}
                        onChange={handleTime}
                        className="time-input"
                    />
                </div>


                <div className="editCita-buttons">
                    <button onClick={() => handleSubmit()} className="submit-button">
                        Listo
                    </button>
                    <button onClick={() => handleCancel()} className="cancel-button">
                        Cancelar
                    </button>
                </div>
            </div>








        )
    )
}


export default EditDate