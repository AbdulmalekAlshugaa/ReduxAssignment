import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storesApi from "../../api/storesApi";

const initialState = {
  postsList: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    console.log("fetchPosts");
    const response = await storesApi.getAllStores({ page: 1 });


    if (response.ok) {
      const posts = await response.data.result
      return { posts };
    } else {
      return Promise.reject(response);
    }
  }
);


export const fetchDataSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    successFetchPostData: (state, actions) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.status = "loading";
      state.postsList = state.postsList.concat(actions.payload);
      state.status = "success";
    },
    cleanPostData: (state) => {
      state.postsList = [];
    },
    failedFetchPostData: (state, actions) => {
      state.status = "loading";
      state.error =  state.postsList.concat(actions.payload);
      state.status = "failed";
    },
    
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        // Add any fetched posts to the array
        state.postsList = state.postsList.concat(action.payload.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { successFetchPostData, cleanPostData, failedFetchPostData } = fetchDataSlice.actions;

export default fetchDataSlice.reducer;
