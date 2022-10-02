import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
  status: "idle",
  error: null,
};

export const fetchDataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    successFetchPostData: (state, actions) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = "loading";
      state.postsList = actions.payload;
      state.status = "success";
    },
    cleanPostData: (state) => {
      state.postsList = [];
    },
    failedFetchPostData: (state, actions) => {
      state.status = "loading";
      state.error = actions.payload;
      state.status = "failed";
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

// Action creators are generated for each case reducer function
export const { successFetchPostData, cleanPostData, failedFetchPostData } =
  fetchDataSlice.actions;

export default fetchDataSlice.reducer;
