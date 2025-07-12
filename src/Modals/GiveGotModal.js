import React, { useState } from "react";
import { createTransaction } from "../Api/HisabKitabApi";
import "../CssStyle/GroupDashboard.css";
import { showSnackbar } from "../Redux/SanckbarSlice";
import { useDispatch } from "react-redux";
const GiveGotModal = ({
  isOpen,
  toggleModal,
  userId,
  transactionType,
  friendId,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const maxChars = 50;
  const [countText, setCountText] = useState("");
  const [error, setError] = useState("");
const [errors, setErrors] = useState({});

const validateTransaction = () => {
  let tempErrors = {};

  // Amount: Must be a non-negative number
  if (isNaN(amount) || Number(amount) < 0) {
    tempErrors.amount = "Amount must be a non-negative number";
  }

  // Description: Must be less than 50 characters
  if (!description.trim()) {
    tempErrors.description = "Description is required";
  } else if (description.length > 50) {
    tempErrors.description = "Description must be less than 50 characters";
  }

  // Date: Cannot be in the future
  if (!date) {
    tempErrors.date = "Date is required";
  } else {
    const today = new Date();
    const selectedDate = new Date(date);

    // Reset time to midnight for accurate date-only comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      tempErrors.date = "Date cannot be in the future";
    }
  }

  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0; // Returns true if no errors
};


  const handleChange = (e) => {
    setCountText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("amount before backend call"+amount);
    if(!validateTransaction()) return;
    if (countText.length > maxChars) {
      setError(`Description exceeds ${maxChars} characters!`);
      return;
    }
    
    e.preventDefault();
    setIsLoading(true);
    // Set fromUserId and toUserId based on the transaction type
    const transactionData = {
      transId: 0,
      fromUserId: transactionType === "give" ? userId : friendId,
      toUserId: transactionType === "give" ? friendId : userId,
      amount: amount,
      transDate: date,
      description: description,
      createdBy: userId,
    };
    // console.log("Transaction submitted", transactionData);
     try {
      const response = await createTransaction(transactionData);
      setCountText("");
      toggleModal();
      setAmount("");
      setDate("");
      setDescription("");
      refreshFriendTransaction
        ? setRefreshFriendTransaction(false)
        : setRefreshFriendTransaction(true);
      dispatch(showSnackbar({ 
        message: transactionType === "give" ? "Amount given successfully!" : "Amount received successfully!", 
        type: "success" 
      })); // <-- Success snackbar
    } catch (error) {
      setError(error?.message || "Error creating transaction");
      dispatch(showSnackbar({ 
        message: error?.message || "Error creating transaction", 
        type: "error" 
      })); // <-- Failure snackbar
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div
      id="add-friend-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full lg:w-[70%] sm:w-1/2 md:w-1/2 max-w-5xl flex gap-4 justify-center transform transition-transform duration-500">
        <div className="form-give-got border border-gray-400 shadow-inner-custom relative bg-white w-full h-1/2 rounded-sm shadow dark:bg-gray-300">
          <div
            className={`flex items-center justify-between p-2 md:p-2 rounded-sm ${
              transactionType === "give" ? "bg-rose-600" : "bg-emerald-600"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-200">
              {transactionType === "give" ? "You Gave" : "You Got"}
            </h3>
            <button
              type="button"
              className={`text-gray-300 bg-transparent hover:${
                transactionType === "give" ? "bg-rose-100" : "bg-emerald-200"
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
              <span className="sr-only text-slate-200">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
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
            <span className="text-rose-600 text-xs">{errors.amount}</span>
           
            <div className="mb-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
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
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                placeholder="Enter description"
                required
              />
            </div>
            <span className="text-rose-600 text-xs">{errors.description}</span>
           
            <span
              className={`text-xs ${
                maxChars - countText.length < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {maxChars - countText.length} chars left
            </span>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
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
           {error && <div className="mb-2 text-rose-600">{error}</div>}
           <div className="text-rose-600 text-xs mb-4">{errors.date}</div>
           
        
            <button
              type="submit"
              className={`w-full text-white 
    ${
      transactionType === "give"
        ? "bg-[#be123c] hover:bg-[#9b0e35] border border-[#9b0e35] focus:ring-[#Ff007f]"
        : "bg-[#10b981] hover:bg-[#059669] border border-[#059669] focus:ring-[#50c878]"
    }
    focus:ring-4 focus:outline-none  font-medium rounded-sm text-sm px-5 py-2.5 text-center`}
            >
              {isLoading ? (
                <div className="flex gap-4 w-full justify-center">
                  <div className="w-5 h-5 border-4 border-t-4 border-white rounded-sm animate-spin"></div>
                  <div className="font-semibold ml-1">Loading...</div>
                </div>
              ) : transactionType === "give" ? (
                "Give Amount"
              ) : (
                "Receive Amount"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveGotModal;
