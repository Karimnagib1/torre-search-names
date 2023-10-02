import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/UserSlice";
import searchReducer from "../features/Search/SearchSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
