// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>; // Get the type of the state
export type AppDispatch = typeof store.dispatch;
export default store;
