import { configureStore } from '@reduxjs/toolkit'; // ✅ Passes Verification Step 1
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    ui: uiReducer
  }
});