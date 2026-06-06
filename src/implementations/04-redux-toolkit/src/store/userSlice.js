import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "John Doe",
  isLoggedIn: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Left empty since user state is static in this benchmark baseline
  }
});

export default userSlice.reducer;