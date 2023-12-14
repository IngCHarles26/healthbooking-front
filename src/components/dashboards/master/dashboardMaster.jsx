import "./style.scss";
//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
import historySVG from '../../assets/brands/history.svg';
import imagePrueba from '../../assets/img/profile.jpeg'
//_______________COMPONENTS
import AsideLeft from "../general/asideLeft/asideLeft";
import AsideRight from "../general/asideRight/asideRight"
import PostDoctor from "./routes/PostDoctor/PostDoctor";

import HistorialPagos from "./routes/HistorialPagos/HistorialPagos";

import { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import { healthApi } from "../../../Api/HealthBookingApi";
//import axios from "axios";
import HomeMaster from "./routes/home/homeMaster";
import AdminUsers from "./routes/logical erase/adminUsers";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
//import PostDoctor from "../doctor/PostDoctor/PostDoctor";

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
  { svg: newDateSVG, text: 'Crear Doctor', link: 1 },
  { svg: editSVG, text: 'Administrar usuarios', link: 2 },
  { svg: editSVG, text: 'Historial pagos', link: 3 },
]

function DashboardPatient() {
  //const user = useSelector(state => state.user)
  const algo = useSelector((st) => st.pageNav)
  const [currentPage, setCurrentPage] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()
  // console.log({currentPage})

  const validateId = async () => {
    if (user) {
      let { data } = await healthApi.get('/logging', { params: { email: user.email } })
      if (data.user) {
        if (data.user.state === "inactivo") navigate("/")
        if (data.user.rol !== "master") navigate("/")

      }
    }
  }


  //_______________Obtencion de informacion
  useEffect(() => {

    if (isAuthenticated === false && !isLoading) {
      navigate("/")
    }

    validateId()

  }, [isLoading])
  //_______________Navegacion en el Dashboard 


  const pageList = [
    <HomeMaster />,
    <PostDoctor />,
    <AdminUsers />,
    <HistorialPagos />

  ];
  const handlePage = (page) => setCurrentPage(page);

  // const informacion = [
  //   {text: "Altura", info:"190cm (74.8in)"},
  //   {text: "Peso", info:"79kg (39,5Lb)"},
  //   {text: "Cumpleaños", info:"Sep 04, 1996"},
  //   {text: "RH", info:"O+"},
  // ]

  // const perfil = {rol: 'Paciente', img: "fotoPerfil", name: "Fabio Catrillon" }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    isAuthenticated && (<div className="dashboard-master">
      <AsideLeft
        menuData={navigationOptions}
        handlePage={handlePage} />

      <div className="dashboard-main-master">

        {pageList[algo]}

      </div>


      <AsideRight
        type='Master'
        image={infoUser.image}
        name={infoUser.name}
        info={infoUser.info}
      />


    </div>)
  );
}

export default DashboardPatient;
