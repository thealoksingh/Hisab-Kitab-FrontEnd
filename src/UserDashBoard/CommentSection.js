import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { deleteComment } from "../Api/HisabKitabApi";
import ProfileCircle from "../utils/ProfileCircle";

import {
  faList,
  faPenToSquare,
  faShareFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "../CssStyle/GroupDashboard.css";

import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { showSnackbar } from "../Redux/SanckbarSlice";
import { selectFriends, selectUser } from "../Redux/Selector";
import {
  getAllTransactionComments,
  getTransactionById,
  postNewCommentsByTransactionId,
} from "../Redux/Thunk";
import { useCommentSubscription } from "../hooks/useCommentSubscription";

function CommentSection({}) {
  const [width, setWidth] = useState("0%"); // Initially set width to 0%
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();
  const { transactionId, friendId } = useParams();
  // console.log("transactionId:", transactionId);
  const toggleDeleteAlert = () => {
    setIsDeleteAlertOpen(!isDeleteAlertOpen);
  };
  const toggleUpdateForm = () => {
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };
  const { selectedTransaction } = useOutletContext();
  const [commentTransaction, setCommentTransaction] = useState(null);
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  // console.log("user in CommentSection:", user);
  const dispatch = useDispatch();
  // console.log("selectedTransaction in CommentSection:", selectedTransaction);

useEffect(() => {
  console.log("🔍 Creator Check:", {
    commentTransaction,
    user,
    friends,
    selectedFriend,
    creator,
  });
}, [commentTransaction, user, friends, selectedFriend, creator]);


  useEffect(() => {
  if (commentTransaction && user && friends?.length > 0) {
    const friend = friends.find(
      (f) => f.friendId === commentTransaction.friendId
    );
    setSelectedFriend(friend);

    const isUserCreator = commentTransaction.createdBy === user.userId;
    setCreator(isUserCreator ? user : friend);
  }
}, [commentTransaction, user, friends]);


  useEffect(() => {
    if (!transactionId) return;

    if (selectedTransaction) {
      setCommentTransaction(selectedTransaction);
    } else {
      console.log("Fetching transaction by ID:", transactionId);
      // Fetch from backend if not present
      const fetchTransaction = async () => {
        
        console.log("Fetching transaction by ID:", transactionId);
        const response = await dispatch(getTransactionById(transactionId));

        if (getTransactionById.fulfilled.match(response)) {
          console.log("Fetched transaction successfully:", response?.payload);
          setCommentTransaction(response?.payload?.data);
          setCreator(
            commentTransaction?.createdBy === user?.userId
              ? user
              : selectedFriend
          );

          console.log("Creator set to:", creator);
          // Optionally, you can also set the comments here if needed
          // await dispatch(getAllTransactionComments(transactionId));
          // setComments(response?.payload?.data);
        } else {
          console.error("Failed to fetch transaction:", response?.error);
          dispatch(
            showSnackbar({
              message:
                response?.payload?.message || "Failed to fetch transaction",
              type: "error",
            })
          );
        }
      };

      fetchTransaction();
    }
  }, []);

  useEffect(() => {
    if (!transactionId) {
      setWidth("0"); // Close if not on transaction route
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setWidth("30%");
      } else {
        setWidth("100%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [transactionId]);

  useEffect(() => {
    console.log("comment section mounted.");
    if (commentTransaction == null) return;
    const fetchComments = async () => {
      setIsCommentLoading(true);

      try {
        const response = await dispatch(
          getAllTransactionComments(commentTransaction?.transId)
        );

        if (getAllTransactionComments.fulfilled.match(response)) {
          console.log("Fetched comments successfully:", response?.payload);
          setComments(response?.payload?.data);
        }

        // await dispatch(showSnackbar({
        //   message: "Comments fetched successfully", type: "success"
        // }))

        // setComments(response.data); // Assuming the data is in response.data.friendList

        setIsCommentLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsCommentLoading(false);
      }
    };

    fetchComments();
  }, [user, commentTransaction]);

  // Real-time updates
  useCommentSubscription(transactionId, (comment) => {
    setComments((prev) => [...prev, comment]);
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // console.log("Comment Cliked");
    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    setIsLoading(true);
    const commentTime = new Date()
      .toLocaleString("en-IN", { hour12: false })
      .replace(",", "");

    // console.log("Sending commentTime:", commentTime);

    const commentRequestDto = {
      transactionId: commentTransaction?.transId,
      userId: user?.userId,
      comment: commentText,
      commentTime: commentTime,
    };

    try {
      const response = await dispatch(
        postNewCommentsByTransactionId(commentRequestDto)
      );
      if (postNewCommentsByTransactionId.fulfilled.match(response)) {
        console.log("Comment posted successfully:", response?.payload);
        setCommentText("");
        // setComments((prevComments) => [
        //   ...prevComments,
        //   response?.payload?.data,
        // ]);
        await dispatch(
          showSnackbar({
            message: "Comment posted successfully",
            type: "success",
          })
        );
      }
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
      // console.log("Delete Comment api called");
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
      {transactionId && (
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
              onClick={() => navigate(-1)} //Calling navigate(-1) to go back
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
              className="h-12 w-12 mr-4 text-white text-sm"
              name={creator?.fullName || "Unknown"}
              color={creator?.colorHexValue || "#ccc"}
            />

            <div className="user-name">
              <h2 className="text-lg text-gray-800">
                {creator?.fullName || "Unknown User"}
              </h2>
              <p className="text-sm text-gray-600">
                +91 <span>{creator?.contactNo || "N/A"}</span>
              </p>
            </div>
          </div>

          {commentTransaction?.createdBy === user?.userId && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() =>
                  navigate(
                    `/user-dashboard/friends/${friendId}/transactions/${transactionId}?action=update`
                  )
                }
                className="w-[80%]  h-[35px] border border-teal-800 text-sm text-teal-800 hover:text-white   hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="mr-5">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>{" "}
                Update Entry
              </button>

              {/* <UpdateFriendTransaction
                user={user}
                // toggleCommentSection={toggleCommentSection}
                refreshFriendTransaction={refreshFriendTransaction}
                setRefreshFriendTransaction={setRefreshFriendTransaction}
                commentTransaction={commentTransaction}
                setCommentTransaction={setCommentTransaction}
                // isOpen={isUpdateFormOpen}
                toggleModal={toggleUpdateForm}
              /> */}
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
                {commentTransaction?.fromUserId === user?.userId
                  ? " Gave "
                  : " Got "}{" "}
                :
                <span
                  className={`text-sm font-semibold ${
                    commentTransaction?.fromUserId === user?.userId
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  ₹ <span> {commentTransaction?.amount}</span>
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
              {commentTransaction?.description}{" "}
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
              <div className="comment-box scroll-auto overflow-y-scroll flex flex-col-reverse border border-gray-400 gap-2 bg-gray-300 shadow-inner-custom border-gray-300 p-2 h-[70%] scrollable">
                {/* Repeat User Comments */}
                {!comments.length && (
                  <div className="flex items-center justify-center  w-full h-full">
                    <div className="text-xl text-gray-400">
                      Comments Not Found
                    </div>
                  </div>
                )}

                {[...comments].reverse().map((comment, index) => {
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
                          {comment.userId === user?.userId && (
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
                            {moment(
                              comment.commentTime,
                              "YYYY-MM-DD HH:mm:ss"
                            ).fromNow()}
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

          {commentTransaction?.createdBy === user?.userId && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() =>
                  navigate(
                    `/user-dashboard/friends/${friendId}/transactions/${transactionId}?action=delete`
                  )
                }
                className="w-[80%] mt-0  sm:mt-2  h-[35px] border border-rose-800 text-sm text-rose-800 hover:text-white   hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <span className="mr-5">
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>{" "}
                Delete Entry
              </button>
              {/* <DeleteAlertModal
                transId={commentTransaction.transId}
                isOpen={isDeleteAlertOpen}
                // toggleCommentSection={toggleCommentSection}
                toggleModal={toggleDeleteAlert}
                refreshFriendTransaction={refreshFriendTransaction}
                setRefreshFriendTransaction={setRefreshFriendTransaction}
              /> */}
            </div>
          )}
        </div>
      )}
      <Outlet context={{ selectedTransaction, selectedFriend }} />
    </>
  );
}

export default CommentSection;
