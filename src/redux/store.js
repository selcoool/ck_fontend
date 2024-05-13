import { configureStore } from '@reduxjs/toolkit'
// import movieReducer from './movieReducer'
import userReducerSlice from './userReducerSlice';
import jobReducerSlice from './jobReducerSlice';

export const store = configureStore({
  reducer: {
    // manageMovie: movieReducer,
    manageUser: userReducerSlice, 
    manageJob: jobReducerSlice, 

  },
})