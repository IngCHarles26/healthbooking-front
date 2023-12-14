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

import { useEffect, useState } from "react";
//import axios from "axios";
import HomeDoctor from "./routes/home/homeDoctor";
import EditDate from "./routes/editDate/EditDate";
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const user = useSelector(state => state.user)
  //const [currentPage, setCurrentPage] = useState(0);
  const { isAuthenticated, isLoading } = useAuth0()
  const page = useSelector(st => st.pageNav);
  const navigate = useNavigate()
  // console.log({currentPage})
  const id = "0258b824-98ea-47aa-9cb3-8b5a08031d81"
  //_______________Obtencion de informacion

  if (user.state === "inactivo") navigate("/")

  useEffect(() => {

  }, [])
  //_______________Navegacion en el Dashboard 
  const pageList = [
    <HomeDoctor />,
    <ClinicalHistory />,
    <EditDate />
  ];
  const handlePage = (page) => setCurrentPage(page);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    isAuthenticated && user.rol === "doctor" ? (<div className="wrapper-PatientHome">
      <AsideLeft
        menuData={navigationOptions}
      />

      <div className="dashboard-main">
        {pageList[page]}
      </div>

      <aside className="user-menu">
        <AsideRight
          type='Doctor'
          image={infoUser.image}
          name={infoUser.name}
          info={infoUser.info}
        />
      </aside>

    </div>) : navigate("/")
  );
}

export default DashboardDoctor;