import {
  faAddressCard,
  faArrowRightFromBracket,
  faBars,
  faBook,
  faClipboardQuestion,
  faEnvelope,
  faGear,
  faMapLocationDot,
  faPeopleGroup,
  faPeoplePulling,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { selectFriends, selectUser } from "../Redux/Selector";
import { getAllFriends, logout } from "../Redux/Thunk";

import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import logo from "../assets/logo-hisab-kitab.png";
import "../CssStyle/LoaderStyle.css";
import HelpAndSupport from "../Modals/HelpAndSupport";
import InviteModal from "../Modals/InviteModal";
import Snackbar from "../utils/Snackbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
const getAccessToken = () => localStorage.getItem('accessToken');
  const user = useSelector(selectUser);
  console.log("user id",user?.userId);
  const friends = useSelector(selectFriends);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isHelpAndSupportOpen, setIsHelpAndSupportOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const globalNavToggler = () => isSidebarOpen && setIsSidebarOpen(false);
  const toggleInvite = () => setIsInviteOpen(!isInviteOpen);
  const toggleHelpAndSupport = () => setIsHelpAndSupportOpen(!isHelpAndSupportOpen);


  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch {
      navigate("/");
    }
  };

  useEffect(() => {
    // Call getAllFriends when component mounts or when URL is /user-dashboard/friends
    if (location.pathname === "/user-dashboard/friends") {
      dispatch(getAllFriends());
    }
  }, [dispatch, location.pathname]);

  const sidebarItems = [
    {
      label: "Friends",
      icon: faPeoplePulling,
      path: "/user-dashboard/friends",
      badge: true,
    },
    {
      label: "Group",
      icon: faPeopleGroup,
      path: "/user-dashboard/under-dev", // Update if group path is different
    },
    {
      label: "Personal Spend",
      icon: faBook,
      path: "/user-dashboard/under-dev",
    },
    {
      label: "Settings",
      icon: faGear,
      path: "/user-dashboard/under-dev",
      animate: true,
    },
    {
      label: "Invite",
      icon: faEnvelope,
      onClick: toggleInvite,
    },
    {
      label: "About",
      icon: faAddressCard,
      path: "/user-dashboard/about",
    },
    {
      label: "Help & Support",
      icon: faClipboardQuestion,
      onClick: toggleHelpAndSupport,
    },
    {
      label: "Sign Out",
      icon: faArrowRightFromBracket,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 lg:bg-gray-800 bg-gray-50 border rounded-sm border-gray-800 text-white transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 h-auto lg:h-full`}
        role="navigation"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Logo */}
            <li>
              <a
                href="/user-dashboard"
                className="flex items-center p-2 lg:text-gray-300 text-black lg:hover:bg-gray-700 group"
              >
                <img src={logo || "/placeholder.svg"} alt="Hisab Kitab Logo" className="w-6 h-6" />
                <span className="ms-3">
                  <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter lg:invert lg:brightness-200"
                  />
                </span>
              </a>
            </li>

            {/* User Info */}
            <li>
              <div className="flex items-center p-2 lg:text-gray-300 text-black rounded-sm border lg:border-0 border-gray-400 group">
                <FontAwesomeIcon icon={faUser} className="lg:text-gray-300 text-gray-600" style={{ fontSize: "25px" }} />
                <span className="flex-1 ms-3 whitespace-nowrap">{user?.fullName}</span>
              </div>
            </li>

            {/* Sidebar Items */}
            {sidebarItems.map((item, idx) => {
              const isActive = item.path && location.pathname.startsWith(item.path);
              return (
                <li key={idx} onClick={() => item.onClick ? item.onClick() : navigate(item.path)}>
                  <div
                    className={`flex items-center p-2 rounded-sm border lg:border-0 group transition-all duration-200 cursor-pointer ${isActive
                        ? "bg-yellow-100 border border-yellow-400 text-yellow-800"
                        : "lg:text-gray-300 text-black lg:hover:bg-gray-700"
                      }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`${isActive ? "text-yellow-800" : "lg:text-gray-300 text-gray-600"
                        } ${item.animate ? "group-hover:animate-spin" : ""}`}
                      style={{ fontSize: "25px" }}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                        {friends?.length}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Tour Button */}
          <div
            onClick={() => navigate("/document")}
            className="flex items-center mt-4 px-4 py-1 font-semibold bg-red-500 text-white space-x-2 rounded-sm cursor-pointer"
          >
            <FontAwesomeIcon icon={faMapLocationDot} style={{ fontSize: "18px" }} />
            <span className="pl-4">Take a Tour</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for small screens */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </button>
            <a
              href="/user-dashboard"
              className="text-lg font-semibold text-gray-900"
            >
              <img src={hisabKitabBlack} alt="logo" className="h-8 " />
            </a>
            <div className="w-6" />
          </div>
        </header>

        {/* Routed content */}
        <div className="flex-1 overflow-y-auto bg-orange-50" onClick={globalNavToggler}>
          <Outlet context={{ globalNavToggler, setIsSidebarOpen, isSidebarOpen }} />
        </div>
      </div>

      {/* Modals */}
      
      <InviteModal isOpen={isInviteOpen} user={user} toggleModal={toggleInvite} />
      <HelpAndSupport user={user} isOpen={isHelpAndSupportOpen} toggleModal={toggleHelpAndSupport} />
    </div>
  );
};

export default UserDashboard;
