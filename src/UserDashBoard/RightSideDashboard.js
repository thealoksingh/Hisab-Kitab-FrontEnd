import React, { useState } from "react";
import friendicon from "../assets/friendicon.png";
import FriendTransactionDetail from "./FriendTransactionDetail";


function RightSideDashBoard({ user,isFriendSelected, selectedFriend ,refreshFriendTransaction, setRefreshFriendTransaction}) {

  
  return (
    <div className="right-side rounded  w-[50%] h-screen relative overflow-hidden">
      {isFriendSelected ? (
        // Render FriendTransactionDetail when a friend is selected
        <FriendTransactionDetail user={user} selectedFriend={selectedFriend} 
        refreshFriendTransaction={refreshFriendTransaction}
        setRefreshFriendTransaction={setRefreshFriendTransaction} />
      ) : (
        // Render default message when no friend is selected
        <div className="default-right h-[97.2%] border border-gray-400 shadow-inner-custom w-full h-full bg-gray-200 flex items-center justify-center">
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
