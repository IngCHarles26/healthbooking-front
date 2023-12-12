import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const idDate = createSlice({
    name: 'idDate',
    initialState,
    reducers: {
        addidDate: (state, action) => action.payload,
    }
})

export const { addidDate } = idDate.actions;
export default idDate.reducer;