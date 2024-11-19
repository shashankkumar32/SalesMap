import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number; // Added price field
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<{ _id: string; name: string; price: number }>) => {
        const item = state.items.find(item => item._id === action.payload._id);
        if (item) {
          item.quantity += 1; // Increment quantity if the item already exists
        } else {
          // Add new item with default quantity 1 to the top of the list
          state.items.unshift({
            _id: action.payload._id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: 1,
          });
        }
      },
      deleteItem: (state, action: PayloadAction<string>) => {
        // Remove the item from the cart completely if the quantity is 0
        state.items = state.items.filter(item => item._id !== action.payload);
      },
      updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find(item => item._id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity; // Update quantity
  
          // Remove the item if its quantity reaches 0
          if (item.quantity === 0) {
            state.items = state.items.filter(i => i._id !== item._id);
          }
        }
      },
      clearCart: (state) => {
        state.items = []; // Reset the cart items
      },
    },
  });
    export const { addItem, deleteItem, updateQuantity ,clearCart} = cartSlice.actions;
  export default cartSlice.reducer;