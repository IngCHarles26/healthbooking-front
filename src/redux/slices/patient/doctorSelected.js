import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const doctorSelected = createSlice({
  name:'doctorSelected',
  initialState,
  reducers:{
    setId: (state,action)=> action.payload,
  }
})

export const {setId} = doctorSelected.actions;
export default doctorSelected.reducer;