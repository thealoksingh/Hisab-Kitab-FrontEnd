import React, { useState, useEffect } from "react";
import ProfileCircle from "../utils/ProfileCircle";
import {
  acceptRequest,
  getAllPendingRequest,
  getAllSentRequest,
  rejectRequest,
  unsendRequest
} from "../Api/HisabKitabApi";

const FriendRequestModal = ({ isOpen, toggleModal, user  }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  
  useEffect(() => {
    if (!isOpen) return; // Avoid fetching if modal is closed

    const fetchRequests = async () => {
      try {
        const pendingResponse = await getAllPendingRequest(user.userId);
        setPendingRequests(pendingResponse?.data || []);
        console.log("Pending requests fetched:", pendingResponse.data);

        const sentResponse = await getAllSentRequest(user.userId);
        setSentRequests(sentResponse?.data || []);
        console.log("Sent requests fetched:", sentResponse.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [isOpen, user]);

  const handleAccept = async (requestId) => {
    try {
      await acceptRequest(requestId);
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
      console.log("Request accepted successfully");
     
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      setPendingRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
      console.log("Request rejected successfully");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const handleUnsend = async (requestId) => {
    try {
      await unsendRequest(requestId);
      setSentRequests((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
      console.log("Request unsent successfully");
    } catch (error) {
      console.error("Error unsending request:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="Friend-Request-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className="inset-0 z-50 fixed bg-gray-900 bg-opacity-30"
    >
      <div className="z-50 main-form w-full relative p-2 h-full flex justify-end">
        <div className="form1 w-1/4 bg-white rounded-sm shadow dark:bg-gray-300 form-custom-shadow-inner">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-gray-600 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Friend Requests
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="main-content h-full p-2">
            <h4 className="font-semibold text-gray-900">Take Action on Request</h4>
            <div className="incoming-friend-request shadow-inner-custom h-72 w-full bg-gray-300 mt-2 p-2">
              <div className="scrollable shadow-inner-custom h-full w-full bg-gray-50 p-1">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="requests shadow-inner-custom h-10 w-full bg-gray-100 mb-1 p-1.5 justify-between flex"
                    >
                      <div className="w-36 flex items-center gap-1 p-0.5">
                        
                        <ProfileCircle
                      className="h-7 w-7  text-white text-sm"
                      name={request.sender?.fullName}
                      color={request.sender?.colorHexValue}
                    />
                        <h4 className="px-2 ">
                          {request.sender?.fullName?.length > 10
                            ? request.sender.fullName.slice(0, 10) + "..."
                            : request.sender.fullName}
                        </h4>

                      </div>
                      <div className="w-36 flex justify-center items-center gap-1 p-0.5">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="w-16 text-xs h-full text-sm text-cyan-600 border border-cyan-600 hover:text-white hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="w-16 text-xs h-full text-sm text-rose-600 border border-rose-600 hover:text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No pending requests found.</p>
                )}
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mt-1">Sent Requests</h4>
            <div className="pending-friend-request shadow-inner-custom h-64 w-full bg-gray-300 mt-2 p-2">
              <div className="scrollable shadow-inner-custom h-full w-full p-1 bg-gray-50">
                {sentRequests.length > 0 ? (
                  sentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="requests shadow-inner-custom h-10 w-full bg-gray-100 mb-1 p-1.5 justify-between flex"
                    >
                      <div className="w-36 flex items-center gap-1 p-0.5">
                        
                        <ProfileCircle
                      className="h-7 w-7  text-white text-sm"
                      name={request.receiver?.fullName}
                      color={request.receiver?.colorHexValue}
                    />
                        <h4 className="px-2 ">
                          {request.receiver?.fullName?.length > 10
                            ? request.receiver.fullName.slice(0, 10) + "..."
                            : request.receiver.fullName}
                        </h4>

                      </div>
                      <div className="w-36 flex justify-center items-center p-0.5">
                        <button
                          onClick={() => handleUnsend(request.id)}
                          className="w-16 text-xs h-full text-sm text-yellow-600 border border-yellow-600 hover:text-white hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                          Unsend
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No sent requests found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestModal;
