import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare, faPenToSquare, faList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import  '../CssStyle/GroupDashboard.css';
function CommentSection({ isOpen, toggleCommentSection }) {

  const [width, setWidth] = useState('0'); // Initially set width to 0%
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setWidth('60%'); // When isOpen is true, set width to 60%
    } else {
      setWidth('0'); // When isOpen is false, set width to 0%
    }
  }, [isOpen]);

 useEffect(() => {
    const fetchComments = async () => {
      if (!user) return;

      try {
        console.log("getComment api called");
        const response = await getAllCommentsByTransactionId(commentTransaction.transId);
        console.log(response.data);
        console.log("above is comment response");
        
        setComments(response.data); // Assuming the data is in response.data.friendList
        console.log(comments);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComments();
  
  }, [user, isRowClicked]);


  const handleCommentSubmit = async(e) => {
    e.preventDefault();

    const commentRequestDto = {
      transactionId: commentTransaction.transId,
      userId: user.userId,
      comment: commentText
    };

    try{
      const response = await postNewCommentsByTransactionId(commentRequestDto);
      console.log("Comment Posted");
      setCommentText("");
      setIsRowClicked(!isRowClicked);

    }catch (error) {
      console.error("Error creating transaction", error);
    }

  };
  
  return (
    <>
      <div
        className="Details h-full bg-teal-100 z-50 absolute right-0 p-2"
        style={{
          width: width,
          visibility: width === '0' ? 'hidden' : 'visible', // Hide when width is 0%
          transition: 'width 0.3s ease, visibility 0.1s ease', // Smooth transition for both width and visibility
        }}
      >

        <div className="h-10 w-full bg-teal-200 p-5 flex items-center">
          <h2>Entry Details</h2>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-rose-600 hover:text-rose-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-teal-300 dark:hover:text-white"
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

        <div className="friend-profile h-[10%] w-full p-[10px] flex gap-[10px] flex items-center">
          <div className="alphabet-circle bg-teal-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <h1 className="text-white text-lg">R</h1>
          </div>
          <div className="user-name">
            <h2 className="text-lg text-gray-800">{user.fullName}</h2>
            <p className="text-sm text-gray-600">
              +91 <span>{user.contactNo}</span>
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="net-balance border border-teal-400 h-[40px] w-80 rounded flex items-center justify-center dark:hover:bg-teal-300 dark:hover:text-white">
            <span className="mr-5"><FontAwesomeIcon icon={faPenToSquare} /></span> Update Entry
          </div>
        </div>

        <div className="transaction-amount h-[8%] w-full p-[10px] flex gap-[10px] flex items-center">
          <div className="give-got-icon">
            <FontAwesomeIcon icon={faShareFromSquare} className="h-[15px] text-gray-700" />
          </div>
          <div className="net-balance">
            <h4 className="text-sm text-gray-800">You {(commentTransaction.fromUserId === user.userId) ? " Gave" : " Got"} :<span className={`text-sm ${(commentTransaction.fromUserId === user.userId) ? "text-red-600" : "text-green-600"}`}>$ <span>{commentTransaction.amount}</span></span></h4>
          </div>
        </div>

        <div className="transaction-Description w-full p-[10px] flex gap-[10px] flex">
          <div className="give-got-icon">
            <FontAwesomeIcon icon={faList} className="h-[15px] text-gray-700" />
          </div>
          <div className="net-balance">
            <h4 className="text-sm text-gray-800">Description:</h4>
          </div>
          <p className="text-sm text-gray-600">
            {commentTransaction.description}          </p>
        </div>

        <div className="comment-section w-full h-[50%] bg-rose-100 flex flex-col">
          {/* Heading */}
          <div className="comment-heading text-lg flex justify-center items-center bg-teal-200 border border-teal-300 py-2">
            Comments
          </div>

          {/* Comments Box */}
          <div className="comment-box flex flex-col gap-2 bg-teal-200 border border-teal-300 p-2  h-[70%] scrollable">
            {/* Repeat User Comments */}
            {comments.map((comment, index) => {
              // Calculate lastClosingAmount dynamically
              

              return (
            <div key = {index} className="user-comment flex gap-2 p-2 bg-white rounded-md shadow-sm">
              <div className="alphabet-circle bg-teal-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <h1 className="text-white text-sm leading-none">{comment.userFullName[0].toUpperCase()}</h1>
              </div>
              <div className="user-name">
                <h2 className="text-sm text-gray-800 font-semibold">{comment.userFullName}</h2>
                <p className="text-sm text-gray-600">
                  {comment.comments}
                </p>
              </div>
            </div>
              )})}
       
          </div>

          {/* Input Section */}
          <div className="comment-input flex gap-2 items-center bg-teal-100 border-t border-teal-300 p-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button
        type="button"
        onClick={handleCommentSubmit}
        className="bg-teal-600 text-white text-sm px-3 py-1 rounded-md hover:bg-teal-700"
      >
        Send
      </button>
    </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="net-balance bg-rose-100 border border-rose-400 h-[40px] w-80 rounded flex items-center justify-center dark:hover:bg-rose-300 dark:hover:text-white">
            <span className="mr-5"><FontAwesomeIcon icon={faTrashCan} /></span> Delete Entry
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
