import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      if (state.items[plant.name]) {
        state.items[plant.name].quantity += 1;
      } else {
        state.items[plant.name] = { ...plant, quantity: 1 };
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      if (state.items[name]) {
        state.items[name].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
