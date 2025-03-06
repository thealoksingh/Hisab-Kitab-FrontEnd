import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getFriendList } from "../Api/HisabKitabApi";
import LeftSideDashBoard from "./LeftSideDashboard";
import RightSideDashBoard from "./RightSideDashboard";
import logo from "../assets/logo-hisab-kitab.png";
import HelpAndSupport from "../Modals/HelpAndSupport";
import InviteModal from "../Modals/InviteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CssStyle/LoaderStyle.css";
import { useAuth } from "../security/AuthContext";

import hisabKitabBlack from "../assets/images/hisabkitab-black.png";

import {
  faCalculator,
  faGear,
faEnvelope,
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
  const [friendAndTransloader, setFriendAndTransLoader] = useState(false);
  const [refreshResize, setRefreshResize] = useState(false); // State to trigger manual refresh
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      setFriendAndTransLoader(true);
      if (!user) return;

      try {
        const response = await getFriendList();
        setFriends(response.data.friendList);
        setFriendRequestCount(response.data.friendRequestCount);
        setFriendAndTransLoader(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setFriendAndTransLoader(false);
      }
    };

    fetchFriends();
  }, [user, refreshFriendTransaction]);

  useEffect(() => {
    let prevWidth = window.innerWidth; // Store previous width
  
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // console.log("handleResize executed");
      // Only trigger if crossing the 1024px boundary
      if ((prevWidth < 1024 && currentWidth >= 1024) || (prevWidth >= 1024 && currentWidth < 1024)) {
        // console.log("handleResize executed at boundary");
  
        if (currentWidth >= 1024) {
          setIsSidebarOpen(true);
          setIsLeftSidebarOpen(true);
          setIsRightSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
          setIsLeftSidebarOpen(true);
          setIsRightSidebarOpen(false);
        }
  
        prevWidth = currentWidth; // Update previous width
      }
    };
  
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, [refreshResize]); // Runs when refreshResize changes
   const forceResizeCheck = () => setRefreshResize(prev => !prev)
  // Function to manually trigger a refresh

// const prevWidth = useRef(window.innerWidth);

// useEffect(() => {
//   const handleResize = () => {
//     const currentWidth = window.innerWidth;

//     // Check if the screen width crosses the 1024px boundary
//     if (
//       (prevWidth.current < 1024 && currentWidth >= 1024) ||
//       (prevWidth.current >= 1024 && currentWidth < 1024)
//     ) {
//       setRefreshResize(prev => !prev);
//     }

//     prevWidth.current = currentWidth; // Update previous width
//   };

//   window.addEventListener("resize", handleResize);

//   return () => {
//     window.removeEventListener("resize", handleResize);
//   };
// }, []); // Runs only once on mount



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
    // console.log("toggle left called")
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    if (!isLeftSidebarOpen && window.innerWidth < 1024) {
      setIsRightSidebarOpen(true);
    }
  };

  const toggleRightSidebar = () => {
    // console.log("toggle right side callled")
  
    setIsRightSidebarOpen(!isRightSidebarOpen);
    if (!isRightSidebarOpen && window.innerWidth < 1024) {
      setIsLeftSidebarOpen(true);
    }
  };

  const handleFriendSelect = (friend) => {
    // console.log("handleFriendSelect called");
    setSelectedFriend(friend);
    setIsFriendSelected(true);
  
    if (friend != null && window.innerWidth < 1024) {
      setIsRightSidebarOpen(true);
      setIsLeftSidebarOpen(false);
    }
 
  };
   const toggleInvite=()=>{
    setIsInviteOpen(!isInviteOpen);
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
              <a
                href="/user-dashboard"
                className="flex items-center p-2 lg:text-gray-300 text-black   lg:hover:bg-gray-700 group"
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Hisab Kitab Logo"
                  className="w-6 h-6 "
                />
                <span className="ms-3">
                  {" "}
                  <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter lg:invert lg:brightness-200"
                  />{" "}
                </span>
              </a>
            </li>
            <li>
              <a className="flex items-center  p-2 lg:text-gray-300 lg:bg-transparent  text-black rounded-sm  lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
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
                className="flex items-center p-2  lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group"
              >
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
                className="flex items-center text-gray-300 p-2 lg:text-gray-500 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="lg:text-gray-500 text-gray-300"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Group</span>
              </a>
            </li>
            <li>
              <a
                href="/under-dev"
                className="flex items-center p-2 lg:text-gray-500 text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="lg:text-gray-500 text-gray-300"
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
                className="flex items-center p-2 lg:text-gray-500 text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="lg:text-gray-500 text-gray-300 group-hover:animate-spin"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
            <li onClick={toggleInvite}>
              <a className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="lg:text-gray-300 text-gray-600"
                  style={{ fontSize: "25px" }}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Invite
                </span>
              </a>
            </li>
            <li onClick={toggleHelpAndSupport}>
              <a className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
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
            <li
              onClick={() => {
                // Clear user state (example assumes user is managed in state or context)
                try {
                  logout();
                } catch (error) {
                  navigate("/");
                }
              }}
            >
              <a className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 lg:hover:bg-gray-700 group">
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
        {/* {friendAndTransloader && (
          <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section "></div>
          </div>
        )} */}
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
            <a
              href="user-dashboard"
              to={"user-dashboard"}
              className="text-lg font-semibold text-gray-900"
            >
              <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8  "
                  />
            </a>
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
                className={`sm:w-1/2 h-screen md:w-[100%] m-2  ${
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
                  toggleLeftSidebar={toggleLeftSidebar}
                  friendAndTransloader={friendAndTransloader}
                />
              </div>
              <div
                className={` sm:w-1/2 md:w-full p-2 sm:pl-0  h-screen  ${
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
                  friendAndTransloader={friendAndTransloader}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
        <InviteModal
        isOpen={isInviteOpen}
        user={user}
        toggleModal={toggleInvite}/>
      <HelpAndSupport
        user={user}
        isOpen={isHelpAndSupportOpen}
        toggleModal={toggleHelpAndSupport}
      />
    </div>
  );
};

export default UserDashboard;
