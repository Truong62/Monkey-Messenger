import { createSlice } from "@reduxjs/toolkit";

const urlBackTo = createSlice({
    name: "urlBackToData",
    initialState: {
        urlBack: []
    },
    reducers: {
        savaUrL: (state, action) => {
            state.urlBackTos.push(action.payload);
        }
    },
});

export const { savaUrL } = urlBackTo.actions;
export const selectUrl = (state) => state.urlBackToData;
export default urlBackTo.reducer;