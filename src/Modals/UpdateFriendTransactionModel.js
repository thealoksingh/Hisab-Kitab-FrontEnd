import React, { useState, useEffect } from 'react';
import { updateFriendTransactionById } from '../Api/HisabKitabApi';
import "../CssStyle/GroupDashboard.css";
const UpdateFriendTransactionModel = ({
  isOpen,
  toggleModal,
  commentTransaction,
  setCommentTransaction,
  refreshFriendTransaction,
  setRefreshFriendTransaction
}) => {
  const [transId, setTransId] = useState(0);
  const [createdBy, setCreatedBy] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [fromUserId, setFromUserId] = useState(0);
  const [toUserId, setToUserId] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
  

   const maxChars = 50;
   const [countText, setCountText] = useState(commentTransaction.description);

   const handleChange = (e) => {
    setCountText(e.target.value);
  };

  useEffect(() => {
    if (commentTransaction) {
      setTransId(commentTransaction.transId || 0);
      setCreatedBy(commentTransaction.createdBy || 0);
      setAmount(commentTransaction.amount || "");
      setDescription(commentTransaction.description || "");
      setDate(commentTransaction.transDate || "");
      const initialTransactionType =
        commentTransaction.fromUserId === commentTransaction.createdBy ? "give" : "got";
        // console.log("initialTransactionType = ", initialTransactionType);
      setTransactionType(initialTransactionType);
      setFromUserId(
        commentTransaction.fromUserId 
      );
      setToUserId(
         commentTransaction.toUserId 
      );
    }
  }, [commentTransaction]);

  const handleTransactionTypeChange = (type) => {
     setTransactionType(type);
    //  console.log("from = "+fromUserId+" to = "+ toUserId);
    // Swap user IDs based on the selected transaction type
    if (type === "give" && type === transactionType) {
      setFromUserId(commentTransaction.fromUserId);
      setToUserId(commentTransaction.toUserId);
    } else {
      setFromUserId(commentTransaction.toUserId);
      setToUserId(commentTransaction.fromUserId);
    }

  };

  const handleSubmit = async (e) => {
    if (countText.length > maxChars) {
      alert(`Description exceeds ${maxChars} characters!`);
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    // console.log("transtype after submission = ", transactionType);
    // console.log("after sumbit from = "+fromUserId+" to = "+ toUserId);
    
    const updatedCommentTransaction = {
      transId: transId,
      fromUserId:fromUserId ,
      toUserId:  toUserId ,
      amount: amount,
      transDate: date,
      description: description,
      createdBy: createdBy,
    };

    // console.log("submitted CommentTransaction = ", updatedCommentTransaction);

    try {
      const response = await updateFriendTransactionById(updatedCommentTransaction);
      setCommentTransaction(response.data);
      // console.log("Transaction updated successfully", response.data);
      toggleModal(); // Close the modal after submission
      setAmount("");
      setDate("");
      setDescription("");
      setCreatedBy(0);
      setFromUserId(0);
      setToUserId(0);
      setRefreshFriendTransaction(prev => !prev); // Toggle refresh
    } catch (error) {
      // console.error("Error updating commentTransaction", error);
    }finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
    id="UpdateFriendTransaction-modal"
    tabIndex="-1"
    aria-hidden={!isOpen}
    className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${
      isOpen ? "" : "hidden"
    }`}
  >
    <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
      <div className="form1 relative w-full sm:w-1/2 lg:w-[70%]  bg-white rounded-sm shadow dark:bg-gray-300 shadow-inner-custom">
      <div
            className={`flex items-center  justify-between p-2 md:p-2 rounded-sm ${
              transactionType === "give" ? "bg-rose-600" : "bg-emerald-600"
            }`}
          >
          
           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Transaction</h3>
           <button
              type="button"
              className={`text-gray-400 bg-transparent hover:${
                transactionType === "give" ? "bg-rose-200" : "bg-emerald-200"
              } hover:text-gray-900 rounded-sm text-sm w-6 h-6 ms-auto inline-flex dark:hover:${
                transactionType === "give" ? "bg-rose-600" : "bg-emerald-600"
              } justify-center items-center dark:hover:text-white`}
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Transaction Type
              </label>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="transactionType"
                    value="give"
                    checked={transactionType === "give"}
                    onChange={() => handleTransactionTypeChange("give")}
                    className="mr-2"
                  />
                  Give
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="transactionType"
                    value="got"
                    checked={transactionType === "got"}
                    onChange={() => handleTransactionTypeChange("got")}
                    className="mr-2"
                  />
                  Got
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label html ="amount"
               className="block mb-2 text-sm font-medium text-gray-900 ">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="mb-1">
              <label htmlFor="description"  className="block mb-2 text-sm font-medium text-gray-900 ">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleChange(e); // Pass the event instead of the value
                }}
                className="w-full text-xs input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
              placeholder="Enter description"
                required
              />
            </div>
            <span
              className={`text-xs ${
                maxChars - countText.length < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >{maxChars - countText.length} chars left
            </span>

            <div className="mb-2">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">
                Transaction Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                required
              />
            </div>

            

            <button
              type="submit"
              className={`w-full text-white pointer hover:scale-[1.02] shadow-md ${
                transactionType === "give"
                ? "bg-[#be123c] hover:bg-[#9b0e35] border border-[#9b0e35] focus:ring-[#Ff007f]"
                : "bg-[#10b981] hover:bg-[#059669] border border-[#059669] focus:ring-[#50c878]"
            } focus:ring-2 focus:outline-none  font-medium rounded-sm text-sm px-5 py-2.5 text-center`}
            >
            {isLoading ? (<div className="flex gap-4 w-full justify-center">
                  <div className="w-5 h-5 border-4 border-t-4 border-white rounded-sm animate-spin"></div>
                  <div className="font-semibold ml-1">Loading...</div>
                </div>
                  ) : (
                    "Update Transaction"
                  )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFriendTransactionModel;