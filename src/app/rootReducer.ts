import { combineReducers } from '@reduxjs/toolkit';
import simsReducer from '../features/dashboard/slices/simsSlice';
import authReducer from '../features/auth/slices/authSlice';

export const rootReducer = combineReducers({
  sims: simsReducer,
  auth: authReducer,
});
