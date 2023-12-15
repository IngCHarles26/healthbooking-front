import "./style.scss";
//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
//import historySVG from '../../assets/brands/history.svg';
import imagePrueba from '../../assets/img/profile.jpeg'
//_______________COMPONENTS
import AsideLeft from "../general/asideLeft/asideLeft";
import AsideRight from "../general/asideRight/asideRight";
import Loading from "../../Loading/Loading"
import ClinicalHistory from "./routes/ClinicalHistory/ClinicalHistory";

import { healthApi } from "../../../Api/HealthBookingApi";
import { useEffect, useState } from "react";
//import axios from "axios";
import HomeDoctor from "./routes/home/homeDoctor";
import EditDate from "./routes/editDate/EditDate";
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { adduser } from "../../../redux/slices/user/user";

const routes = {

}
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

const navigationOptions = [
  { svg: homeSVG, text: 'Inicio', link: 0 },
  { svg: newDateSVG, text: 'Historial Clinico', link: 1 },
  // {svg:historySVG, text:'Historial Medico', link:3},
]

function DashboardDoctor() {

  //const user = useSelector(state => state.user)
  const { user, isAuthenticated, isLoading } = useAuth0()
  const page = useSelector(st => st.pageNav);
  const navigate = useNavigate()
  //_______________Obtencion de informacion

  const validateId = async () => {
    if (user) {

      let { data } = await healthApi.get('/logging', { params: { email: user.email } })
      if (data.user) {
        if (data.user.state === "inactivo") navigate("/")
        if (data.user.rol !== "doctor") navigate("/")

      }
    }

  }

  const getUser = async () => {
    if (user) {

      const { data } = await healthApi.get('/logging', { params: { email: userEmail } })
      if (data.user) {
        dispatch(adduser(data.user))
      }
    }
  }


  useEffect(() => {

    if (isAuthenticated === false && !isLoading) {
      navigate("/")
    }
    getUser()
    validateId()

  }, [isLoading])
  //_______________Navegacion en el Dashboard 
  const pageList = [
    <HomeDoctor />,
    <ClinicalHistory />,
    <EditDate />
  ];



  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    isAuthenticated && (<div className="dashboard-doctor">

      <AsideLeft
        menuData={navigationOptions}
      />

      <div className="dashboard-main-doctor">
        {pageList[page]}
      </div>

      <AsideRight
        type='Doctor'
        image={infoUser.image}
        name={infoUser.name}
        info={infoUser.info}
      />

    </div>)
  );
}

export default DashboardDoctor;