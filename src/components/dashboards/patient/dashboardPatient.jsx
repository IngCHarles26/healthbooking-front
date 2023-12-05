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
import ConfirmDate from "./routes/confirmDate/confirmDate";

//_______________REACT
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { healthApi } from "../../../Api/HealthBookingApi";
import { useDispatch,useSelector } from "react-redux";

//_______________ACTIONS
import { addAllDoctors } from "../../../redux/slices/patient/allDoctors";
import { addAllSpecialtys } from "../../../redux/slices/patient/allSpecialtys";
import { addAllSures } from "../../../redux/slices/patient/allSures";
import Detail from "../general/Detail/Detail";
import { changePage } from "../../../redux/slices/pageNav";

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

function DashboardPatient() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const page = useSelector(st=>st.pageNav);

  //_______________Obtencion de informacion
  useEffect(() => {
    healthApi.get(routes.doctors)
      .then(({ data }) => {
        dispatch(addAllDoctors(convertDoctors(data)));
        return healthApi.get(routes.specialtys)
      })
      .then(({ data }) => {
        dispatch(addAllSpecialtys(convertOptions(data)));
        return healthApi.get(routes.sures)
      })
      .then(({ data }) => { 
        dispatch(addAllSures(convertOptions(data)));
      })
      .catch((err) => console.log(err.message))
  }, [])
  //_______________Navegacion en el Dashboard 
  const pageList = [
    <HomePatient />,
    <NewDate/>,
    <EditProfile />,
    <Detail/>,
    <ConfirmDate/>
  ];

  return (
    isAuthenticated && (<div className="wrapper-PatientHome">
      <AsideLeft
        menuData={navigationOptions} 
      />

      <div className="dashboard-main">
      {pageList[page]}
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