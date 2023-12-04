import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allDoctors = createSlice({
  name:'allDoctors',
  initialState,
  reducers:{
    addAllDoctors: (state,action)=> action.payload,
  }
})

export const {addAllDoctors} = allDoctors.actions;
export default allDoctors.reducer;