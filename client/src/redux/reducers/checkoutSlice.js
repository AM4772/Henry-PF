import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mpID: "",
  order: {
    ID: "",
    items: [],
    status: "",
    status_detail: "",
    total: 0,
  },
  items: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.mpID = action.payload.mpID;
    },
    clearPayment: (state) => {
      state.mpID = "";
      state.order = {
        ID: "",
        items: [],
        status: "",
        status_detail: "",
        total: 0,
      };
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setPayment, clearPayment, setOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;
