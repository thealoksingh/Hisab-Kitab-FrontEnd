import React from "react";
import friendicon from "../assets/friendicon.png";
import FriendTransactionDetail from "./FriendTransactionDetail";

function RightSideDashBoard({ isFriendSelected, selectedFriend }) {
  return (
    <div className="right-side flex items-center justify-center rounded bg-slate-300 w-[50%] min-h-full relative overflow-hidden">
      {isFriendSelected ? (
        // Render FriendTransactionDetail when a friend is selected
        <FriendTransactionDetail selectedFriend={selectedFriend} />
      ) : (
        // Render default message when no friend is selected
        <div className="default-right">
          <div className="ml-24">
            <img src={friendicon} alt="Friend Icon" className="w-24 h-24" />
          </div>
          <br />
          <h2 className="ml-4 text-lg text-gray-800">
            <b>Select any friend to view details</b>
          </h2>
        </div>
      )}
    </div>
  );
}

export default RightSideDashBoard;
