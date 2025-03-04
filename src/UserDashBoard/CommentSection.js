import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileCircle from "../utils/ProfileCircle";
import { deleteComment } from "../Api/HisabKitabApi";
import moment from "moment-timezone";

import {
  faShareFromSquare,
  faPenToSquare,
  faList,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "../CssStyle/GroupDashboard.css";
import {
  getAllCommentsByTransactionId,
  postNewCommentsByTransactionId,
} from "../Api/HisabKitabApi";
import UpdateFriendTransaction from "../Modals/UpdateFriendTransactionModel";
import DeleteAlertModal from "../Modals/DeleteAlertModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function CommentSection({
  isOpen,
  toggleCommentSection,
  commentTransaction,
  setCommentTransaction,
  user,
  setIsRowClicked,
  isRowClicked,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
}) {
  const [width, setWidth] = useState("0"); // Initially set width to 0%
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const toggleDeleteAlert = () => {
    setIsDeleteAlertOpen(!isDeleteAlertOpen);
  };
  const toggleUpdateForm = () => {
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };
  // timestamp

  // const newComment = {
  //   text: "This is a comment",
  //   commentTime: new Date().toISOString(), // Stores fixed timestamp
  // };
  // const formattedTime = moment(comment.commentTime).fromNow();

  useEffect(() => {
    if (isOpen) {
       setWidth("100%"); // Set to 100% for all screen sizes initially
    } else {
        setWidth("0");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        if (window.innerWidth >= 1024) {
          // lg breakpoint
          setWidth("60%");
        } else {
          setWidth("100%");
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (commentTransaction == null) return;
    const fetchComments = async () => {
      setIsCommentLoading(true);
      if (!isOpen) {
        setComments([]); // Clear comments when the sidebar is closed
        return;
      }
      try {
        const response = await getAllCommentsByTransactionId(
          commentTransaction.transId
        );
       

        setComments(response.data); // Assuming the data is in response.data.friendList
       
        setIsCommentLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsCommentLoading(false);
      }
    };

    fetchComments();
  }, [user, isRowClicked, commentTransaction, isOpen]);

  if (commentTransaction == null) return;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // console.log("Comment Cliked");
    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    setIsLoading(true);

    const commentRequestDto = {
      transactionId: commentTransaction.transId,
      userId: user.userId,
      comment: commentText,
    };

    try {
      const response = await postNewCommentsByTransactionId(commentRequestDto);
      setCommentText("");
      setIsRowClicked(!isRowClicked);
    } catch (error) {
      // console.error("Error creating transaction", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmation) return;

    try {
      console.log("Delete Comment api called");
      await deleteComment(commentId);
      alert("Comment deleted successfully");
      // Optionally, update the UI to reflect the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      // console.error("Error deleting comment:", error);
      alert("Failed to delete the comment. Please try again.");
    }
  };

  return (
    <>
    {commentTransaction && (
  <div
    className="Details absolute right-0 top-0 h-full shadow-inner-custom bg-gray-100 z-50 p-2"
    style={{
      width: width,
      visibility: width === "0" ? "hidden" : "visible",
      transition: "width 0.3s ease, visibility 0.1s ease",
    }}
  >
   <div className="h-10 shadow-inner-custom w-full bg-gray-300 p-5 flex items-center">
            <h2>Entry Details</h2>
            <button
              type="button"
              className=" close-button text-gray-400 bg-transparent hover:bg-gray-600 hover:text-gray-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-300 dark:hover:text-white"
              onClick={toggleCommentSection}
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
              <span className="sr-only">Close Detail</span>
            </button>
          </div>

          <div className="friend-profile h-[10%] w-full p-[10px]  gap-[10px] flex items-center">
            <ProfileCircle
              className="h-10 w-10 mr-4 text-white text-sm"
              name={user.fullName}
              color={user.colorHexValue}
            />

            <div className="user-name">
              <h2 className="text-lg text-gray-800">{user.fullName}</h2>
              <p className="text-sm text-gray-600">
                +91 <span>{user.contactNo}</span>
              </p>
            </div>
          </div>

          {commentTransaction.createdBy === user.userId && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleUpdateForm}
                className="w-[80%]  h-[35px] border border-teal-800 text-sm text-teal-800 hover:text-white   hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="mr-5">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>{" "}
                Update Entry
              </button>
              

              <UpdateFriendTransaction
                user={user}
                toggleCommentSection={toggleCommentSection}
                refreshFriendTransaction={refreshFriendTransaction}
                setRefreshFriendTransaction={setRefreshFriendTransaction}
                commentTransaction={commentTransaction}
                setCommentTransaction={setCommentTransaction}
                isOpen={isUpdateFormOpen}
                toggleModal={toggleUpdateForm}
              />
            </div>
          )}

          <div className="transaction-amount w-full p-[10px]  gap-[10px] flex items-center">
            <div className="give-got-icon">
              <FontAwesomeIcon
                icon={faShareFromSquare}
                className="h-[15px] text-gray-700"
              />
            </div>
            <div className="net-balance">
              <h4 className="text-sm text-gray-800">
                You{" "}
                {commentTransaction.fromUserId === user.userId
                  ? " Gave "
                  : " Got "}{" "}
                :
                <span
                  className={`text-sm font-semibold ${
                    commentTransaction.fromUserId === user.userId
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  ₹ <span> {commentTransaction.amount}</span>
                </span>
              </h4>
            </div>
          </div>

          <div className="transaction-Description w-full p-[10px] flex gap-[10px] flex">
            <div className="give-got-icon">
              <FontAwesomeIcon
                icon={faList}
                className="h-[15px] text-gray-700"
              />
            </div>
            <div className="net-balance">
              <h4 className="text-sm text-gray-800">Description:</h4>
            </div>
            <div className="text-xs text-gray-600  h-8  p-1 mb-4  ">
              {commentTransaction.description}{" "}
             
            </div>
          </div>

          <div className="comment-section  w-full h-[50%]  flex flex-col">
            {/* Heading */}

            <div className="comment-heading shadow-inner-custom border border-gray-400 text-lg flex justify-center items-center bg-gray-200 border border-gray-300 py-2">
              Comments
            </div>
            {/* Comments Box */}
            {isCommentLoading ? (
              <div className="comment-loading animate-pulse overflow-y-scroll scrollable h-full flex flex-col border border-gray-400 gap-2 shadow-inner-custom border-gray-300 p-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="user-comment-loading animate-pulse border border-gray-400 flex shadow-inner-custom gap-2 p-2 pr-4 bg-gray-300 h-16 rounded-sm shadow-sm items-start"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="comment-box scroll-auto overflow-y-scroll flex flex-col border border-gray-400 gap-2 bg-gray-300 shadow-inner-custom border border-gray-300 p-2  h-[70%] scrollable">
                {/* Repeat User Comments */}
                {!comments.length &&<div className="flex items-center justify-center  w-full h-full">
                  <div className="text-xl text-gray-400">
                  Comments Not Found
                  
                  </div></div>}
 
                {comments.map((comment, index) => {
                  // Calculate lastClosingAmount dynamically

                  return (
                    <div
                      key={index}
                      className="user-comment  border border-gray-400 flex shadow-inner-custom gap-2 p-2 pr-4 bg-white rounded-sm shadow-sm items-start"
                    >
                      {/* User Icon */}
                      <ProfileCircle
                        className="h-8 w-8 mr-4 text-white text-sm"
                        name={comment.userFullName}
                        color={comment.colorHexValue}
                      />

                      {/* Comment Content */}
                      <div className="flex-1">
                        <div className="user-name flex justify-between items-start">
                          {/* User Name */}
                          <h2 className="text-sm text-gray-800 font-semibold">
                            {comment.userFullName}
                          </h2>

                          {/* Trash Bin */}
                          {comment.userId === user.userId && (
                            <span
                              onClick={() =>
                                handleDeleteComment(comment.commentId)
                              }
                              className="text-rose-800 cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                          )}
                        </div>
                        <div className="user-name flex justify-between items-start relative">
                          {/* Comment Text */}
                          <p className="text-sm mb-4  text-gray-600 break-all overflow-hidden">
                            {comment.comments}
                          </p>
                          <p className="text-xs font-semibold absolute bottom-0 right-1">
                            {/* {comment.commentTime} */}
                            {moment(comment.commentTime)
                              .tz("Asia/Kolkata")
                              .fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Input Section */}
            <div className="comment-input flex gap-2 w-full  items-center py-3 px-2 overflow-hidden">
              <input
                type="text"
                placeholder="Write a comment...."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="flex-grow p-2 text-sm rounded-sm border border-gray-300 focus:outline-none focus:ring-0.5 focus:ring-gray-400 w-0 min-w-0"
              />
              <button
                type="button"
                onClick={handleCommentSubmit}
                className="bg-teal-600 text-white text-sm px-4 py-1 rounded-sm hover:bg-teal-700 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex">
                    <div className="w-5 h-5 border-3 border-t-4 border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>

          {commentTransaction.createdBy === user.userId && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={toggleDeleteAlert}
                className="w-[80%] mt-0  sm:mt-2  h-[35px] border border-rose-800 text-sm text-rose-800 hover:text-white   hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="mr-5">
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>{" "}
                Delete Entry
              </button>
              <DeleteAlertModal
                transId={commentTransaction.transId}
                isOpen={isDeleteAlertOpen}
                toggleCommentSection={toggleCommentSection}
                toggleModal={toggleDeleteAlert}
                refreshFriendTransaction={refreshFriendTransaction}
                setRefreshFriendTransaction={setRefreshFriendTransaction}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CommentSection;
