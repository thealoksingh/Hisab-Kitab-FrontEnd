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


// API for saving new Transaction Details
export const createTransaction = (transactionData) => {
  return apiClient.post("/user/friendTransactions", transactionData);
};

// API for getting comments of a transaction

export const getAllCommentsByTransactionId = (transId) => {
  return apiClient.get(`/user/transaction/getAllComments?transId=${transId}`)
}
// API for Posting new comments of a transaction
export const postNewCommentsByTransactionId = (commentRequestDto) => {
  return apiClient.post("/user/transaction/comment/save", commentRequestDto);
}

// API for Deleting the Transaction with Id
export const deleteTransactionById = (transId) => {
  return apiClient.delete(`/user/transaction/${transId}`);
}

// API for updating a transaction by ID
export const updateFriendTransactionById = ( updatedTransactionData) => {
  return apiClient.put("/user/updatefriendTransactions", updatedTransactionData);
};
