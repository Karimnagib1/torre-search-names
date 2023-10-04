import { createSlice } from "@reduxjs/toolkit";

const alert = createSlice({
  name: "alert",
  initialState: {
    message: "",
    severity: "info",
    isVisible: false,
  },
  reducers: {
    setAlert: (state, { payload }) => {
      state.message = payload.message;
      state.severity = payload.severity;
      state.isVisible = payload.isVisible;
    },
  },
});

export const selectMessage = (state) => {
  return state.alert.message;
};
export const selectSeverity = (state) => {
  return state.alert.severity;
};
export const selectIsVisible = (state) => {
  return state.alert.isVisible;
};

export const { setAlert } = alert.actions;
export default alert.reducer;
