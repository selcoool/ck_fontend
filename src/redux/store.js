import { configureStore } from '@reduxjs/toolkit'
// import movieReducer from './movieReducer'
import userReducerSlice from './userReducerSlice';
import jobReducerSlice from './jobReducerSlice';
import commentReducerSlice from './commentReducerSlice';
import typeJobReducerSlice from './typeJobReducerSlice';
import recruitJobReducerSlice from './recruitJobReducerSlice';

export const store = configureStore({
  reducer: {
    // manageMovie: movieReducer,
    manageUser: userReducerSlice, 
    manageJob: jobReducerSlice, 
    manageComment:commentReducerSlice,
    manageTypeJob: typeJobReducerSlice,
    manageRecruitJob:recruitJobReducerSlice


  },
})