
import { createSlice } from '@reduxjs/toolkit';

const notificationAlertSlice = createSlice({
  name: 'notificationAlert',
  initialState: {
    title: '', 
    description: '',  
  },
  reducers: {
    showNotification: (state, action) => {
      state.description = action.payload.description;
      state.title = action.payload.title ;
    },
    clearNotification: (state) => {
      state.description = '';
      state.title = '';
    },
  },
});

export const { showNotification, clearNotification } = notificationAlertSlice.actions;
export default notificationAlertSlice.reducer;