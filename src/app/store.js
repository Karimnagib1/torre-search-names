import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/UserSlice";
import searchReducer from "../features/Search/SearchSlice";
import favoritesReducer from "../features/Favorites/FavoritesSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    favorites: favoritesReducer,
  },
});

export default store;
