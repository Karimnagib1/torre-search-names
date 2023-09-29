import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Login/UserSlics";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
