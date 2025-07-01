import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Slice';
import { getUserById, getUserByToken } from './Thunk';
import snackbarReducer, { showSnackbar } from './SanckbarSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        snackbar: snackbarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

const loadUserData = async () => {
    try {
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