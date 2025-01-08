import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear} from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import React, { useState, useEffect } from "react";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";
import GiveGotModal from "../Modals/GiveGotModal";

function FriendTranscationDetail({ user, selectedFriend, refreshFriendTransaction, setRefreshFriendTransaction }) {
  const [transactionsDto, setTransactionsDto] = useState([]);
  // const [lastClosingBalance, setLastClosingBalance] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Track the transaction type (Give or Got)
  const [isCommentSectionOpen, setIsCommentSetionOpen] = useState(false);
  

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
  }
  console.log();

  return (
    <>
  
      <div className="right-header top-[0] h-[10%] bg-slate-400 w-full absolute p-[10px] flex gap-[10px] flex items-center ">
        <div className="alphabet-circle bg-teal-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
          <h1 className="text-white text-lg">{selectedFriend.fullName[0].toUpperCase()}</h1>
        </div>
        <div className="user-name">
          <h2 className="text-lg text-gray-800">{selectedFriend.fullName}</h2>
          <p className="text-sm text-gray-600">
            +91 <span>{selectedFriend.contactNo}</span>
          </p>
        </div>
        <div
          className={`net-balance border h-[35px] w-40 rounded flex items-center justify-center ml-5 ${
            transactionsDto.length > 0 &&
            transactionsDto[0].lastClosingBalance >= 0
              ? "border-teal-900 text-green-900"
              : "border-red-900 text-red-900"
          }`}
        >
          <h2
            className={`text-black ${
              transactionsDto.length > 0 &&
              transactionsDto[0].lastClosingBalance >= 0
                ? "border-teal-900 text-green-900"
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

        <div className="report-settings right-[10px] absolute flex gap-[10px] flex items-center justify-center">
          <div className="report h-[35px] w-28 bg-rose-600 rounded flex items-center justify-center">
            <h2 className="text-white">View Report</h2>
          </div>
          <div className="settings h-[50px] w-12 flex items-center justify-center ">
            <FontAwesomeIcon
              icon={faGear}
              className="text-white "
              style={{ fontSize: "25px " }}
            />
          </div>
        </div>
      </div>

      <div class="table-division  w-full absolute top-[10%]">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="sticky bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 uppercase dark:text-gray-400">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  onClick={() => {
                    handleRowClick(transactionDto);  // Call handleRowClick with the transactionDto
                    toggleCommentSection();                 // Call toggleDetail to open/close the details section
                  }}
                >
                  {/* Closing Balance */}
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                   
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        Closing Balance: <span>$</span>{" "}
                        <span>{transactionDto.lastClosingBalance}</span>
                      </span>
                      <span className="text-xs text-white mt-1">
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
      <div className="right-footer w-full  bottom-4 absolute h-[50px] flex items-center justify-center gap-12 ">
        <div className="right-footer w-full bottom-4 absolute h-[50px] flex items-center justify-center gap-12">
          <button
            className="text-white text-lg h-[40px] w-40 rounded bg-rose-500"
            onClick={handleGiveButtonClick}
          >
            You Gave : <span>$</span>
          </button>
          <button
            className="text-white text-lg h-[40px] w-40 rounded bg-green-500"
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
      </div>

     <CommentSection
      isOpen={isCommentSectionOpen}
      
      toggleCommentSection={toggleCommentSection} />
 

    </>
  );
}

export default FriendTranscationDetail;
