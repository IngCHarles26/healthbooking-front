import "./App.scss";
import React,{Suspense} from "react";
import { RouterProvider } from "react-router-dom";

import router from './routes/index'

import DashboardPatient from "./components/dashboards/patient/dashboardPatient";
import Landing from "./components/landing/landing";
import PostDoctor from "./components/dashboards/doctor/PostDoctor/PostDoctor";
//import AsideRight from "./components/dashboards/general/AsideRight/AsideRight";



import AsideLeft from "./components/dashboards/general/asideLeft/asideLeft";
// import InfoPaciente from "../../../../componentes jose/GENERAL/InfoPaciente/InfoPaciente";



function App() {
  return (
    <Suspense fallback={<Landing/>}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;
