import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import React, { useState, useEffect } from "react";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";
import GiveGotModal from "../Modals/GiveGotModal";
import "../CssStyle/GroupDashboard.css";
import FriendTransactionReport from "../Modals/FriendTransactionReport";
function FriendTranscationDetail({
  user,
  selectedFriend,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
}) {
  const [transactionsDto, setTransactionsDto] = useState([]);
  // const [lastClosingBalance, setLastClosingBalance] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Track the transaction type (Give or Got)
  const [isCommentSectionOpen, setIsCommentSetionOpen] = useState(false);
  const [commentTransaction, setCommentTransaction] = useState([]);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  const toggleReportModal = () => {
    setReportModalOpen(!isReportModalOpen);
  };

  const toggleCommentSection = () => {
    setIsCommentSetionOpen(!isCommentSectionOpen); // Toggle the state when the button is clicked
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleGiveButtonClick = () => {
    setTransactionType("give"); // Set type as "give"
    setIsModalOpen(true);
  };

  const handleGotButtonClick = () => {
    setTransactionType("got"); // Set type as "got"
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!transactionsDto) return;

      try {
        console.log("getTransactionDetailsWithFriend api called");
        const response = await getTransactionDetailsWithFriend(
          user.userId,
          selectedFriend.userId
        );
        console.log(response.data);
        setTransactionsDto(response.data); // Assuming the data is in response.data.friendList
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, [user, selectedFriend, refreshFriendTransaction]);

  console.log(selectedFriend.fullName[0]);

  function handleRowClick(transaction) {
    console.log("Transaction Row has been clicked..");
    // setCommentTransaction(transaction);
  }
  console.log();

  return (
    <>
      <div className="right-header p-2 absolute top-0  border border-gray-400 shadow-inner-custom justify-between h-24 bg-gray-300 w-full  p-[10px] flex gap-[10px] flex items-center ">
        <div className=" flex gap-2">
          <h1 className="text-white text-lg alphabet-circle bg-teal-600 p-2 h-10 w-10   rounded-full flex items-center justify-center">
            {selectedFriend.fullName[0].toUpperCase()}
          </h1>
          <div className="user-name-number ml-1  line-clamp-1">
            <h2 className="text-lg text-gray-800">{selectedFriend.fullName}</h2>
            <p className="text-sm text-gray-600 line-clamp-1">
              +91 <span>{selectedFriend.contactNo}</span>
            </p>
          </div>
        </div>

        <div
          className={`net-balance border p-1 h-10 w-40 rounded-sm flex items-center justify-center ml-5 ${
            transactionsDto.length > 0 &&
            transactionsDto[0].lastClosingBalance >= 0
              ? "border-green-900 text-green-900"
              : "border-red-900 text-red-900"
          }`}
        >
          <h2
            className={`text-black line-clamp-1 ${
              transactionsDto.length > 0 &&
              transactionsDto[0].lastClosingBalance >= 0
                ? "border-green-900 text-green-900"
                : "border-red-900 text-red-900"
            }`}
          >
            {transactionsDto.length > 0 && (
              <>
                {transactionsDto[0].lastClosingBalance >= 0
                  ? "You will get :"
                  : "You will give :"}
                <span>${Math.abs(transactionsDto[0].lastClosingBalance)}</span>
              </>
            )}
          </h2>
        </div>

        <div className="report-settings  flex gap-2 flex items-center justify-between">
          <button  onClick={toggleReportModal} className="shadow-inner-custom w-26 h-8 bg-rose-600 text-sm text-white 600    hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-4 py-1 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            {/* <span className="">^</span> */}
            <span className="line-clamp-1 text-sm">View Report</span>
          </button>
          <FriendTransactionReport
            isOpen={isReportModalOpen}
            toggleModal={toggleReportModal}
            selectedFriend={selectedFriend}
          />
          <div className="settings h-[50px] w-12 flex items-center justify-center ">
            <FontAwesomeIcon
              icon={faGear}
              className="text-white "
              style={{ fontSize: "25px " }}
            />
          </div>
        </div>
      </div>
      {/* <div className="table-div absolute top-24 h-[70%] border border-gray-500 shadow-inner-custom w-full bg-gray-400 relative px-2 ">
      <table className="w-full  border-separate border-spacing-y-1 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 fixed border  shadow-inner-custom  top-0 bg-gray-50 dark:bg-gray-200 text-xs text-gray-400 uppercase dark:text-gray-800"> */}
              <div class="table-division border border-gray-400 w-full h-[76.8%] bg-gray-400  absolute top-24 border-gray-500 shadow-inner-custom scrollable px-2  ">
       <table className="w-full border-separate border-spacing-y-1 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700 border  shadow-inner-custom bg-gray-100 dark:bg-gray-50 text-xs text-gray-400 uppercase dark:text-gray-800">
   
             
               <tr>
              <th scope="col" className="px-6 py-3">
                Entries
              </th>
              <th scope="col" className="px-6 py-3">
                You gave
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                You got
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsDto.map((transactionDto, index) => {
              // Calculate lastClosingAmount dynamically
              let amount = transactionDto.transaction.amount;
              const isUserGave =
                user.userId === transactionDto.transaction.fromUserId;

              return (
                <tr
                  key={transactionDto.transaction.transId}
                  className="bg-white  border-b border-1  shadow-inner-custom rounded-sm dark:bg-gray-100 dark:border-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsRowClicked(!isRowClicked);
                    setCommentTransaction(transactionDto.transaction);
                    console.log(commentTransaction); // Call handleRowClick with the transactionDto
                    console.log("after comment transaction."); // Call handleRowClick with the transactionDto
                    // handleRowClick(transactionDto.transaction);
                    toggleCommentSection(); // Call toggleDetail to open/close the details section
                  }}
                >
                  {/* Closing Balance */}
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                    >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        Closing Balance: <span>$</span>{" "}
                        <span>{transactionDto.lastClosingBalance}</span>
                      </span>
                      <span className="text-xs text-gray-900 mt-1">
                        {transactionDto.transaction.transDate}
                      </span>
                    </div>
                  </td>

                  {/* You Gave column */}
                  <td className="px-6 py-4 pr-[25px]">
                    {isUserGave && (
                      <div className="flex flex-col">
                        <span className="font-medium text-rose-500">
                          {amount} <span>$</span>
                        </span>
                      </div>
                    )}
                  </td>

                  {/* You Got column */}
                  <td className="px-6 py-4 text-right pr-[25px]">
                    {!isUserGave && (
                      <div className="flex flex-col">
                        <span className="font-medium text-green-500">
                          {amount} <span>$</span>
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
</div>
<div className="right-side-lower border border-gray-400 shadow-inner-custom w-full gap-4 bg-gray-300 p-2 bottom-4 absolute h-[50px] flex items-center justify-center">
<button
            className="w-1/3 shadow-inner-custom h-full bg-rose-600 text-sm text-white 600    hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGiveButtonClick}
          >
            You Gave : <span>$</span>
          </button>
          <button
         className="w-1/3 shadow-inner-custom h-full bg-emerald-600 text-sm text-white 600    hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
           
            onClick={handleGotButtonClick}
          >
            You Got : <span>$</span>
          </button>
          <GiveGotModal
            userId={user.userId}
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            transactionType={transactionType}
            friendId={selectedFriend.userId}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
            
          />
        </div>
    
  <CommentSection
        isOpen={isCommentSectionOpen}
        isRowClicked={isRowClicked}
        setIsRowClicked={setIsRowClicked}
        user={user}
        commentTransaction={commentTransaction}
        toggleCommentSection={toggleCommentSection}
      />
    </>
  );
}

export default FriendTranscationDetail;
