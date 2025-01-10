import React, { useState } from "react";
import { updateFriendTransactionById } from "../Api/HisabKitabApi";

const UpdateFriendTransaction = ({ setRefreshFriendTransaction, refreshFriendTransaction,isOpen, toggleModal, user, transaction }) => {
  console.log("Transaction is");
  
  const amountPrev = transaction?.amount;

  const [description, setDescription] = useState("");
  const [transDate, setTransDate] = useState(transaction?.transDate);
  const [amount, setAmount] = useState(amountPrev);
  // const [transId, setTransId] = useState(transaction.transId || 0);
  // setDescription(transaction?.description);
 console.log("new"+transaction.amount)

  console.log("amount = "+amount);
  console.log(user);

  const [type, setType] = useState(
    transaction?.fromUserId === user.userId ? "Give" : "Got"
  );

  console.log("desc = "+description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fromUserId = type === "Give" ? user.userId : transaction.fromUserId;
    const toUserId = type === "Give" ? transaction.toUserId : user.userId;

    const updatedTransaction = {
      transId: transaction.transId, // Ensure transId is passed correctly
      fromUserId: fromUserId,       // Correctly set fromUserId
      toUserId: toUserId,           // Correctly set toUserId
      amount: amount,   // Ensure amount is a valid number
      transDate: transDate,         // Ensure transDate is in the correct format
      description: description,     // Pass the updated description
    };

    try {
      const response = await updateFriendTransactionById(updatedTransaction);
      console.log("Transaction updated successfully!");
      toggleModal();
      setRefreshFriendTransaction(!refreshFriendTransaction); // Update the parent component's state to fetch the updated transaction list
      console.log(response.data);
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="UpdateFriendTransaction-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70 ${isOpen ? "" : "hidden"}`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form1 relative w-1/3 bg-white rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner">
          <div className="flex items-center justify-between p-2 md:p-4 rounded-t bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Update Transaction</h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select type
              </label>
              <div className="flex gap-4 space-x-4 mt-4 p-2 rounded border border-gray-300">
                <div className="w-1/3">
                  <input
                    type="radio"
                    id="give"
                    name="type"
                    value="Give"
                    checked={type === "Give"}
                    onChange={() => setType("Give")}
                  />
                  <label
                    htmlFor="give"
                    className="ml-3 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Give
                  </label>
                </div>
                <div className="w-1/3">
                  <input
                    type="radio"
                    id="got"
                    name="type"
                    value="Got"
                    checked={type === "Got"}
                    onChange={() => setType("Got")}
                  />
                  <label
                    htmlFor="got"
                    className="ml-3 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Got
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
               New Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full input-field-shadow border border-gray-300 text-sm rounded-sm p-2 bg-white placeholder-gray-400"
                placeholder="Enter Description"
              
              />
            </div>
            <div className="mb-4 flex relative gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                 New Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="transDate"
                  value={transDate}
                  onChange={(e) => setTransDate(e.target.value)}
                  className="w-full input-field-shadow border border-gray-300 text-sm rounded-sm p-2 bg-white placeholder-gray-400"
                  
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  New Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full input-field-shadow border border-gray-300 text-sm rounded-sm p-2 bg-white placeholder-gray-400"
                  placeholder={transaction.amount}
               
                />
              </div>
            </div>
            <div className="mb-2 flex gap-4">
              <button
                type="submit"
                className="w-1/3 text-sm text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 font-medium rounded-sm px-4 py-2 shadow-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="w-1/3 text-sm text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-4 py-2 shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFriendTransaction;