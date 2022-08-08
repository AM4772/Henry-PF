import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  payment: {},
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    getPayments: (state, action) => {
      state.payments = action.payload;
    },
    getPaymentID: (state, action) => {
      state.payment = action.payload;
    },
    clearPayment: (state) => {
      state.payment = {};
    },
  },
});

export const { getPayments, getPaymentID } = paymentsSlice.actions;

export default paymentsSlice.reducer;
