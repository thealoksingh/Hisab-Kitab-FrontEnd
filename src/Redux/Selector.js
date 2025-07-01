export const selectUser = (state) => state.auth.user;  // ✅ Get user data
export const selectAccessToken = (state) => state.auth.accessToken;  // ✅ Get access token
export const selectRefreshToken = (state) => state.auth.refreshToken;  // ✅ Get refresh token
export const selectLoading = (state) => state.auth.loading;  // ✅ Get loading state
export const selectError = (state) => state.auth.error;  // ✅ Get error state
export const selectFriends = (state) => state.auth.friends;  // ✅ Get friends
export const selectFriendRequestCount = (state) => state.auth.friendRequestCount;  // ✅ Get friend request count
