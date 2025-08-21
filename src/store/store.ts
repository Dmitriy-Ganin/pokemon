import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import { baseAPI } from '../api/baseAPI';
import { authAPI } from '../api/authAPI';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseAPI.middleware)
      .concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch