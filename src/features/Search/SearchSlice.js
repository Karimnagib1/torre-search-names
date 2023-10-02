import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  async (searchTerm) => {
    const searchResponse = await axios.post(
      "https://torre.ai/api/entities/_search",
      {
        query: searchTerm,
        torreGgId: "",
        identityType: "person",
        limit: 10,
        meta: true,
        excluding: [],
        excludedPeople: [],
        excludeContacts: false,
      }
    );
    return searchResponse.data.results;
  }
);

const search = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    status: "rejected",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.fulfilled, (state, { payload }) => {
        state.searchResults = payload;
        state.status = "fulfilled";
      })
      .addCase(getSearchResults.pending, (state, { payload }) => {
        state.status = "pending";
        state.searchResults = [];
      })
      .addCase(getSearchResults.rejected, (state, { payload }) => {
        state.status = "rejected";
        state.searchResults = [];
      });
  },
});

export const { setSearchResults } = search.actions;
export default search.reducer;
