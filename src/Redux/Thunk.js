import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { acceptFriendRequestAPI, cancelFriendRequestAPI, createTicketAPI, createTransactionAPI, deleteCommentByIdAPI, deleteTicketAPI, deleteTransactionByIdAPI, getAllCommentsByTransactionIdAPI, getAllFriendTransactionsAPI, getAllPendingRequestAPI, getAllSentRequestAPI, getAllTicketsAPI, getFriendList, logoutUserAPI, postNewCommentsByTransactionIdAPI, refreshTokenAPI, refreshTokenApi, registerAPI, rejectFriendRequestAPI, resetPasswordAPI, sendEmailInviteAPI, sendOtpAPI, unFriendAPI, updateFriendTransactionByIdAPI } from "../utils/HisabKitabApi";
import { getUserByIdAPI, loginAPI } from "../utils/HisabKitabApi";
import { handleAxiosError, withRefreshTokenRetry } from "../utils/HandleError";

// Async Thunks

// Sign In (public, no refresh)
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      console.log("this is data in thunk " + JSON.stringify(data));
      const response = await loginAPI(data);

      if (response?.status === 200 || response?.status === 201) {
        // console.log("API Response:", response.data);
        return response?.data;
      } else {
        throw new Error(response?.data?.message || "OTP not sent, try again");
      }
    } catch (error) {
      console.log("Error in postSignIn:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Get User By Token (protected, use refresh)
export const getUserByToken = createAsyncThunk(
  "auth/getUserById",
  async (_, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getUserByIdAPI();
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          throw new Error(response?.data?.message || "Failed to get user");
        }
      },
      thunkAPI
    );
  }
);

// Sign-up Thunk
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);
      console.log("this is response.status == " + response?.status);
        return response?.data;
      
    } catch (error) {

      return rejectWithValue(handleAxiosError(error));
    }
  }
);

//Reset-Password Thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(data);
      console.log("this is response.status == " + response?.status);
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "Failed to reset Password"
        );
      }
    } catch (error) {

      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// Log-Out (protected, use refresh)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await logoutUserAPI();
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to logout account"
          );
        }
      },
      thunkAPI
    );
  }
);

//Get-All friends Thunk
export const getAllFriends = createAsyncThunk(
  "auth/getAllFriends",
  async (_, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getFriendList();
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get friend list."
          );
        }
      },
      thunkAPI
    );
  }
);
//Get-All friends Thunk
export const unFriend = createAsyncThunk(
  "auth/unFriend",
  async (friendId, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await unFriendAPI(friendId);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to unfriend."
          );
        }
      },
      thunkAPI
    );
  }
);
//Get-All friends Thunk
export const getAllPendingRequest = createAsyncThunk(
  "auth/getAllPendingRequest",
  async (_, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getAllPendingRequestAPI();
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get all pending requests."
          );
        }
      },
      thunkAPI
    );
  }
);
//Get-All Sent Request Thunk
export const getAllSentRequest = createAsyncThunk(
  "auth/getAllSentRequest",
  async (_, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getAllSentRequestAPI();
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get all sent requests."
          );
        }
      },
      thunkAPI
    );
  }
);
//Accept Friend Request Thunk
export const acceptFriendRequest = createAsyncThunk(
  "auth/acceptFriendRequest",
  async (requestId, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await acceptFriendRequestAPI(requestId);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to accept requests."
          );
        }
      },
      thunkAPI
    );
  }
);
//Get-All Sent Request Thunk
export const cancelFriendRequest = createAsyncThunk(
  "auth/cancelFriendRequest",
  async (requestId, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await cancelFriendRequestAPI(requestId);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to cancel request."
          );
        }
      },
      thunkAPI
    );
  }
);

//Reject Friend Request Thunk
export const rejectFriendRequest = createAsyncThunk(
  "auth/rejectFriendRequest",
  async (requestId, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await rejectFriendRequestAPI(requestId);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get friend list."
          );
        }
      },
      thunkAPI
    );
  }
);

//Send Invite Email Thunk
export const sendEmailInvite = createAsyncThunk(
  "auth/sendEmailInvite",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await sendEmailInviteAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to send email invite."
          );
        }
      },
      thunkAPI
    );
  }
);

//Get-All transaction with friend Thunk
export const getAllFriendTransactions = createAsyncThunk(
  "auth/getAllFriendTransactions",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getAllFriendTransactionsAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get friend list."
          );
        }
      },
      thunkAPI
    );
  }
);


//Get-All transaction with friend Thunk
export const createTransaction = createAsyncThunk(
  "auth/createTransaction",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await createTransactionAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to create new Transaction."
          );
        }
      },
      thunkAPI
    );
  }
);

//Update Transaction by Id Thunk
export const updateFriendTransactionById = createAsyncThunk(
  "auth/updateTransaction",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await updateFriendTransactionByIdAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to update Transaction."
          );
        }
      },
      thunkAPI
    );
  }
);

//Delete Transaction by Id Thunk
export const deleteTransactionById = createAsyncThunk(
  "auth/deleteTransaction",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await deleteTransactionByIdAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to delete Transaction."
          );
        }
      },
      thunkAPI
    );
  }
);
//Post New Comments by Transaction Id Thunk
export const postNewCommentsByTransactionId = createAsyncThunk(
  "auth/postNewComments",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await postNewCommentsByTransactionIdAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to post new comments."
          );
        }
      },
      thunkAPI
    );
  }
);

//Post New Comments by Transaction Id Thunk
export const deleteCommentById = createAsyncThunk(
  "auth/deleteComment",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await deleteCommentByIdAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to Delete comment."
          );
        }
      },
      thunkAPI
    );
  }
);


//Get-All Comment of transaction with friend Thunk
export const getAllTransactionComments = createAsyncThunk(
  "auth/getAllTransactionComments",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getAllCommentsByTransactionIdAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get comment list."
          );
        }
      },
      thunkAPI
    );
  }
);

//Create new ticket Thunk
export const createTicket = createAsyncThunk(
  "auth/createTicket",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await createTicketAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to create ticket."
          );
        }
      },
      thunkAPI
    );
  }
);

//Get all ticket Thunk
export const getAllTickets = createAsyncThunk(
  "auth/getAllTickets",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await getAllTicketsAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to get All ticket."
          );
        }
      },
      thunkAPI
    );
  }
);
//Get all ticket Thunk
export const deleteTicket = createAsyncThunk(
  "auth/deleteTicket",
  async (data, thunkAPI) => {
    return withRefreshTokenRetry(
      async () => {
        const response = await deleteTicketAPI(data);
        console.log("this is response.status == " + response?.status);
        if (response?.status === 200 || response?.status === 201) {
          return response?.data;
        } else {
          return thunkAPI.rejectWithValue(
            response?.data?.message || "Failed to delete ticket."
          );
        }
      },
      thunkAPI
    );
  }
);

// Send OTP Thunk
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await sendOtpAPI(data);
      return response?.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error occured in axios', error);

        if (error.response) {
          // Server responded with a status code outside 2xx
          console.log('Server responded with a status code outside 2xx', error.response.data);
          return error.response.data;

        } else if (error.request) {
          // No response received from the server
          console.log("Network Error: No response received", error.request);
          const data = {
            message: "Oops! Something went wrong with the network. Please try again later.",
            statusCode: 500,
            data: null,
            errorCode: "NETWORK_ERROR",
            timestamp: Date.now(),
          }
          return data;
        } else {
          // Something happened while setting up the request
          console.log("Request Error:", error.message);
          return error.message;
        }
      } else {
        // Non-Axios error (e.g. bug in your code)
        console.log("Unexpected Error:", error);
      }

    }
  }
);

export const handleRefreshToken = createAsyncThunk(
  "auth/handleRefreshToken",
  async (_, { rejectWithValue }) => {
    try {

      const response = await refreshTokenAPI();
      if (response?.status === 200 || response?.status === 201) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "Failed to get friend list."
        );
      }
    } catch (error) {

      return rejectWithValue(handleAxiosError(error));
    }
  }
);

