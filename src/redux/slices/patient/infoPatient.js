import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  image: '',
  name: '',
  info: [
    {text:'Altura', info: ''},
    {text:'Peso', info: ''},
    {text:'Nacimiento', info: ''},
    {text:'RH', info: ''},
  ]
};

export const infoPatient = createSlice({
  name: 'infoPatient',
  initialState,
  reducers:{
    addInfoPatient: (state,action)=> action.payload,
  }
});

export const {addInfoPatient} = infoPatient.actions;
export default infoPatient.reducer;