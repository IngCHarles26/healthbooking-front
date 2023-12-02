import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/landing/landing";
import DashboardPatient from "../components/dashboards/patient/dashboardPatient";
import DashboardMaster from "../components/dashboards/master/dashboardMaster";
import DashboardDoctor from "../components/dashboards/doctor/dashboardDoctor";
import UserForm from "../components/userForm/userForm";
import Detail from "../components/dashboards/general/Detail/Detail";
import Error404 from "../components/error404/Error404";
import Confirmdate from "../components/dashboards/patient/routes/confirmedate/Confirmdate";
const router = createBrowserRouter([
  { path: "/confirmdate", element: <Confirmdate /> },
  { path: "/error", element: <Error404 /> },
  { path: "/", element: <Landing /> },
  { path: "/patient", element: <DashboardPatient /> },
  { path: "/patientForm", element: <UserForm /> },
  { path: "/patient/detailDoctor/:id", element: <Detail /> },
  { path: "/master", element: <DashboardMaster /> },
  { path: "/doctor", element: <DashboardDoctor /> },
]);


export default router