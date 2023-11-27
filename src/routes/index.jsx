import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/landing/landing";
import DashboardPatient from "../components/dashboards/patient/dashboardPatient";
import DashboardMaster from "../components/dashboards/master/dashboardMaster";
import DashboardDoctor from "../components/dashboards/doctor/dashboardDoctor";
import UserForm from "../components/userForm/userForm";



const router = createBrowserRouter([
  {path:'/',element:<Landing/>},
  {path:'/patient',element:<DashboardPatient/>},
  {path:'/patientForm',element:<UserForm/>},
  {path:'/patient/detailDoctor/:id',element:<p>holi</p>},
  {path:'/master',element:<DashboardMaster/>},
  {path:'/doctor',element:<DashboardDoctor/>},


]);


export default router