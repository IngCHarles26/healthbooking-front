import { useLocation } from "react-router-dom";


    const confirmDate = () => {

        const location = useLocation();
        const confirmDateData = location.state ? location.state.confirmDateData : null;

        console.log(confirmDateData)

        const { 
            idPaciente, 
            nombrePaciente, 
            nombreDoctor, 
            idDoctor, 
            especialidadDoctor, 
            fechaCita, 
            horaCita, 
            descuento, 
            montoAPagar 
        } = confirmDateData;

        return(
            <div>
                <h1>Confirma tu cita !</h1>
                {confirmDateData && (
                    <div>
                        <div>
                            <h2>Datos del paciente</h2>
                            <p>Nombre: {nombrePaciente}</p>
                            <p>Dni: {idPaciente}</p>
                        </div>
                        <div>
                            <h2>Datos del Médico</h2>
                            <p>Nombre: {nombreDoctor}</p>
                            <p>Licencia: {idDoctor}</p>
                            <p>Especialidad: {especialidadDoctor}</p>
                        </div>
                        <div>
                            <h2>Datos de la cita</h2>
                            <p>Fecha: {fechaCita}</p>
                            <p>Hora: {horaCita}</p>
                            <p>Descuento: {descuento}</p>
                            <p>Monto a pagar: {montoAPagar}</p>
                        </div>
                        <button>VOLVER</button>
                        <button>REALIZAR PAGO</button>
                    </div>
                )}
            </div>
        )



    };

    export default confirmDate;

/*

npm install sweetalert2
npm install animate.css --save

importaciones

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css"; // Asegúrate de importar animate.css si aún no lo has hecho


const ConfirmDate = () => {
  const location = useLocation();
  const confirmDateData = location.state ? location.state.confirmDateData : null;

  const { 
    idPaciente, 
    nombrePaciente, 
    nombreDoctor, 
    idDoctor, 
    especialidadDoctor, 
    fechaCita, 
    horaCita, 
    descuento, 
    montoAPagar 
  } = confirmDateData;

  useEffect(() => {
    // Verifica que confirmDateData existe antes de mostrar el SweetAlert
    if (confirmDateData) {
      Swal.fire({
        title: "Confirma tu cita!",
        html: (
          <div>
            <h2>Datos del paciente</h2>
            <p>Nombre: {nombrePaciente}</p>
            <p>DNI: {idPaciente}</p>

            <h2>Datos del Médico</h2>
            <p>Nombre: {nombreDoctor}</p>
            <p>Licencia: {idDoctor}</p>
            <p>Especialidad: {especialidadDoctor}</p>

            <h2>Datos de la cita</h2>
            <p>Fecha: {fechaCita}</p>
            <p>Hora: {horaCita}</p>
            <p>Descuento: {descuento}</p>
            <p>Monto a pagar: {montoAPagar}</p>
          </div>
        ),
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }
  }, [confirmDateData]);

  return (
    <div>
     
      </div>
      );
    };
    
    export default ConfirmDate;

    En este código, useEffect se ejecutará después de que el componente ConfirmDate se haya montado y cada vez que confirmDateData cambie. Si confirmDateData existe, se mostrará el SweetAlert con la información relevante.

Asegúrate de ajustar el código según tus necesidades y de cambiar el nombre del componente a ConfirmDate en lugar de confirmDate para seguir las convenciones de nombres de componentes en React.
*/