import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducer/fetchDataSlice'
export const store = configureStore({

  reducer: {
    posts: postsReducer,
  },
})