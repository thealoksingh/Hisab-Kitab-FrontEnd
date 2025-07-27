import apiClient, { publicApiClient } from "../Api/ApiClient";
import { apiDeleteRequest, apiGetRequest, apiPostRequest, apiPutRequest } from "./HttpsMethod";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

// Api for login user
console.log ("acces Token is==> ",getAccessToken())
export const loginApi = (email, password) => {
  return publicApiClient.post(`${baseURL}/user/login`, { email, password });
};

export const refreshTokenApi = (refreshToken) =>
  publicApiClient.post(`${baseURL}/user/refreshtoken`, { refreshToken });

export const refreshTokenAPI = () =>
    apiPostRequest({
    apiUrl: `${baseURL}/user/refresh-token`,
    content_type: "application/json",
    data: { refreshToken: getRefreshToken() },
    
  });

  
// Api for register user
export const registerAPI = (data) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/signup`,
    content_type: "application/json",
    data: data,
  });

// Api for Signin user
export const loginAPI = (data) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/login`,
    content_type: "application/json",
    data: data,
  });

// Api for Get user by userId
export const getUserByIdAPI = () =>
  apiGetRequest({
    apiUrl: `${baseURL}/user`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// Api for Logout user
export const logoutUserAPI = () =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/signout`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// Api for Reset Password
export const resetPasswordAPI = (data) =>
  apiPutRequest({
    apiUrl: `${baseURL}/user/update-password`,
    content_type: "application/json",
    data: data,
    accessToken: getAccessToken(),
  });

// Api for Send OTP
export const sendOtpAPI = (data) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/sendOTP?email=${data.email}&type=${data.type}`,
    content_type: "application/json",
    data: data,
  });

// API to fetch the user's friend list
export const getFriendList = () =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/getAllFriendList`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for sending a friend request
export const addFriend = (contactNo) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/friend-request/send?recieverContactNo=${contactNo}`,
    content_type: "application/json",
    data: {},
    accessToken: getAccessToken(),
  });

// API for getting all pending friend requests
export const getAllPendingRequestAPI = () =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/friend-request/pending`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for getting all sent friend requests
export const getAllSentRequestAPI = () =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/friend-request/sent`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for accepting a friend request
export const acceptFriendRequestAPI = (requestId) =>
  apiPutRequest({
    apiUrl: `${baseURL}/user/friend-request/accept/${requestId}`,
    content_type: "application/json",
    data: {},
    accessToken: getAccessToken(),
  });

// API for canceling a friend request
export const cancelFriendRequestAPI = (requestId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/friend-request/unsend/${requestId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for rejecting a friend request
export const rejectFriendRequestAPI = (requestId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/friend-request/delete/${requestId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for Get Friend Transaction Details
export const getAllFriendTransactionsAPI = (friendId) =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/getAllTransactionWithFriend?friendId=${friendId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for saving new Transaction Details
export const createTransactionAPI = (transactionData) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/friendTransactions`,
    content_type: "application/json",
    data: transactionData,
    accessToken: getAccessToken(),
  });

// API for Deleting the Transaction with Id
export const deleteTransactionByIdAPI = (transId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/transaction/${transId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for updating a transaction by ID
export const updateFriendTransactionByIdAPI = (updatedTransactionData) =>
  apiPutRequest({
    apiUrl: `${baseURL}/user/updatefriendTransactions`,
    content_type: "application/json",
    data: updatedTransactionData,
    accessToken: getAccessToken(),
  });

// API for getting comments of a transaction
export const getAllCommentsByTransactionIdAPI = (transId) =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/transaction/getAllComments?transId=${transId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

// API for Posting new comments of a transaction
export const postNewCommentsByTransactionIdAPI = (commentRequestDto) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/transaction/comment/save`,
    content_type: "application/json",
    data: commentRequestDto,
    accessToken: getAccessToken(),
  });

// API for sending Invitation Email
export const sendEmailInviteAPI = (data) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/sendInvite?email=${data.email}&senderName=${data.senderName}`,
    content_type: "application/json",
    data: {},
    accessToken: getAccessToken(),
  });

// API for sending OTP Email
export const sendOtpEmail = (email, type) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/sendOTP?email=${email}&type=${type}`,
    content_type: "application/json",
    data: {},
    accessToken: getAccessToken(),
  });

// to delete comments
export const deleteCommentByIdAPI = (commentId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/transaction/comment/${commentId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

export const createTicketAPI = (ticketData) =>
  apiPostRequest({
    apiUrl: `${baseURL}/user/tickets`,
    content_type: "application/json",
    data: ticketData,
    accessToken: getAccessToken(),
  });

export const getAllTicketsAPI = () =>
  apiGetRequest({
    apiUrl: `${baseURL}/user/tickets/all`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

export const unFriendAPI = (friendId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/friends/${friendId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });

export const deleteTicketAPI = (ticketId) =>
  apiDeleteRequest({
    apiUrl: `${baseURL}/user/tickets/${ticketId}`,
    content_type: "application/json",
    accessToken: getAccessToken(),
  });