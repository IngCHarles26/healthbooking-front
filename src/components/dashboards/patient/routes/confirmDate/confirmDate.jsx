import "./confirmdate.scss";
import Swal from "sweetalert2";
import "animate.css";
import { useEffect } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../../../../redux/slices/pageNav";
import infoSend from "../../../../../redux/slices/patient/infoSend";


//_____________SVGs

function ConfirmDate(props) {

  const dispatch = useDispatch();

  const infoBase = useSelector(st => st.infoSend);
  const doctors = useSelector(st => st.allDoctors);
  const specialtys = useSelector(st => st.allSpecialtys);
  const sures = useSelector(st => st.allSures);
  const users = useSelector(state => state.user)

  const { idDoctor, idPatient, date, time, price } = infoBase;
  const infoDoctor = doctors.find(el => +el.id === +idDoctor);
  const nameDoctor = infoDoctor.name;
  const specialty = specialtys[infoDoctor.Specialty];
  const namePatient = users.name;
  const costo = price;

  //console.log(props.infoFinishDate)





  /*
   const data = infoFinishDate;
  const {idPatient,namePatient,idDoctor,nameDoctor,specialty,date,time,costo} = data;
 */




  const handleSendInfo = async (buyDate) => {
    const response = await healthApi.post(
      "/patient/pay",
      buyDate
    );
    // console.log(response)

    window.location.href = response.data;
  }
  const preference = {
    idPatient,
    idDoctor,
    date,
    time
  }
  useEffect(() => {
    // Verifica que confirmDateData existe antes de mostrar el SweetAlert
    if (infoBase) {
      console.log(infoBase)
      // console.log(specialtys)
      const htmlContent = `

      <div>
        <h2>Datos del paciente</h2>
        <p>Nombre: ${namePatient}</p>
        <p>DNI: ${idPatient}</p>

        <h2>Datos del Médico</h2>
        <p>Nombre: ${nameDoctor}</p>
        <p>Licencia: ${idDoctor}</p>
        <p>Especialidad: ${specialty}</p>

        <h2>Datos de la cita</h2>
        <p>Fecha: ${date}</p>
        <p>Hora: ${time}</p>
        
        <p>Monto a pagar: ${costo}</p>
        <p>El descuento se efectuara en el momento del pago</p>
      </div>
      
    `;

      Swal.fire({
        title: "Confirma tu cita!",
        html: htmlContent,
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

        showCancelButton: true, // Oculta el botón de Cancelar
        showConfirmButton: true, // Oculta el botón OK
        //timer: 10000000000000,
        customClass: {
          container: 'custom-swal-container', // Clase personalizada para el contenedor
        },
        padding: '2rem', // Ajusta el espaciado interno del contenedor
        background: '#fff',
        preConfirm: () => {
          return new Promise((resolve) => {
            // Deshabilita el botón de confirmación después de hacer clic
            const confirmButton = document.querySelector('.swal2-confirm');
            if (confirmButton) {
              confirmButton.disabled = true;
            }

            // Realiza las acciones necesarias
            handleSendInfo(infoBase);
            console.log("Confirmar pago");

            // No cierres manualmente la alerta, espera a que se redirija o se cierre automáticamente
            resolve();
          });
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Acciones cuando se hace clic en Volver
          dispatch(changePage(1));
          console.log("Volver");
        }
      });
    }
  }, [infoBase]);

  return (
    <div>

    </div>
  );
};
//import { changePage } from "../../../../../redux/slices/pageNav";

export default ConfirmDate;


/*
  return ( 
    <main>
        <header>Dashboard &#62; Resumen Cita</header>

        <article className="summary">
          <header>RESUMEN DE CITA</header>

          <div className="table-wrapperr">
            <h1>Confirma tu cita !</h1>
            <div>
              <div>
                  <h2>Datos del paciente</h2>
                  <p>Nombre: {namePatient}</p>
                  <p>Dni: {idPatient}</p>
              </div>
              <div>
                  <h2>Datos del Médico</h2>
                  <p>Nombre: {nameDoctor}</p>
                  <p>Licencia: {idDoctor}</p>
                  <p>Especialidad: {specialty}</p>
              </div>
              <div>
                  <h2>Datos de la cita</h2>
                  <p>Fecha: {date}</p>
                  <p>Hora: {time}</p>
                  
                  <p>Monto a pagar: {costo}</p>
              </div>
              <button>VOLVER</button>
              <button>REALIZAR PAGO</button>
            </div>
          </div>

        </article>

    </main>
  );
}

export default ConfirmDate;
*/
