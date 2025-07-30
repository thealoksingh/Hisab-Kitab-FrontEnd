import { createSlice } from "@reduxjs/toolkit";
import { getAllFriends, getUserByToken, handleRefreshToken, logout, register, signIn } from "./Thunk";

const initialState = {
    user: null,
    friends: [],
    loading: false,
    errorMessage: null,
    accessToken: null,
    refreshToken: null,
    friendRequestCount: 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: () => {
            console.log("User logged out successfully");
            return initialState;
        },
      
    },
    extraReducers: (builder) => {
        builder
            // Sign In
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                console.log("User = ", action.payload.data);
                state.user = action?.payload?.data?.user;
                state.accessToken = action?.payload?.data?.accessToken;
                state.refreshToken = action?.payload?.data?.refreshToken;
                localStorage.setItem('accessToken', state.accessToken);
                localStorage.setItem('refreshToken', state.refreshToken);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message;
            })

            // register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                console.log("User = ", action.payload);
                state.user = action?.payload?.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Restore user
            .addCase(getUserByToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.loading = false;
                console.log("User = ", action.payload.data);
                state.user = action?.payload?.data?.user;
                state.accessToken = action?.payload?.data?.accessToken;
                state.refreshToken = action?.payload?.data?.refreshToken;
                localStorage.setItem('accessToken', state?.accessToken);
                localStorage.setItem('refreshToken', state?.refreshToken);
            })
            .addCase(getUserByToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Get Access Token
            .addCase(handleRefreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleRefreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action?.payload?.data;
                localStorage.setItem('accessToken', state.accessToken);
                console.log("New Access Token = ", state.accessToken);
            
            })
            .addCase(handleRefreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Get Friends
            .addCase(getAllFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = action?.payload?.data?.friendList;
                console.log("Friends = ", state.friends);
                state.friendRequestCount = action?.payload?.data?.friendRequestCount;
            })
            .addCase(getAllFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Log-Out user
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.friends = [];
                state.friendRequestCount = 0;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                console.log("User logged out successfully");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Create Transaction
            ;
    },
});

    
export const {
    logoutUser,

} = authSlice.actions;

export default authSlice.reducer;