import { configureStore } from '@reduxjs/toolkit'
import fetchDataReducer from './reducer/fetchDataSlice'
export const store = configureStore({

  reducer: {
    counter: fetchDataReducer,
  },
})