import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allSures = createSlice({
  name:'allSures',
  initialState,
  reducers:{
    addAllSures: (state,action)=> action.payload,
  }
})

export const {addAllSures} = allSures.actions;
export default allSures.reducer;