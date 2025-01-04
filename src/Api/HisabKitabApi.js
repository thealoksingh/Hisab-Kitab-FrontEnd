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