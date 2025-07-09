import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";
import unFriendImage from "../assets/unFriend.png";
import "../CssStyle/GroupDashboard.css";
import FriendTransactionReport from "../Modals/FriendTransactionReport";
import GiveGotModal from "../Modals/GiveGotModal";
import UnfriendModal from "../Modals/UnfriendModal";
import ProfileCircle from "../utils/ProfileCircle";
import CommentSection from "./CommentSection";
import FooterSection from "./FooterSection";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectFriends, selectUser } from "../Redux/Selector";
import { getAllFriendTransactions } from "../Redux/Thunk";
function FriendTranscationDetail({
  

  refreshFriendTransaction,
  setRefreshFriendTransaction,
  isOpen,
  toggleLeftSidebar,
  toggleRightSidebar,
  setIsFriendSelected,
  setSelectedFriend,
  friendAndTransloader,
}) {

  const user = useSelector(selectUser);
  const {friendId} = useParams();

  const friends = useSelector(selectFriends);
  const selectedFriend = friends?.find(friend => friend?.userEntity?.userId == friendId)?.userEntity || null;

  const [transactionsDto, setTransactionsDto] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Track the transaction type (Give or Got)

  const [commentTransaction, setCommentTransaction] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isCommentSectionOpen, setIsCommentSetionOpen] = useState(false);
  const [isUnfriendModalOpen, setIsUnfriendModalOpen] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // // Redirect if the user is not authenticated
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/"); // Redirect to login page if not authenticated
  //   }
  // }, [user, navigate]);

  
  // useEffect(() => {
  //   const handlePopState = (e) => {
  //     e.preventDefault();

  //     if (window.history.state?.commentOpen) {
  //       toggleCommentSection(); // Close comment section
  //     } else {
       
  //       setRefreshFriendTransaction((prev) => !prev);
  //       setIsFriendSelected(false);
  //       setSelectedFriend(null);
  //       toggleRightSidebar();
  //       toggleLeftSidebar();
  //       navigate("/user-dashboard/friends", { replace: true }); // Navigate to friends page
  //     }
  //   };

  //   window.history.replaceState({ dashboard: true }, ""); // Ensure initial state is set
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [user, isCommentSectionOpen, navigate]);

  // End of Prevent the user from going back to the previous page

  const handleRowClick = (transactionId) => {
    //sets transaction Id when we open comment section for any transaction
    setSelectedRowId(transactionId);
  };

  // const toggleCommentSection = () => {
  //   setIsCommentSetionOpen((prevState) => {
  //     if (!prevState) {
  //       window.history.pushState({ commentOpen: true }, ""); // Push new history entry
  //     } else {
  //       window.history.replaceState({ dashboard: true }, ""); // Replace state when closing
  //     }
  //     return !prevState;
  //   });
  // };

  const toggleReportModal = () => {
    if (!isReportModalOpen) {
      if (transactionsDto.length === 0) {
        alert("You must have at least one transaction to download Report");
        return;
      }
    }
    setReportModalOpen(!isReportModalOpen);
  };


  const toggleUnfriendModal = () => {
    setIsUnfriendModalOpen(!isUnfriendModalOpen);
  }


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
      setIsTransactionLoading(true);
      if (!transactionsDto) return;

      try {
        const response = await dispatch(getAllFriendTransactions(
          selectedFriend?.userId
        ));


        if (getAllFriendTransactions.fulfilled.match(response)) {
          // If the action was fulfilled, it means the transactions were fetched successfully
          console.log("Transactions fetched successfully:", response?.payload?.data);
          setTransactionsDto(response?.payload?.data || []);
        } else {
          setError(response?.payload?.message || "Failed to fetch transactions");
        }

        setIsTransactionLoading(false);

      } catch (err) {
        console.error(err.message || "An error occurred while fetching transactions");
        setError(err?.message);
      } finally { setIsTransactionLoading(false); }
    };

    fetchTransactions();
  }, [user, selectedFriend, refreshFriendTransaction]);


useEffect(() => {
  console.log('selected friend = ', selectedFriend);
}, [selectedFriend]);


  useEffect(() => {
  }, [commentTransaction]);

  return (
    <div className="flex flex-col h-[90%] lg:h-[98%] overflow-y-auto lg:pt-0">
      <div
        onClick={() => {
          if (isCommentSectionOpen) {
            setIsCommentSetionOpen(false);
          }
        }}
        className="right-header  gap-[8px]  sm:gap-[8px] md:gap-[7px]  p-1   lg:p-2  md:p-4     border border-gray-400 shadow-inner-custom justify-between h-20 sm:h-24 md:h-24 bg-gray-300  w-full flex items-center "
      >
        <div className=" flex gap-3 sm:gap-2 md:gap-2">
          <ProfileCircle
            name={selectedFriend?.fullName}
            color={selectedFriend?.colorHexValue}
          />

          <div className="user-name-number   ">
            <h2 className="sm:text-sm  md:text-sm lg:text-lg text-gray-800 line-clamp-1">
              {selectedFriend?.fullName}
            </h2>
            <p className="text-[10px] sm:text-sm  md:text-sm text-green-700 line-clamp-2">
              +91 <span>{selectedFriend?.contactNo}</span>
            </p>
          </div>
        </div>

        {transactionsDto.length > 0 && <div
          className={`net-balance border  text-xs ml-2 font-medium sm:font-semibold sm:ml-2 p-1 sm:p-2 h-8 w-25 sm:h-9 sm:w-35  md:h-9 md:w-35 rounded-sm flex flex-col justify-center   ${transactionsDto.length > 0 &&
              transactionsDto[0].lastClosingBalance >= 0
              ? "border-green-900 text-green-900"
              : "border-red-900 text-red-900"
            }`}
        >
          <h2
            className={`text-black line-clamp-2  sm:line-clamp-1  text-xs md:text-xs sm:text-xs ${transactionsDto.length > 0 &&
                transactionsDto[0].lastClosingBalance >= 0
                ? "border-green-900 text-green-900"
                : "border-red-900 text-red-900"
              }`}
          >  </h2>
            {transactionsDto.length > 0 && (
              <>
                {transactionsDto[0].lastClosingBalance >= 0
                  ? "You will get"
                  : "You will give"}
                <p className="text-center text-[10px]">
                 
                  ₹{Math.abs(transactionsDto[0].lastClosingBalance)}
                </p>
              </>
            )}
        
        </div>}

        {/* Report */}

        <div className="report-unfriend    flex gap-3 sm:gap-1 md:gap-1  items-center justify-between">
          <button
            onClick={toggleReportModal}
            className="report w-30 group sm:w-36 md:w-36  h-8 sm:h-[35px] md:h-[32px] px-1 sm:px-3 md:px-3 bg-transparent   sm:bg-rose-600  md:bg-rose-600  flex items-center justify-center lg:hover:bg-rose-500 focus:outline-none lg:focus:ring-4 lg:focus:ring-rose-300 font-medium rounded-sm shadow-none sm:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="inline sm:hidden ">
              <FontAwesomeIcon className=" " icon={faDownload} />
            </span>
            <span className="hidden sm:flex items-center">
              <FontAwesomeIcon icon={faDownload} className="mr-1 group-hover:animate-bounce  text-black  sm:text-white" />
              <span className="line-clamp-1 text-white sm:text-sm">View Report</span>
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
            className="settings h-9 w-9 sm:h-10 sm:w-10 md:h-10 md:w-10 right-0 hover:scale-110 rounded-full border shadow-md  flex items-center justify-center bg-cyan-800 "
          >
            <img
              src={unFriendImage}
              alt="Settings"
              className="w-4 h-10 sm:h-6 sm:w-6 object-contain filter invert brightness-0"
            />

          </div>
          <UnfriendModal
            isOpen={isUnfriendModalOpen}
            toggleModal={toggleUnfriendModal}
            userId={user?.userId}
            friendId={selectedFriend?.userId}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
            setIsFriendSelected={ setIsFriendSelected}
          />
        </div>
      </div>

      {/* middle section */}

      <div
        onClick={() => {
          if (isCommentSectionOpen) {
            setIsCommentSetionOpen(false);
          }
        }}
        class="table-division mb-1  border border-gray-400 w-full  flex-1 overflow-auto  bg-gray-400  overflow-y-scroll  scrollable  "
      >
        <table className="w-full p-0   sm:p-2 md:p-2   border-separate border-spacing-y-1 text-sm text-left text-black dark:text-black">
          <thead className="sticky top-0  border  shadow-inner-custom    bg-gray-100  text-xs text-gray-600 uppercase dark:text-gray-800">
            <tr className="border-b ">
              <th scope="col" className="px-2 py-4 lg:px-3 lg:py-3 md:px-4 md:py-3 ">
                Entries
              </th>
              <th scope="col" className="px-2 py-4 lg:px-3 lg:py-3 md:px-4 md:py-3">
                You gave
              </th>
              <th scope="col" className="px-2 py-4 lg:px-3 lg:py-3 md:px-4 md:py-3 text-right">
                You got
              </th>
            </tr>
          </thead>
          {friendAndTransloader || isTransactionLoading ? (
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className="bg-gray-200 animate-pulse mb-1  shadow-inner-custom rounded-sm dark:border-gray-100 cursor-pointer"
                >
                  <td colSpan="3" className="h-14"></td>

                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>

              {!transactionsDto.length > 0 && (
                <tr>
                  <td colSpan="3" className="h-96 w-full p-4 text-center">
                    <p className="text-gray-300 text-xl font-bold">
                      You don't have any transactions yet. Start managing your transactions, add real-time comments,
                      view reports, and access summaries.
                    </p>
                  </td>
                </tr>

              )}
              {transactionsDto.map((transactionDto, index) => {
                const isUserGave =
                  user?.userId === transactionDto.transaction.fromUserId;

                return (
                  <tr
                    key={transactionDto.transaction.transId}
                    className={`bg-white border-b border-1 shadow-inner-custom rounded-sm dark:border-gray-100 cursor-pointer ${selectedRowId === transactionDto.transaction.transId
                        ? "bg-gray-300 dark:bg-gray-300"
                        : "bg-gray-100 dark:bg-gray-100"
                      }`}
                    onClick={() => {
                     
                    
                       navigate(`/user-dashboard/friends/${friendId}/transactions/${transactionDto.transaction.transId}`);
                     
                    }}
                  >
                    <td
                      scope="row"
                      className="px-2 py-2 lg:px-6 lg:py-4  md:px-4 md:py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-xs  line-clamp-2 sm:line-clamp-0 text-cyan-700">
                          Closing Balance :<span className="text-black"> ₹</span>{" "}
                          <span className="text-black">{transactionDto.lastClosingBalance}</span>
                        </span>
                        <span className="text-xs text-gray-900 mt-1">
                          {transactionDto.transaction.transDate}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-2    ">
                      {isUserGave && (
                        <div className="flex flex-col">
                          <span className="font-medium  text-xs lg:text-sm text-rose-500">
                            <span>₹</span> {transactionDto.transaction.amount}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-3 py-2    sm:text-right  ">
                      {!isUserGave && (
                        <div className="flex flex-col">
                          <span className="font-medium text-right text-xs lg:text-sm text-green-500 ">
                            <span>₹</span> {transactionDto.transaction.amount}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>)}
        </table>
      </div>

      <div className="left-side-lower font-Poppins  rounded-sm    text-xs sm:text-sm gap-1 justify-evenly border-none whitespace-nowrap md:text-xs border-gray-400 w-full lg:gap-4  bg-gray-300 p-2  h-[50px] flex items-center  ">
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
          userId={user?.userId}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          transactionType={transactionType}
          friendId={selectedFriend?.userId}
          refreshFriendTransaction={refreshFriendTransaction}
          setRefreshFriendTransaction={setRefreshFriendTransaction}
        />
      </div>
      <FooterSection/>
<Outlet />
      {/* <CommentSection
        selectedFriend={selectedFriend}
        isOpen={isCommentSectionOpen}
        isRowClicked={isRowClicked}
        setIsRowClicked={setIsRowClicked}
        user={user}
        commentTransaction={commentTransaction}
        toggleCommentSection={toggleCommentSection}
        refreshFriendTransaction={refreshFriendTransaction}
        setRefreshFriendTransaction={setRefreshFriendTransaction}
        setCommentTransaction={setCommentTransaction}
      /> */}
    </div>
  );
}

export default FriendTranscationDetail;
