import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFriendList } from "../Api/HisabKitabApi";
import LeftSideDashBoard from "./LeftSideDashboard";
import RightSideDashBoard from "./RightSideDashboard";
// import GroupDashBoard from './GroupDashBoard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faGear,
  faPeoplePulling,
  faPeopleGroup,
  faBook,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const user = location.state?.user;
  const [refreshFriendTransaction, setRefreshFriendTransaction] =
    useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;

      try {
        console.log("friendlist api called");
        const response = await getFriendList(user.userId);
        console.log(response.data);
        setFriends(response.data.friendList); // Assuming the data is in response.data.friendList
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFriends();
  }, [user, refreshFriendTransaction]);

  return (
    <>
      {/* navigation started  */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon
                  className="text-white "
                  style={{ fontSize: "25px " }}
                  icon={faCalculator}
                />
                <span class="ms-3">Hisab Kitab</span>
                
              </a>
            </li>
            <li>
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white "
                  style={{ fontSize: "25px " }}
                />
                <span class="flex-1 ms-3 whitespace-nowrap">
                  {user.fullName}
                </span>
                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
              </a>
            </li>
            <li>
              <a
                href="/user-dashboard"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faPeoplePulling}
                  className="text-white "
                  style={{ fontSize: "25px " }}
                />
                <span class="flex-1 ms-3 whitespace-nowrap">Friends</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {friends.length}
                </span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="text-white "
                  style={{ fontSize: "25px " }}
                />
                <span class="flex-1 ms-3 whitespace-nowrap">Group</span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-white "
                  style={{ fontSize: "25px " }}
                />

                <span class="flex-1 ms-3 whitespace-nowrap">
                  Personal Spend
                </span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="text-white "
                  style={{ fontSize: "25px " }}
                />
                <span class="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
            <li
               onClick={() => {
                // Clear user state (example assumes user is managed in state or context)
               try{
                user=null;
               
               }
               catch(error){
                navigate("/")
          
               }
                 
              }}
            >
              <a
                href="/"

                
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  className="text-white"
                  style={{ fontSize: "25px" }}
                  icon={faArrowRightFromBracket}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* navigation ended  */}

      <div class="h-[100]  whole-dashboard  p-2 ml-64 ">
        <div class="flex gap-2 ">
          <LeftSideDashBoard
            user={user} // Pass user data
            friends={friends} // Pass friends data
            isFriendSelected={isFriendSelected}
            setIsFriendSelected={setIsFriendSelected}
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
          />

          <RightSideDashBoard
            user={user}
            isFriendSelected={isFriendSelected}
            selectedFriend={selectedFriend}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
          />
        </div>
        {/* <GroupDashBoard/> */}
        {/* <FriendRequestModal isOpen={isOpenFriendRequestModal} toggleModal={closeFriendRequestModal}/> */}
      </div>
    </>
  );
};
export default UserDashboard;
