import React, { useEffect, useState } from "react";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import { getFriendList } from "../Api/HisabKitabApi";
import LeftSideDashBoard from "./LeftSideDashboard";
import RightSideDashBoard from "./RightSideDashboard";
import logo from "../assets/logo-hisab-kitab.png";
import HelpAndSupport from "../Modals/HelpAndSupport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CssStyle/LoaderStyle.css";
import { useAuth } from "../security/AuthContext";
import {
  faCalculator,
  faGear,
  faClipboardQuestion,
  faPeoplePulling,
  faPeopleGroup,
  faBook,
  faUser,
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [isHelpAndSupportOpen, setIsHelpAndSupportOpen] = useState(false);
  // const user = location.state?.user;
  const [refreshFriendTransaction, setRefreshFriendTransaction] =
    useState(false);
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      setLoader(true);
      if (!user) return;

      try {
        const response = await getFriendList(user.userId);
        setFriends(response.data.friendList);
        setFriendRequestCount(response.data.friendRequestCount);
        
      } catch (err) {
        setError(err.message);
      }finally {
        setLoader(false);

      }
    };

    fetchFriends();
  }, [user, refreshFriendTransaction]);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsSidebarOpen(isLargeScreen);
      setIsLeftSidebarOpen(true);
      setIsRightSidebarOpen(isLargeScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleHelpAndSupport = () => {
    setIsHelpAndSupportOpen(!isHelpAndSupportOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const globalNavToggler = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    if (!isLeftSidebarOpen && window.innerWidth < 1024) {
      setIsRightSidebarOpen(false);
    }
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
    if (!isRightSidebarOpen && window.innerWidth < 1024) {
      setIsLeftSidebarOpen(false);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsFriendSelected(true);
    if (window.innerWidth < 1024) {
      setIsRightSidebarOpen(true);
      setIsLeftSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`fixed  top-0 left-0 z-50 w-64 lg:bg-gray-800 bg-gray-50 border rounded-sm border-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 h-auto lg:h-full `}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/user-dashboard" className="flex items-center p-2 lg:text-gray-300 text-black   lg:hover:bg-gray-700 group">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Hisab Kitab Logo"
                  className="w-6 h-6 "
                />
                <span className="ms-3">Hisab Kitab </span>
              </a>
            </li>
            <li>
              <a 
              className="flex items-center  p-2 lg:text-gray-300 lg:bg-transparent bg-teal-100 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
                <FontAwesomeIcon
                  icon={faUser}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {user.fullName}
                </span>
              </a>
            </li>
            <li>
              <a
                href="/user-dashboard"
                className="flex items-center p-2  lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
               
                <FontAwesomeIcon
                  icon={faPeoplePulling}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Friends</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  {friends.length}
                </span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
             
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Group</span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
             
                <FontAwesomeIcon
                  icon={faBook}
                   className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Personal Spend
                </span>
              </a>
            </li>
            <li className="group">
              <a
                href="/under-dev"
                className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
             
                <FontAwesomeIcon
                  icon={faGear}
                  className="lg:text-gray-300 text-gray-600 group-hover:animate-spin"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>

            <li onClick={toggleHelpAndSupport}>
              <a 
              className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
                <FontAwesomeIcon
                  icon={faClipboardQuestion}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Help & Support
                </span>
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  // Handle sign out logic here
                }}
                className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
                
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <!-- Preloader --> */}
        {loader && (
          <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section "></div>
          </div>
        )}
        {/* <!-- End Preloader --> */}

        {/* Header visible only on sm and md screens */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
            <a href="user-dashboard" to={"user-dashboard"} className="text-lg font-semibold text-gray-900">Hisab Kitab</a>
            <div className="w-6"></div> {/* Placeholder for layout balance */}
          </div>
        </header>

        <main
          onClick={globalNavToggler}
          className="flex-1 overflow-x-hidden  sm:w-full   sm:h-[100%]     overflow-y-hidden   bg-white"
        >
          <div className="max-w-7xl  sm:overflow-y-auto  ">
            <div className="flex flex-col lg:flex-row">
              <div
                className={`sm:w-1/2 md:w-[100%] m-2  ${
                  isLeftSidebarOpen ? "block" : "hidden"
                } lg:block`}
              >
                <LeftSideDashBoard
                  user={user}
                  friends={friends}
                  setIsFriendSelected={setIsFriendSelected}
                  setSelectedFriend={handleFriendSelect}
                  refreshFriendTransaction={refreshFriendTransaction}
                  setRefreshFriendTransaction={setRefreshFriendTransaction}
                  friendRequestCount={friendRequestCount}
                  isOpen={isLeftSidebarOpen}
                  toggleSidebar={toggleLeftSidebar}
                />
              </div>
              <div
                className={` sm:w-1/2 md:w-full p-2 sm:pl-0  h-[68%] sm:h-[63%]   md:h-[63%]  ${
                  isRightSidebarOpen ? "block" : "hidden"
                } lg:block`}
              >
                <RightSideDashBoard
                  user={user}
                  isFriendSelected={isFriendSelected}
                  selectedFriend={selectedFriend}
                  refreshFriendTransaction={refreshFriendTransaction}
                  setRefreshFriendTransaction={setRefreshFriendTransaction}
                  isOpen={isRightSidebarOpen}
                  setIsRightSidebarOpen={setIsRightSidebarOpen}
                  toggleRightSidebar={toggleRightSidebar}
                  toggleLeftSidebar={toggleLeftSidebar}
                  setIsFriendSelected={setIsFriendSelected}
                  setSelectedFriend={setSelectedFriend}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <HelpAndSupport
        user={user}
        isOpen={isHelpAndSupportOpen}
        toggleModal={toggleHelpAndSupport}
      />
    </div>
  );
};

export default UserDashboard;
