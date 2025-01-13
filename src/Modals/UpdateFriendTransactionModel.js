import React, { useState, useEffect } from 'react';
import { updateFriendTransactionById } from '../Api/HisabKitabApi';

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

  useEffect(() => {
    if (commentTransaction) {
      setTransId(commentTransaction.transId || 0);
      setCreatedBy(commentTransaction.createdBy || 0);
      setAmount(commentTransaction.amount || "");
      setDescription(commentTransaction.description || "");
      setDate(commentTransaction.transDate || "");
      const initialTransactionType =
        commentTransaction.fromUserId === commentTransaction.userId ? "give" : "got";
      setTransactionType(initialTransactionType);
      setFromUserId(
        initialTransactionType === "give" ? commentTransaction.fromUserId : commentTransaction.toUserId
      );
      setToUserId(
        initialTransactionType === "give" ? commentTransaction.toUserId : commentTransaction.fromUserId
      );
    }
  }, [commentTransaction]);

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
    // Swap user IDs based on the selected transaction type
    if (type === "give") {
      setFromUserId(commentTransaction.fromUserId);
      setToUserId(commentTransaction.toUserId);
    } else {
      setFromUserId(commentTransaction.toUserId);
      setToUserId(commentTransaction.fromUserId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCommentTransaction = {
      transId: transId,
      fromUserId: transactionType === "give" ? fromUserId : toUserId,
      toUserId: transactionType === "give" ? toUserId : fromUserId,
      amount: amount,
      transDate: date,
      description: description,
      createdBy: createdBy,
    };

    try {
      const response = await updateFriendTransactionById(updatedCommentTransaction);
      setCommentTransaction(response.data);
      console.log("Transaction updated successfully", response.data);
      toggleModal(); // Close the modal after submission
      setAmount("");
      setDate("");
      setDescription("");
      setCreatedBy(0);
      setFromUserId(0);
      setToUserId(0);
      setRefreshFriendTransaction(prev => !prev); // Toggle refresh
    } catch (error) {
      console.error("Error updating commentTransaction", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Transaction</h3>
            <button type="button" className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center" onClick={toggleModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label html ="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-50 border rounded-lg block w-full p-2.5"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border rounded-lg block w-full p-2.5"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transaction Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

            <button
              type="submit"
              className={`w-full text-white ${
                transactionType === "give"
                  ? "bg-[#be123c] hover:bg-[#9b0e35] border-[#9b0e35]"
                  : "bg-[#16a34a] hover:bg-[#15803d] border-[#15803d]"
              } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Update Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFriendTransactionModel;