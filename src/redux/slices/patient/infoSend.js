import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: '',
  time: '',
  idPatient: 0,
  idDoctor: 0,
  price: 0
};

const infoSend = createSlice({
  name: 'infoSend',
  initialState,
  reducers: {
    setInfo: (state, action) => action.payload,
  }
})

export const { setInfo } = infoSend.actions;
export default infoSend.reducer;