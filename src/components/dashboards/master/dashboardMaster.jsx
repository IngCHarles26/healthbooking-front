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
import { useEffect, useState } from "react";
import axios from "axios";
import HomeMaster from "./routes/home/homeMaster";
//import PostDoctor from "../doctor/PostDoctor/PostDoctor";

const routes = {

}

const infoUser = {
  image:imagePrueba,
  name:'Perico Palotes',
  info:[
    {text:'Altura',info:'190cm'},
    {text:'Peso',info:'79kg'},
    {text:'Nacimiento',info:'Sep 04, 1996'},
    {text:'RH',info:'O+'},
  ],
}

const navigationOptions = [
  { svg: homeSVG, text: 'Home', link: 0 },
  { svg: newDateSVG, text: 'Crear Doctor', link: 1 },
  { svg: editSVG, text: 'Editar perfil', link: 2 },
  // {svg:historySVG, text:'Historial Medico', link:3},
]

function DashboardPatient() {
  const [currentPage, setCurrentPage] = useState(0);

  // console.log({currentPage})

  //_______________Obtencion de informacion
  useEffect(() => {

  }, [])
  //_______________Navegacion en el Dashboard 

  
  const pageList = [
    <HomeMaster />,
    <PostDoctor />
  ];
  const handlePage = (page) => setCurrentPage(page);

  // const informacion = [
  //   { text: "Altura", info:"190cm (74.8in)"},
  //   { text: "Peso", info:"79kg (39,5Lb)"},
  //   { text: "Cumpleaños", info:"Sep 04, 1996"},
  //   { text: "RH", info:"O+"},
  // ]

  // const perfil = { rol: 'Paciente', img: "fotoPerfil", name: "Fabio Catrillon" }

  return (
    <div className="wrapper-PatientHome">
      <AsideLeft
        menuData={navigationOptions}
        handlePage={handlePage} />

        {/* <AsideRight 
        parametros={informacion} 
        perfil={perfil} /> */}

      <div className="dashboard-main">

      {pageList[currentPage]}

      </div>

      <aside className="user-menu">
        <AsideRight
          type='Master'
          image={infoUser.image}
          name={infoUser.name}
          info={infoUser.info}
        />
      </aside>

    </div>
  );
}

export default DashboardPatient;
