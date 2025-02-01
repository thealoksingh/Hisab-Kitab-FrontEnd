import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDownload } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import React, { useState, useEffect } from "react";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";
import GiveGotModal from "../Modals/GiveGotModal";
import "../CssStyle/GroupDashboard.css";
import FriendTransactionReport from "../Modals/FriendTransactionReport";
import ProfileCircle from "../utils/ProfileCircle";
import unFriendImage from "../assets/unFriend.png";
import UnfriendModal from "../Modals/UnfriendModal";

import { useNavigate, useLocation } from "react-router-dom";
function FriendTranscationDetail({
  user,
  selectedFriend,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
  isOpen,
  toggleSidebar,
  setIsFriendSelected,
  setSelectedFriend,
}) {
  const [transactionsDto, setTransactionsDto] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Track the transaction type (Give or Got)

  const [commentTransaction, setCommentTransaction] = useState([]);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isCommentSectionOpen, setIsCommentSetionOpen] = useState(false);
const [isUnfriendModalOpen, setIsUnfriendModalOpen]= useState(false);




  

 const toggleUnfriendModal=() =>{
setIsUnfriendModalOpen(!isUnfriendModalOpen);
 }
  const handleRowClick = (transactionId) => {
    setSelectedRowId(transactionId);
  };
  const toggleReportModal = () => {
    setReportModalOpen(!isReportModalOpen);
  };

  const toggleCommentSection = () => {
    if (isCommentSectionOpen) {
      setSelectedRowId(null);
    }
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
        console.log("getTransactionDetailsWithFriend api called ");
        const response = await getTransactionDetailsWithFriend(
          user.userId,
          selectedFriend.userId
        );
        console.log("response = " + response.data);
        setTransactionsDto(response.data); // Assuming the data is in response.data.friendList
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTransactions();
  }, [user, selectedFriend, refreshFriendTransaction]);

  
  


  useEffect(() => {
    console.log("commentTransaction updated in useffect:", commentTransaction);
  }, [commentTransaction]);

  return (
    <>
      <div
        onClick={() => {
          if (isCommentSectionOpen) {
            setIsCommentSetionOpen(false);
          }
        }}
        className="right-header  gap-[8px]  sm:gap-[8px]  p-1   sm:p-2   absolute top-0  border border-gray-400 shadow-inner-custom justify-between h-20 sm:h-24 bg-gray-300 w-full  flex items-center "
      >
        <div className=" flex gap-1 sm:gap-2">
          <ProfileCircle
            className="h-10 w-10 sm:h-12 sm:w-12  text-white text-lg"
            name={selectedFriend.fullName}
            color={selectedFriend.colorHexValue}
          />

          <div className="user-name-number   ">
            <h2 className="text-lg text-gray-800 line-clamp-1">
              {selectedFriend.fullName}
            </h2>
            <p className="text-[10px] sm:text-sm text-green-700 line-clamp-2">
              +91 <span>{selectedFriend.contactNo}</span>
            </p>
          </div>
        </div>

        <div
          className={`net-balance border ml-2 font-medium sm:font-semibold sm:ml-2 p-1 sm:p-2 h-8 w-25 sm:h-9 sm:w-35 rounded-sm flex items-center justify-center   ${
            transactionsDto.length > 0 &&
            transactionsDto[0].lastClosingBalance >= 0
              ? "border-green-900 text-green-900"
              : "border-red-900 text-red-900"
          }`}
        >
          <h2
            className={`text-black line-clamp-2  sm:line-clamp-1  text-xs sm:text-xs ${
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
                <span>
                  {" "}
                  ₹ {Math.abs(transactionsDto[0].lastClosingBalance)}
                </span>
              </>
            )}
          </h2>
        </div>

       {/* Report */}

        <div className="report-settings  flex gap-1 sm:gap-1 md:gap-1  items-center justify-between">
        <button
       onClick={toggleReportModal}
         className="report w-30 sm:w-36 h-8 sm:h-[35px] text-white px-1 sm:px-3 bg-rose-600 flex items-center justify-center hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
         <span className="inline sm:hidden">
          <FontAwesomeIcon icon={faDownload} />
         </span>
         <span className="hidden sm:flex items-center">
          <FontAwesomeIcon icon={faDownload} className="mr-1" />
          <span className="line-clamp-1 sm:text-sm">View Report</span>
          </span>
            </button>
          <FriendTransactionReport
            isOpen={isReportModalOpen}
            toggleModal={toggleReportModal}
            selectedFriend={selectedFriend}
            user={user}
          />
         <div
            onClick={toggleUnfriendModal}
            className="settings h-9 w-9 sm:h-10 sm:w-10 right-0 rounded-full border border-cyan-800  flex items-center justify-center bg-cyan-700 "
           >
          <img
           src={unFriendImage}
           alt="Settings"
           className="w-4 h-10 sm:h-6 sm:w-6 object-contain filter invert brightness-0"
          />
          <UnfriendModal
          isOpen={isUnfriendModalOpen}
           toggleModal={toggleUnfriendModal}
           userId={user.userId}
           friendId={selectedFriend.userId}
            />
          </div>
         </div>
  </div>

     {/* middle section */}
     
      <div
        onClick={() => {
          if (isCommentSectionOpen) {
            setIsCommentSetionOpen(false);
          }
        }}
        class="table-division top-20  md:top-20 sm:top-24  border border-gray-400 sm:w-full  h-[75.3%] sm:h-[81.6%] bg-gray-400  absolute  scrollable  "
      >
        <table className="w-full p-0   sm:p-2  border-separate border-spacing-y-1 text-sm text-left text-black dark:text-black">
          <thead className="sticky top-0 fixed border  shadow-inner-custom    bg-gray-100  text-xs text-gray-600 uppercase dark:text-gray-800">
            <tr className="border-b top0-0">
              <th scope="col" className="px-2 py-4 sm:px-3 sm:py-3 ">
                Entries
              </th>
              <th scope="col" className="px-2 py-4 sm:px-3 sm:py-3">
                You gave
              </th>
              <th scope="col" className="px-2 py-4 sm:px-3 sm:py-3 text-right">
                You got
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsDto.map((transactionDto, index) => {
              const isUserGave =
                user.userId === transactionDto.transaction.fromUserId;

              return (
                <tr
                  key={transactionDto.transaction.transId}
                  className={`bg-white border-b border-1 shadow-inner-custom rounded-sm  dark:border-gray-100 cursor-pointer ${
                    selectedRowId === transactionDto.transaction.transId
                    ? "bg-gray-300 dark:bg-gray-300" 
                    : "bg-gray-100 dark:bg-gray-100" 
                  }`}
                  onClick={() => {
                    handleRowClick(transactionDto.transaction.transId); // Set the selected row's ID on click
                    setCommentTransaction(transactionDto.transaction);
                    toggleCommentSection();
                  }}
                >
                  <td
                    scope="row"
                    className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm line-clamp-2 sm:line-clamp-0 text-gray-900">
                        Closing Balance:<span>₹</span>{" "}
                        <span>{transactionDto.lastClosingBalance}</span>
                      </span>
                      <span className="text-xs text-gray-900 mt-1">
                        {transactionDto.transaction.transDate}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-2  sm:px-6 sm:py-4 pr-[25px]">
                    {isUserGave && (
                      <div className="flex flex-col">
                        <span className="font-medium text-rose-500">
                          <span>₹</span> {transactionDto.transaction.amount}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-2  sm:px-6 sm:py-4 pr-[25px]  sm:text-right  ">
                    {!isUserGave && (
                      <div className="flex flex-col">
                        <span className="font-medium text-green-500 ">
                          <span>₹</span> {transactionDto.transaction.amount}
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

      <div className="left-side-lower font-Poppins  rounded-sm   text-xs sm:text-sm gap-1 justify-evenly border-none whitespace-nowrap md:text-xs border-gray-400 w-full lg:gap-4  bg-gray-300 p-2 bottom-20 sm:bottom-4 absolute h-[50px] flex items-center">
        <button
          className="w-[44%]  rounded-sm   shadow-inner-custom h-full bg-rose-600 text-sm text-white 600    hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGiveButtonClick}
        >
          You Gave : <span>₹</span>
        </button>
        <button
          className="w-[44%]  rounded-sm    shadow-inner-custom h-full bg-green-800  text-sm text-white 600    hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGotButtonClick}
        >
          You Got : <span>₹</span>
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
