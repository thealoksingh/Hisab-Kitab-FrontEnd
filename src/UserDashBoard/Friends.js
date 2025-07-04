// src/components/Friends.jsx (adjust path as needed)

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  selectFriendRequestCount,
  selectFriends,
  selectUser,
} from "../Redux/Selector";
import { getAllFriends } from "../Redux/Thunk";
import LeftSideDashBoard from "./LeftSideDashboard";

// import RightSideDashBoard from "./RightSideDashBoard"; // Uncomment if needed

const Friends = () => {
  const [isFriendSelected, setIsFriendSelected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [friendAndTransloader, setFriendAndTransLoader] = useState(false);
  const [refreshResize, setRefreshResize] = useState(false); // State to trigger manual refresh
  const [refreshFriendTransaction, setRefreshFriendTransaction] =
    useState(false);
  const [error, setError] = useState(null);
  const friendRequestCount = useSelector(selectFriendRequestCount);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  // Inside your component use OutletContext to access the context
  // This allows you to pass down the context to child components:
  const { setIsSidebarOpen, isSidebarOpen, globalNavToggler } = useOutletContext();

  useEffect(() => {
    const fetchFriends = async () => {
      setFriendAndTransLoader(true);
      if (!user) return;

      try {
        const response = await dispatch(getAllFriends());
        if (getAllFriends.fulfilled.match(response)) {
          console.log("Friends fetched successfully:");
        } else {
          console.log("Friends list not fetched successfully:");
        }

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
      if (
        (prevWidth < 1024 && currentWidth >= 1024) ||
        (prevWidth >= 1024 && currentWidth < 1024)
      ) {
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

  const forceResizeCheck = () => setRefreshResize((prev) => !prev);

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

  // useEffect(() => {
  //   if (!selectedFriend) {
  //     navigate("/user-dashboard/friends/instructionToSelect");
  //   }
  // }, []);


  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsFriendSelected(!!friend);

    if (friend) {
      navigate(`/user-dashboard/friends/transaction/${friend?.id}`);
      // if (window.innerWidth < 1024) {
      //   setIsRightSidebarOpen(true);
      //   setIsLeftSidebarOpen(false);
      // }
    } else {
      navigate("/user-dashboard/friends/instructionToSelect");
    }
  };



  return (
    <main
      onClick={globalNavToggler}
      className="flex-1 overflow-x-hidden sm:w-full sm:h-[100%] overflow-y-hidden bg-white"
    >
      <div className="max-w-7xl sm:overflow-y-auto">
        <div className="flex flex-col lg:flex-row">
          <div
            className={`sm:w-1/2 h-screen md:w-[100%] m-2 ${isLeftSidebarOpen ? "block" : "hidden"
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
            className={`sm:w-1/2 md:w-full p-2 sm:pl-0 h-screen ${isRightSidebarOpen ? "block" : "hidden"
              } lg:block`}
          >
            <Outlet />
            {/* <FriendTranscationDetail
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
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Friends;
