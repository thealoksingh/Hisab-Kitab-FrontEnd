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


// API for sent a friend request
export const addFriend = (userId, contactNo) => {
    return apiClient.post(`/user/friend-request/send?senderId=${userId}&recieverContactNo=${contactNo}`);
  };

// API for getting all pending friend requests
export const getAllPendingRequest = (userId) => {
  return apiClient.get(`/user/friend-request/pending?receiverId=${userId}`);
};
// API for getting all sent friend requests
export const getAllSentRequest = (userId) => {
  return apiClient.get(`/user/friend-request/sent?senderId=${userId}`);
};
// API for accepting a friend request
export const acceptRequest = (requestId) => {
  return apiClient.put(`/user/friend-request/accept/${requestId}`);
};

// API for unsend a friend request
export const unsendRequest = (requestId) => {
  return apiClient.delete(`/user/friend-request/unsend/${requestId}`);
};

// API for rejecting a friend request
export const rejectRequest = (requestId) => {
  return apiClient.delete(`/user/friend-request/delete/${requestId}`);
};
  
// API for Get Friend Transaction Details
export const getTransactionDetailsWithFriend = (userId, friendId) => {
  return apiClient.get(`/user/getAllTransactionWithFriend?userId=${userId}&friendId=${friendId}`);
};


// API for saving new Transaction Details
export const createTransaction = (transactionData) => {
  return apiClient.post("/user/friendTransactions", transactionData);
};

// API for Deleting the Transaction with Id
export const deleteTransactionById = (transId) => {
  return apiClient.delete(`/user/transaction/${transId}`);
}

// API for updating a transaction by ID
export const updateFriendTransactionById = ( updatedTransactionData) => {
  return apiClient.put("/user/updatefriendTransactions", updatedTransactionData);
};

// API for getting comments of a transaction

export const getAllCommentsByTransactionId = (transId) => {
  return apiClient.get(`/user/transaction/getAllComments?transId=${transId}`)
}
// API for Posting new comments of a transaction
export const postNewCommentsByTransactionId = (commentRequestDto) => {
  return apiClient.post("/user/transaction/comment/save", commentRequestDto);
}

//API for sending Invitation Email
export const sendInvitationEmail = (email, senderName) => {
  return apiClient.post(`/user/sendInvite?email=${email}&senderName=${senderName}`);
};

//API for sending OTP Email
export const sendOtpEmail = (email, type) => {
  return apiClient.post(`/user/sendOTP?email=${email}&type=${type}`);
};
//forgot password /update password
export const forgetPassword = (email, newPassword) => {
  return apiClient.post(`/user/update-password?email=${email}&newPassword=${newPassword}`);
};


//to delete comments
export const deleteComment = (commentId) => {
  return apiClient.delete(`/user/transaction/comment/${commentId}`);
};

export const createTicket = (ticketData) => {
  return apiClient.post(`/user/tickets`, ticketData);
};
export const getAllTickets = (userId) => {
  return apiClient.get(`user/tickets/${userId}`);
};

export const unFriendApi = (userId,friendId) => {
  return apiClient.delete(`user/${userId}/friends/${friendId}`);
};

export const deleteTicketApi = (ticketId) => {
  return apiClient.delete(`user/tickets/${ticketId}`);
};