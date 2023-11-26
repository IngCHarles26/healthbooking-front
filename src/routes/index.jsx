import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/landing/landing";
import DashboardPatient from "../components/dashboards/patient/dashboardPatient";
import DashboardMaster from "../components/dashboards/master/dashboardMaster";



const router = createBrowserRouter([
  {path:'/',element:<Landing/>},
  {path:'/patient',element:<DashboardPatient/>},
  {path:'/master',element:<DashboardMaster/>},

]);


export default router