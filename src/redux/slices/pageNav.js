import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const pageNav = createSlice({
  name: 'pageNav',
  initialState,
  reducers:{
    changePage: (state,action)=> action.payload,
  }
});

export const {changePage} = pageNav.actions;
export default pageNav.reducer;