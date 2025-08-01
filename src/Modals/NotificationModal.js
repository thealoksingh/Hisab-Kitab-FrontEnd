import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const NotificationModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      title: "Friend Request",
      message:
        "You have a friend request from Jay Singh You have a friend request from Jay Singh You have a friend request from Jay Singh",
      isRead: false,
    },
    {
      title: "New Message",
      message: "You received a message from Priya Sharma",
      isRead: true,
    },
     {
      title: "Friend Request",
      message:
        "You have a friend request from Jay Singh You have a friend request from Jay Singh You have a friend request from Jay Singh",
      isRead: false,
    },
    {
      title: "New Message",
      message: "You received a message from Priya Sharma",
      isRead: true,
    },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50  flex items-center justify-center">
      <div className="bg-yellow-100 text-yellow-800 border-2 border-yellow-500 p-3 rounded-md h-[60%] shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[30%] max-h-[80%]">
        <div className="flex items-center justify-between mb-3 sticky top-0 bg-yellow-100 z-10">
          <p className="font-bold text-base sm:text-sm">🔔 New Notifications</p>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-lg sm:text-xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="bg-yellow-50 h-[85%]  p-2 rounded-md  overflow-y-auto">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-yellow-100 shadow-sm rounded-md"></div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div
                key={index}
                className={`mb-3 bg-yellow-50 border-l-4 border-yellow-500 px-4 py-3 rounded-md shadow`}
              >
                <div
                  className={`flex flex-col gap-1 ${
                    item.isRead ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs sm:text-sm mb-1">
                      {item.title}
                    </p>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-sm sm:text-sm cursor-pointer hover:opacity-80 text-red-600"
                      onClick={onClose}
                    />
                  </div>
                  <p className="text-xs sm:text-xs">{item.message}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p></p>
                  <button
                    className={`mt-1 text-xs sm:text-xs font-semibold 
        ${
          item.isRead
            ? " text-yellow-600 hover:text-yellow-800"
            : " text-teal-600 hover:text-teal-800"
        }`}
                  >
                    {item.isRead ? (
                      <span>Mark as unread</span>
                    ) : (
                      <span>Mark as read</span>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
        <p className="text-sm text-yellow-700">No notifications found.</p>
    </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
