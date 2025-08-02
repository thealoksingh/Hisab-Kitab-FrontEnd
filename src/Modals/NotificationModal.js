import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectNotifications, selectUser } from "../Redux/Selector";
import { deleteNotification, updateNotificationStatus } from "../Redux/Thunk";
import { showSnackbar } from "../Redux/SanckbarSlice";
import moment from "moment-timezone";
const NotificationModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useSelector(selectNotifications); // Assuming you have a selector to get notifications
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Get user data for notification actions
  console.log("Notifications in modal:", notifications);

  const handleDelete = async (id) => {
    // Call your API to delete the notification
    setIsLoading(true);
    try {
      await dispatch(deleteNotification(id));
      dispatch(showSnackbar({ message: "Notification deleted successfully", type: "success" }));
    } catch (error) {
      console.error("Failed to delete notification:", error);
      dispatch(showSnackbar({ message: "Failed to delete notification", type: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, status ) => {
    setIsLoading(true);
    // Call your API to update the notification status
    try {
      await dispatch(updateNotificationStatus({ id, status ,userId:user?.userId }));
      dispatch(showSnackbar({ message: `Notification marked as ${status}`, type: "success" }));
    } catch (error) {
      console.error("Failed to update notification status:", error);
      dispatch(showSnackbar({ message: "Failed to update notification status", type: "error" }));
    } finally {
      setIsLoading(false);
    }
  };

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
                <div
                  key={i}
                  className="h-16 bg-yellow-100 shadow-sm rounded-md"
                ></div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            [...notifications].reverse().map((item, index) => (
              <div
                key={index}
                className={`mb-3 bg-yellow-50 border-l-4 border-yellow-500 px-4 py-3 rounded-md shadow`}
              >
                <div
                  className={`flex flex-col gap-1 ${
                    item.seen ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs sm:text-sm mb-1">
                      {item.title}
                    </p>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-sm sm:text-sm cursor-pointer hover:opacity-80 text-red-600"
                      onClick={()=>handleDelete(item?.id)}
                    />
                  </div>
                  <p className="text-xs sm:text-xs">{item.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[8px] "> {moment(
                              item?.createdAt,
                              "YYYY-MM-DD HH:mm:ss"
                            ).fromNow()}</p>
                  <button
                    className={`mt-1 text-xs sm:text-xs font-semibold 
        ${
          item.seen
            ? " text-yellow-600 hover:text-yellow-800"
            : " text-teal-600 hover:text-teal-800"
        }`}
                  >
                    {item.seen ? (
                      <span onClick={()=>handleStatusChange(item?.id,"unseen")}>Mark as unread</span>
                    ) : (
                      <span onClick={()=>handleStatusChange(item?.id,"seen")}>Mark as read</span>
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
