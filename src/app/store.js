import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/UserSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
