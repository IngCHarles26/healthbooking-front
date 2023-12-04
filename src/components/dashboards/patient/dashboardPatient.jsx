import "./style.scss";
//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
import historySVG from '../../assets/brands/history.svg';
import NewDate from "./routes/newDate/newDate";
import imagePrueba from '../../assets/img/profile.jpeg'


//_______________COMPONENTS
// import InfoPaciente from "../../../../componentes jose/GENERAL/InfoPaciente/InfoPaciente";
import AsideLeft from "../general/asideLeft/asideLeft";
import AsideRight from "../general/asideRight/asideRight";
import HomePatient from "./routes/home/homePatient";
import EditProfile from "./routes/editProfile/editProfile";

import { useEffect, useState } from "react";
//import axios from "axios";

import { useAuth0 } from '@auth0/auth0-react'

import ConfirmDate from "./routes/confirmDate/confirmDate";

import { healthApi } from "../../../Api/HealthBookingApi";


const routes = {
  doctors: '/doctors',
  specialtys: '/specialty',
  sures: '/sure',
  dates: '/',
}

const navigationOptions = [
  { svg: homeSVG, text: 'Home', link: 0 },
  { svg: newDateSVG, text: 'Nueva cita', link: 1 },
  { svg: editSVG, text: 'Editar perfil', link: 2 },
  { svg: editSVG, text: 'Resumen Cita', link: 3 },
  // {svg:historySVG, text:'Historial Medico', link:3},
]

const infoUser = {
  image: imagePrueba,
  name: 'Perico Palotes',
  info: [
    { text: 'Altura', info: '190cm' },
    { text: 'Peso', info: '79kg' },
    { text: 'Nacimiento', info: 'Sep 04, 1996' },
    { text: 'RH', info: 'O+' },
  ],
}

const infoFinishDate = {
  idPatient:39421857,
  namePatient:"Santiago Chaparro",
  idDoctor:45289,
  nameDoctor:"Santiago paz",
  specialty:"Cardiología",
  date:"2023-11-11",
  time:"11:00",
  costo:4500

}

function DashboardPatient() {
  const [currentPage, setCurrentPage] = useState(0);
  const [sures, setSures] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useAuth0()

  // console.log({currentPage})

  // const navigate = useNavigate();

  //_______________Obtencion de informacion
  useEffect(() => {
    healthApi.get(routes.doctors)
      .then(({ data }) => {
        setDoctors(data);
        return healthApi.get(routes.specialtys)
      })
      .then(({ data }) => {
        setSpecialtys(data);
        return healthApi.get(routes.sures)
      })
      .then(({ data }) => { setSures(data) })
      .then(() => console.log({ sures, specialtys, doctors }))
      .catch((err) => console.log(err.message))
  }, [])
  //_______________Navegacion en el Dashboard 
  const pageList = [
    <HomePatient />,
    <NewDate
      sures={convertOptions(sures)}
      doctors={convertDoctors(doctors)}
      specialtys={convertOptions(specialtys)} />,
    <EditProfile />,
    <ConfirmDate
      infoFinishDate={infoFinishDate}/>
  ];
  const handlePage = (page) => setCurrentPage(page);



  return (
    isAuthenticated && (<div className="wrapper-PatientHome">
      <AsideLeft
        menuData={navigationOptions}
        handlePage={handlePage} />

      <div className="dashboard-main">
        {pageList[currentPage]}
      </div>

      <aside className="user-menu">

        <AsideRight
          type={'Paciente'}
          image={infoUser.image}
          name={infoUser.name}
          info={infoUser.info}
        />
      </aside>

    </div>)
  );
}

export default DashboardPatient;

const convertDoctors = (docs) =>
  docs.map(doc => {
    return {
      ...doc,
      Specialty: doc.Specialty.id,
      Sures: doc.Sures.map(sure => sure.id)
    }
  });

const convertOptions = (values) => values.reduce((ac, el) => {
  return [...ac, el.name]
}, ['no have'])