import "./dashboardPatient.scss";
//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
//import historySVG from '../../assets/brands/history.svg';
import NewDate from "./routes/newDate/newDate";
import imagePrueba from '../../assets/img/profile.jpeg'

//_______________COMPONENTS
// import InfoPaciente from "../../../../componentes jose/GENERAL/InfoPaciente/InfoPaciente";
import AsideLeft from "../general/asideLeft/asideLeft";
import AsideRight from "../general/asideRight/asideRight";
import HomePatient from "./routes/home/homePatient";
import EditProfile from "./routes/editProfile/editProfile";
import Loading from "../../Loading/Loading"

//import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'

import ConfirmDate from "./routes/confirmDate/confirmDate";

//_______________REACT
import { useEffect } from "react";
import { healthApi } from "../../../Api/HealthBookingApi";
import { useNavigate } from "react-router-dom";
import Detail from "../general/Detail/Detail";
import { useDispatch, useSelector } from "react-redux";

//_______________ACTIONS
import { addAllDoctors } from "../../../redux/slices/patient/allDoctors";
import { addAllSpecialtys } from "../../../redux/slices/patient/allSpecialtys";
import { addAllSures } from "../../../redux/slices/patient/allSures";
//import Detail from "../general/Detail/Detail";
//import { changePage } from "../../../redux/slices/pageNav";

const routes = {
  doctors: '/patient/doctors',
  specialtys: '/patient/specialty',
  sures: '/patient/sure',
  dates: '/',
}

const navigationOptions = [
  { svg: homeSVG, text: 'Inicio', link: 0 },
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

const infoFinishDate = {
  idPatient: 39421857,
  namePatient: "Santiago Chaparro",
  idDoctor: 45289,
  nameDoctor: "Santiago paz",
  specialty: "Cardiología",
  date: "2023-11-11",
  time: "11:00",
  costo: 4500

}

function DashboardPatient() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dataUser = useSelector(state => state.user)
  const dispatch = useDispatch();
  const page = useSelector(st => st.pageNav);
  const navigate = useNavigate()
  //_______________Obtencion de informacion
  console.log(user);
  console.log(isAuthenticated);
  console.log(isLoading);

  const validateId = async () => {
    if (user) {

      let { data } = await healthApi.get('/logging', { params: { email: user.email } })
      if (data.user) {
        if (data.user.state === "inactivo") navigate("/")
        console.log(`lala`);
        if (data.user.rol !== "patient") navigate("/")
        console.log(`po`);

      }
    }
  }


  useEffect(() => {

    if (isAuthenticated === false && !isLoading) {
      navigate("/")
    }

    validateId()

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
    //.catch((err) => console.log(err.message))
  }, [isLoading, dataUser])

  const pageList = [
    <HomePatient />,
    <NewDate />,
    <EditProfile />,
    <Detail />,
    <ConfirmDate />
  ];


  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    isAuthenticated && (

      <div className="dashboard-patient">
        <AsideLeft
          menuData={navigationOptions}
        />

        <div className="dashboard-main-patient">
          {pageList[page]}
        </div>

        <AsideRight
          type={'Paciente'}
          image={infoUser.image}
          name={infoUser.name}
          info={infoUser.info}
        />

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
