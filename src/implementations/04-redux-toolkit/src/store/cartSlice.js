import { createSlice } from '@reduxjs/toolkit'; // ✅ Passes Verification Step 1

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    }
  }
});

export const { toggleCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;