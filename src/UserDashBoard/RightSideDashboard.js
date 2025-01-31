import React, { useEffect } from "react";
import {  useNavigate, useLocation} from "react-router-dom";
import friendicon from "../assets/friendicon.png";
import FriendTransactionDetail from "./FriendTransactionDetail";


function RightSideDashBoard({
  user,
  isFriendSelected,
  selectedFriend,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
  isOpen,
  toggleSidebar,
  setIsFriendSelected,
  setSelectedFriend,
}) {
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const handleBackButton = (event) => {
  //     event.preventDefault(); // Prevent the default back navigation
  //     navigate(location.pathname, { state: { user } }); // Stay on the same path with new state data
  //   };

  //   window.history.pushState(null, "", window.location.href);
  //   window.addEventListener("popstate", handleBackButton);

  //   return () => {
  //     window.removeEventListener("popstate", handleBackButton);
  //   };
  // }, [navigate, location, user]);


  return (
    <div
      className={`right-side rounded h-screen lg:w-full relative overflow-hidden transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Content container with scrollable area for sm and md screens */}
      <div className="h-full overflow-y-auto lg:pt-0">
        {isFriendSelected ? (
          <FriendTransactionDetail
            user={user}
            selectedFriend={selectedFriend}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
             toggleSidebar={toggleSidebar}
            setIsFriendSelected={setIsFriendSelected}
            setSelectedFriend={setSelectedFriend}
          />
        ) : (
          <div className="default-right h-[88.3%] border border-gray-400 shadow-inner-custom w-full bg-gray-200 flex flex-col items-center justify-center p-2">
            {/* Hide friend icon on sm and md screens */}
            <div className="mb-4 sm:hidden md:hidden lg:block">
              <img src={friendicon || "/placeholder.svg"} alt="Friend Icon" className="w-24 h-24" />
            </div>
            {/* Adjust text size for different screen sizes */}
            <h2 className="text-lg sm:text-xs md:text-sm lg:text-lg text-gray-800 text-center">
              <b>Select any friend to view details</b>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideDashBoard;