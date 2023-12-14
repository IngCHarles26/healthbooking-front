import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import  {healthApi}  from '../../../../../Api/HealthBookingApi';
import Swal from 'sweetalert2';


const ModalStar = (props) => {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0); // Estado para almacenar el valor del Rating
  const {idAppointment, onScoreSubmitted}= props; // Estado para almacenar el valor del Rating

 console.log(idAppointment);

    const handleRatingChange = (event, newValue) => {
      // Actualizar el estado con el nuevo valor de Rating
      setScore(newValue);
    };
  
    const submitScore=async()=>{
  
      try{
            const patchScore = await healthApi.patch('/patient/appointment', { idAppointment, score });

            if (onScoreSubmitted) {

             await onScoreSubmitted(idAppointment);

             const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Carga exitosa"
            });

            }

          } catch (error) {
            
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: "Tuvimos un problema"
            });

          }
          
          

            handleClose()
    }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    border:'none',
  };

  return (
    <div >
      <Button style={{color: 'black'}} onClick={handleOpen}>Calificar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Valora nuestra atención
          </Typography>
    
          <Rating name="simple-controlled" value={score} onChange={handleRatingChange} style={{fontSize: '4em', width:'80%', alignItems:'center', justifyContent:'center'}} />
          <Button onClick={submitScore} variant='contained' >Enviar</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalStar;