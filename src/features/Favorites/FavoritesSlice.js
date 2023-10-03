const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const axios = require("axios");

/**
 * This thunk fetches the favorites from the backend
 */
export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async () => {
    if (!document.cookie.includes("Authorization")) {
      return null;
    }
    const favoritesResponse = await axios.get(
      "http://localhost:3001/favorites"
    );
    return favoritesResponse.data;
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
