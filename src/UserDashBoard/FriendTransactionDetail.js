import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear} from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import React, { useState, useEffect } from "react";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";
import GiveGotModal from "../Modals/GiveGotModal";
import  '../CssStyle/GroupDashboard.css';
function FriendTranscationDetail({ user, selectedFriend, refreshFriendTransaction, setRefreshFriendTransaction }) {
  const [transactionsDto, setTransactionsDto] = useState([]);
  // const [lastClosingBalance, setLastClosingBalance] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Track the transaction type (Give or Got)
  const [isCommentSectionOpen, setIsCommentSetionOpen] = useState(false);
  const [commentTransaction, setCommentTransaction] = useState([]);
  const [isRowClicked, setIsRowClicked] = useState(false);

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
  
      <div className="right-side-header shadow-inner-custom  h-24 bg-gray-300 w-full justify-between p-2 flex gap-2 flex items-center ">
        
        <div className="right-top-div  flex justify-between">
        <div className="alphabet-circle bg-teal-600 h-12 w-12 rounded-full flex items-center justify-center">
          <h1 className="text-white text-lg">{selectedFriend.fullName[0].toUpperCase()}</h1>
        </div>

        <div className="">
          <h2 className="text-lg text-gray-800">{selectedFriend.fullName}</h2>
          <p className="text-sm text-gray-600">
            +91 <span>{selectedFriend.contactNo}</span>
          </p>
          </div>
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

        <div className="report-settings  flex gap-2 flex items-center justify-center">
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

      <div className="h-[70%] border border-gray-400 shadow-inner-custom w-full bg-gray-400 relative px-2 scrollable">
      <table className="w-full border-separate border-spacing-y-1 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="sticky fixed border  shadow-inner-custom  top-0 bg-gray-50 dark:bg-gray-200 text-xs text-gray-400 uppercase dark:text-gray-800">
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
                    setIsRowClicked(!isRowClicked);
                    setCommentTransaction(transactionDto.transaction);
                     console.log(commentTransaction) ;// Call handleRowClick with the transactionDto
                     console.log("after comment transaction.") ;// Call handleRowClick with the transactionDto
                    // handleRowClick(transactionDto.transaction); 
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
     <div className="left-side-lower w-full gap-4 bg-slate-200 p-2 bottom-4 absolute h-[50px] flex items-center justify-center">
           <div className=" w-full  bg-slate-400 bottom-4 absolute h-[50px] flex items-center justify-center gap-12  p-4">
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
      isRowClicked={isRowClicked}
      setIsRowClicked={setIsRowClicked}
      user={user}
      commentTransaction={commentTransaction}
      toggleCommentSection={toggleCommentSection} />
 

    </>
  );
}

export default FriendTranscationDetail;
