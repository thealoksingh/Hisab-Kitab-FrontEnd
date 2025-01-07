
import React, { useState } from "react";
import LeftSideDashBoard from "./LeftSideDashboard";
import RightSideDashBoard from "./RightSideDashboard";

function FriendSectionDashboard(user ,friends) {

  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  
    return (
<>
     <div class=" whole-dashboard p-2 ml-64">
        <div class="flex gap-2 ">
          <LeftSideDashBoard
            user={user} // Pass user data
            friends={friends} // Pass friends data
            isFriendSelected={isFriendSelected}
            setIsFriendSelected={setIsFriendSelected}
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
          />

          <RightSideDashBoard
            user={user}
            isFriendSelected={isFriendSelected}
            selectedFriend={selectedFriend}
          />
        </div>
      </div>

</>
    );

}
    export default FriendSectionDashboard;