import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare, faPenToSquare, faList, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import  '../CssStyle/GroupDashboard.css';
import { getAllCommentsByTransactionId, postNewCommentsByTransactionId } from "../Api/HisabKitabApi";
import UpdateFriendTransaction from '../Modals/UpdateFriendTransactionModel';
import DeleteAlertModal from '../Modals/DeleteAlertModal';
function CommentSection({ isOpen, toggleCommentSection, commentTransaction,user,setIsRowClicked,isRowClicked }) {

  const [width, setWidth] = useState('0'); // Initially set width to 0%
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
 const[isUpdateFormOpen,setIsUpdateFormOpen]=useState(false);
 const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

 const toggleDeleteAlert = () => {
   setIsDeleteAlertOpen(!isDeleteAlertOpen);
 };
  const toggleUpdateForm=()=>{
    setIsUpdateFormOpen(!isUpdateFormOpen);
  };

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

  const deleteTransactionDetails = 
    (transId)=> {
      console.log("TranId" + transId);
    };

  
  return (
    <>
      <div
        className="Details h-full shadow-inner-custom bg-gray-100 z-50 absolute right-0 p-2"
        style={{
          width: width,
          visibility: width === '0' ? 'hidden' : 'visible', // Hide when width is 0%
          transition: 'width 0.3s ease, visibility 0.1s ease', // Smooth transition for both width and visibility
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

        <div className="friend-profile h-[10%] w-full p-[10px] flex gap-[10px] flex items-center">
          <div className="alphabet-circle bg-cyan-800 h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <h1 className="text-white text-lg">{user.fullName[0].toUpperCase()}
            </h1>
          </div>
          <div className="user-name">
            <h2 className="text-lg text-gray-800">{user.fullName}</h2>
            <p className="text-sm text-gray-600">
              +91 <span>{user.contactNo}</span>
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <button onClick={toggleUpdateForm} className="w-[80%]  h-[40px] border border-teal-800 text-sm text-teal-800 hover:text-white   hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <span className="mr-5"><FontAwesomeIcon icon={faPenToSquare} /></span> Update Entry
          </button>
          <UpdateFriendTransaction isOpen={isUpdateFormOpen} toggleModal={toggleUpdateForm}/>
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

        <div className="comment-section w-full h-[50%]  flex flex-col">
          {/* Heading */}
          <div className="comment-heading shadow-inner-custom border border-gray-400 text-lg flex justify-center items-center bg-gray-200 border border-gray-300 py-2">
            Comments
          </div>

          {/* Comments Box */}
          <div className="comment-box flex flex-col border border-gray-400 gap-2 bg-gray-300 shadow-inner-custom border border-gray-300 p-2  h-[70%] scrollable">
            {/* Repeat User Comments */}
            {comments.map((comment, index) => {
              // Calculate lastClosingAmount dynamically
              
              return (
                <div
  key={index}
  className="user-comment border border-gray-400 flex shadow-inner-custom gap-2 p-2 bg-white rounded-sm shadow-sm items-start"
>
  {/* User Icon */}
  <div className="alphabet-circle bg-cyan-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
    <h1 className="text-white text-sm leading-none">
      {comment.userFullName[0].toUpperCase()}
    </h1>
  </div>

  {/* Comment Content */}
  <div className="flex-1">
    <div className="user-name flex justify-between items-start">
      {/* User Name */}
      <h2 className="text-sm text-gray-800 font-semibold">
        {comment.userFullName}
      </h2>

      {/* Trash Bin */}
      <span className="text-rose-800 cursor-pointer">
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    </div>

    {/* Comment Text */}
    <p className="text-sm  text-gray-600 break-all overflow-hidden">
      {comment.comments}
    </p>
  </div>
</div>

              
              
              )})}
       
          </div>

          {/* Input Section */}
          <div className="comment-input flex gap-2 items-center p-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
        className="flex-grow p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-0.5 focus:ring-gray-400"
      />
      <button
        type="button"
        onClick={handleCommentSubmit}
        className="bg-teal-600 text-white text-sm px-3 py-1 rounded-sm hover:bg-teal-700 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      
      >
        Send
      </button>
    </div>
        </div>

        <div className="w-full flex items-center justify-center" onClick={()=>deleteTransactionDetails(commentTransaction.transId)}>
          <button onClick={toggleDeleteAlert} className="w-[80%]  h-[40px] border border-rose-800 text-sm text-rose-800 hover:text-white   hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <span className="mr-5"><FontAwesomeIcon icon={faTrashCan} /></span> Delete Entry
          </button>
          <DeleteAlertModal isOpen={isDeleteAlertOpen} toggleModal={toggleDeleteAlert}/>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
