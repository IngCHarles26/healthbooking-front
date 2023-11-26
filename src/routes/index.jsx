import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/landing/landing";
import DashboardPatient from "../components/dashboards/patient/dashboardPatient";



const router = createBrowserRouter([
  {path:'/',element:<Landing/>},
  {path:'/patient',element:<DashboardPatient/>},
]);


export default router