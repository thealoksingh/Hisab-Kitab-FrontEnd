import { handleRefreshToken, logout } from "../Redux/Thunk";
import axios from "axios";

// Helper to handle refresh token and retry logic
export async function withRefreshTokenRetry(apiCall, thunkAPI) {
    try {
        return await apiCall();
    } catch (error) {
        // If unauthorized, try to refresh token and retry once
        if (error?.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const refreshResponse = await thunkAPI.dispatch(handleRefreshToken({ refreshToken }));
                    // Check if refresh was successful
                    if (handleRefreshToken.fulfilled.match(refreshResponse)) {
                        console.log("New Access Token = ", refreshResponse?.payload?.data);
                        // Retry the original API call with new token
                        return await apiCall();
                    } else {
                        console.log("Failed to refresh token");
                    }
                } catch (refreshError) {
                    // Refresh failed, log out
                    console.error("Refresh token error:", refreshError);
                    thunkAPI.dispatch(logout());
                    return thunkAPI.rejectWithValue("Session expired. Please login again.");
                }
            }
        }
        // Other errors
        return thunkAPI.rejectWithValue(handleAxiosError(error));
    }
}

export const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        console.log('error occured in axios', error);

        if (error.response) {
            // Server responded with a status code outside 2xx
            console.log(error.response.data);
            return error.response.data;

        } else if (error.request) {
            // No response received from the server
            console.log("Network Error: No response received", error.request);
            return {
                message: "Oops! Something went wrong with the network. Please try again later.",
                statusCode: 500,
                data: null,
                errorCode: "NETWORK_ERROR",
                timestamp: Date.now(),
            };
        } else {
            // Something happened while setting up the request
            console.log("Request Error:", error.message);
            return { message: error.message };
        }
    } else {
        // Non-Axios error (e.g. bug in your code)
        console.log("Unexpected Error:", error);
        return { message: "Unexpected error occurred." };
    }
};