import "./style.scss";
//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
import historySVG from '../../assets/brands/history.svg';
import NewDate from "./routes/newDate/newDate";

//_______________COMPONENTS
// import InfoPaciente from "../../../../componentes jose/GENERAL/InfoPaciente/InfoPaciente";
import AsideLeft from "../general/asideLeft/asideLeft";
import HomePatient from "./routes/home/homePatient";
import EditProfile from "./routes/editProfile/editProfile";
import AsideRight from "../general/asideRight/asideRight";

import { useEffect, useState } from "react";
import axios from "axios";

const routes = {
  doctors: 'http://localhost:3001/doctors',
  specialtys: 'http://localhost:3001/specialty',
  sures: 'http://localhost:3001/sure',
  dates: 'http://localhost:3001/',
}

const navigationOptions = [
  {svg:homeSVG, text:'Home', link:0},
  {svg:newDateSVG, text:'Nueva cita', link:1},
  {svg:editSVG, text:'Editar perfil', link:2},
  // {svg:historySVG, text:'Historial Medico', link:3},
]

function DashboardPatient() {
  const [currentPage, setCurrentPage] = useState(0);
  const [sures, setSures] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);
  const [doctors, setDoctors] = useState([]);
  // console.log({currentPage})

  //_______________Obtencion de informacion
  useEffect(()=>{
    axios.get(routes.doctors)
      .then(({data})=>{setDoctors(data); 
        return axios.get(routes.specialtys)})
      .then(({data})=>{setSpecialtys(data);
        return axios.get(routes.sures)})
      .then(({data})=>{setSures(data)})
      .then(()=>console.log({sures,specialtys,doctors}))
      .catch((err)=>console.log(err.message))
  },[])
  //_______________Navegacion en el Dashboard 
  const pageList = [
    <HomePatient />,
    <NewDate 
      sures={convertOptions(sures)} 
      doctors={convertDoctors(doctors)} 
      specialtys={convertOptions(specialtys)}/>,
    <EditProfile/>,
  ];
  const handlePage = (page)=> setCurrentPage(page);

  

  return (
    <div className="wrapper-PatientHome">
      <AsideLeft 
        menuData={navigationOptions} 
        handlePage={handlePage}/>

      <div className="dashboard-main">
      {pageList[currentPage]}
      </div>

      <aside className="user-menu">
        {/* <InfoPaciente/> */}
        {/* <AsideRight/> */}
      </aside>

    </div>
  );
}

export default DashboardPatient;

const convertDoctors = (docs) =>
  docs.map(doc=>{return {...doc,
    Specialty:doc.Specialty.id,
    Sures:doc.Sures.map(sure=>sure.id)}});

const convertOptions = (values) => values.reduce((ac,el)=>{
  return [...ac,el.name]
},['no have'])