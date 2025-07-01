// src/redux/snackbar/snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: '',
    type: 'success', // 'success' or 'error'
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'success';
    },
    clearSnackbar: (state) => {
      state.message = '';
      state.type = 'success';
    },
  },
});

export const { showSnackbar, clearSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;