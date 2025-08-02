import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Slice';
import { getUserById, getUserByToken } from './Thunk';
import snackbarReducer, { showSnackbar } from './SanckbarSlice';
import notificationAlertReducer, { showNotification } from './NotificationAlertSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
        notificationAlert: notificationAlertReducer, // Importing notification alert slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

const loadUserData = async () => {
    try {
         store.dispatch(
           showNotification ({ description: "Logged-In failed. Try again", title: "this is title" })
        );
        const refreshToken = await localStorage.getItem('refreshToken');
        const accessToken = await localStorage.getItem('accessToken');
        console.log("refreshToken in localStorage", refreshToken);
        console.log("Access token in localStorage", accessToken);
        if (refreshToken && accessToken) {

            await store.dispatch(getUserByToken());
        }
    } catch (error) {
        console.log("Error loading user data:", error);
        store.dispatch(
            showSnackbar({ message: error?.message || "Logged-In failed. Try again", type: "error", time: 3000 })
        );

    }
};

loadUserData();

export default store;