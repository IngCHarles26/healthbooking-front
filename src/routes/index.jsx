import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/landing/landing";
import DashboardPatient from "../components/dashboards/patient/dashboardPatient";
import DashboardMaster from "../components/dashboards/master/dashboardMaster";
import DashboardDoctor from "../components/dashboards/doctor/dashboardDoctor";
import Detail from "../components/dashboards/general/Detail/Detail";



const router = createBrowserRouter([
  {path:'/',element:<Landing/>},
  {path:'/patient',element:<DashboardPatient/>},
  {path:'/patient/detailDoctor/:id',element:<Detail />},
  {path:'/master',element:<DashboardMaster/>},
  {path:'/doctor',element:<DashboardDoctor/>},


]);


export default router