import React, { useState } from "react";
import { updateFriendTransactionById } from "../Api/HisabKitabApi";

const UpdateTransactionModal = ({
  isOpen,
  toggleModal,
  transaction,
  refreshFriendTransaction,
  setRefreshFriendTransaction
}) => {
  const [amount, setAmount] = useState(transaction.amount || "");
  const [description, setDescription] = useState(transaction.description || "");
  const [date, setDate] = useState(transaction.transDate || "");
  const [transactionType, setTransactionType] = useState(
    transaction.fromUserId === transaction.userId ? "give" : "got"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTransaction = {
      transId:transaction.transId,
      fromUserId: transactionType === "give" ? transaction.fromUserId : transaction.toUserId,
      toUserId: transactionType === "give" ? transaction.toUserId : transaction.fromUserId,
      amount:amount,
      transDate: date,
      description:description
    };

    console.log("updated transaction");
    console.log(updatedTransaction);

    try {
      await updateFriendTransactionById(updatedTransaction);
      console.log("Transaction updated successfully");
      toggleModal(); // Close the modal after submission
      setRefreshFriendTransaction(!refreshFriendTransaction); // Toggle refresh
      transaction = updatedTransaction;
      console.log("new transaction becomes");
      console.log(transaction);
    } catch (error) {
      console.error("Error updating transaction", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Transaction
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
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
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
                    onChange={() => setTransactionType("give")}
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
                    onChange={() => setTransactionType("got")}
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

export default UpdateTransactionModal;