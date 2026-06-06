import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: "light",
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  }
});

export const { toggleTheme, setNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;