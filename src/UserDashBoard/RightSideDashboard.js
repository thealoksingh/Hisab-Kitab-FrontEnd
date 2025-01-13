import React, { useState } from "react";
import friendicon from "../assets/friendicon.png";
import FriendTransactionDetail from "./FriendTransactionDetail";
import { getTransactionDetailsWithFriend } from "../Api/HisabKitabApi";


function RightSideDashBoard({ user,isFriendSelected, selectedFriend ,refreshFriendTransaction, setRefreshFriendTransaction}) {

  if(!selectedFriend){
    return null;
  }
  return (
    <div className="right-side flex items-center justify-center rounded  w-[50%] min-h-full relative overflow-hidden">
      {isFriendSelected ? (
        // Render FriendTransactionDetail when a friend is selected
        <FriendTransactionDetail user={user} selectedFriend={selectedFriend} 
        refreshFriendTransaction={refreshFriendTransaction}
        setRefreshFriendTransaction={setRefreshFriendTransaction} />
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
