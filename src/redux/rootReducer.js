import { combineReducers } from "@reduxjs/toolkit";
import pageNav from "./slices/pageNav";
import allDoctors from "./slices/patient/allDoctors";
import allSures from "./slices/patient/allSures";
import allSpecialtys from "./slices/patient/allSpecialtys";
import doctorSelected from "./slices/patient/doctorSelected";
import agendaDoctor from "./slices/patient/agendaDoctor";
import infoSend from "./slices/patient/infoSend";
import idDate from "./slices/doctor/idDate";
import user from "./slices/user/user";

const rootReducer = combineReducers({
  //Comp AsideLeft
  pageNav,

  //Comp Dashboard Patient
  //info User
  user,
  allDoctors,
  allSures,
  allSpecialtys,
  //Comp New Date
  infoSend,
  doctorSelected,
  agendaDoctor,

  //Comp Dashboard Doctor
  idDate,
  //Comp Dashboard Master

})

export default rootReducer;