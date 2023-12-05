import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allSpecialtys = createSlice({
  name:'allSpecialtys',
  initialState,
  reducers:{
    addAllSpecialtys: (state,action)=> action.payload,
  }
})

export const {addAllSpecialtys} = allSpecialtys.actions;
export default allSpecialtys.reducer;