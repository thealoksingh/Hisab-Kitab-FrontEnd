import apiClient,{ publicApiClient } from "./ApiClient"

//Api for login user
export const loginApi = (email, password) => {
  return publicApiClient.post('/user/login', { email, password });
};

export const refreshTokenApi = (refreshToken) => publicApiClient.post("/user/refreshtoken", { refreshToken });


// Api for register user
export const signUpUser = (userData) => 
  publicApiClient.post('/user/signup', userData);

// Api for Logout user
export const logOutUser = () => 
  apiClient.delete('/user/signout');

// API to fetch the user's friend list
export const getFriendList = () => {
    return apiClient.get(`/user/getAllFriendList`);
  };


// API for sent a friend request
export const addFriend = (contactNo) => {
    return apiClient.post(`/user/friend-request/send?recieverContactNo=${contactNo}`);
  };

// API for getting all pending friend requests
export const getAllPendingRequest = () => {
  return apiClient.get(`/user/friend-request/pending`);
};
// API for getting all sent friend requests
export const getAllSentRequest = () => {
  return apiClient.get(`/user/friend-request/sent`);
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
export const getTransactionDetailsWithFriend = (friendId) => {
  return apiClient.get(`/user/getAllTransactionWithFriend?friendId=${friendId}`);
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
export const getAllTickets = () => {
  return apiClient.get(`/user/tickets/all`);
};

export const unFriendApi = (friendId) => {
  return apiClient.delete(`/user/friends/${friendId}`);
};

export const deleteTicketApi = (ticketId) => {
  return apiClient.delete(`/user/tickets/${ticketId}`);
};