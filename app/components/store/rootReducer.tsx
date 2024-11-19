// store/rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './userSlice'; // Import the user slice
import cartReducer from './cartslice'
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer, // Add user reducer
});

export default rootReducer;
