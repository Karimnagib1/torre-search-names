import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  async (searchTerm) => {
    const jsonResponse = await fetch(
      "https://torre.ai/api/entities/_search/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchTerm,
          torreGgId: "",
          identityType: "person",
          limit: 10,
          meta: true,
          excluding: [],
          excludedPeople: [],
          excludeContacts: false,
        }),
      }
    );
    const response = await jsonResponse.json();
    console.log(response);
    return response.results;
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
        if (payload.length > 0) {
          state.status = "fulfilled";
        } else {
          state.status = "rejected";
        }
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

export const selectSearchResults = (state) => {
  return state.search.searchResults;
};
export const selectSearchStatus = (state) => {
  return state.search.status;
};

export const { setSearchResults } = search.actions;
export default search.reducer;
