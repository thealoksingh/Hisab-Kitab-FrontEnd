import { apiClient } from "./ApiClient"

//Api for login user
export const loginApi = (email, password) => {
  return apiClient.post('/user/login', new URLSearchParams({ email, password }));
};

// Api for register user
export const signUpUser = (userData) => 
    apiClient.post('/user/signup', userData);

// API to fetch the user's friend list
export const getFriendList = (userId) => {
    return apiClient.get(`/user/getAllFriendList/${userId}`);
  };


// API for adding a friend
export const addFriend = (userId, contactNo) => {
    return apiClient.get(`/user/addfriend/${userId}?contactNo=${contactNo}`);
  };

  
// API for Get Friend Transaction Details
export const getTransactionDetailsWithFriend = (userId, friendId) => {
  return apiClient.get(`/user/getAllTransactionWithFriend?userId=${userId}&friendId=${friendId}`);
};
