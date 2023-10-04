import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractTokenFromCookie } from "../../utils/extractToken";

/**
 * This thunk fetches the favorites from the backend
 */
export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async () => {
    const token = extractTokenFromCookie();
    if (token) {
      const jsonResponse = await fetch("https://torre-search-names.onrender.com/favorites/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await jsonResponse.json();
      return response.favoriteSearches;
    }
    return [];
  }
);

const favorites = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle getFavorites state changes
    builder
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
        state.favorites = payload;
        state.status = "fulfilled";
      })
      .addCase(getFavorites.pending, (state, { payload }) => {
        state.status = "pending";
      })
      .addCase(getFavorites.rejected, (state, { payload }) => {
        state.status = "rejected";
      });
  },
});

// Create and export selectors
export const selectFavorites = (state) => {
  return state.favorites.favorites;
};

export const selectFavoritesStatus = (state) => {
  return state.favorites.status;
};

// Export the favorites reducer
export default favorites.reducer;
