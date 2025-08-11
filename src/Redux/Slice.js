import { createSlice } from "@reduxjs/toolkit";
import { deleteNotification, getAllFriends, getAllUserNotifications, getUserByToken, handleRefreshToken, logout, register, signIn, updateNotificationStatus } from "./Thunk";

const initialState = {
    user: null,
    friends: [],
    loading: false,
    errorMessage: null,
    accessToken: null,
    refreshToken: null,
    friendRequestCount: 0,
    notifications: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: () => {
            // console.log("User logged out successfully");
            return initialState;
        },

        updateFriendRequestCount: (state, action) => {
            state.friendRequestCount = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
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
                // console.log("User logged out successfully");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Notifications thunks

            .addCase(getAllUserNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUserNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action?.payload?.data;
                // console.log("User Notifications = ", state.notifications);
            })
            .addCase(getAllUserNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Update notification status
            .addCase(updateNotificationStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNotificationStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedNotif = action?.payload?.data;

                console.log('Update = ',updatedNotif);

                const index = state.notifications.findIndex(
                    (notif) => notif?.id === updatedNotif?.id
                );
                console.log('index= ', index);

                if (index !== -1) {
                    // ✅ Replace the existing notification with the updated one
                    state.notifications[index] = updatedNotif;
                } 
                else {
                    // ⚠️ Optional: If it doesn't exist, maybe add it (if your app expects that)
                    state?.notifications?.push(updatedNotif);
                    console.log('else executed');
                }

                console.log("Updated notification list:", state?.notifications);
            })
            .addCase(updateNotificationStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
        // Delete notification
        .addCase(deleteNotification.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteNotification.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Deleting notification action.payload:", action?.payload?.message);
            state.notifications = state.notifications.filter(
                (notif) => notif.id !== action.payload.data
            );
        })
        .addCase(deleteNotification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
},
});


export const {
    logoutUser,
    updateFriendRequestCount,
    addNotification,

} = authSlice.actions;

export default authSlice.reducer;