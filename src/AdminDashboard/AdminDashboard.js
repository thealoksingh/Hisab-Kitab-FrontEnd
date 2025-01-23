import React from "react";
import "../CssStyle/GroupDashboard.css";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HelpAndSupport from "../Modals/HelpAndSupport";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin-dashboard w-full h-screen ">
        <div className="navigation-bar shadow-inner-custom  h-16 w-full bg-sky-950 flex items-center justify-around">
          <h2 className="font-semibold text-white text-xl">Admin Dashboard</h2>

          <div className="nav-items h-12 w-1/2  flex items-center justify-around">
            <h4 className="font-semibold text-white text-md hover:scale-105 hover:underline  transition-all duration-300 ease-in-out">
              Manage Users
            </h4>
            <h4 className="font-semibold text-white text-md hover:scale-105 hover:underline  transition-all duration-300 ease-in-out">
              View Tickets
            </h4>
            <h4 className="font-semibold text-white text-md hover:scale-105 hover:underline  transition-all duration-300 ease-in-out">
              Send Notification
            </h4>
            <h4 className="font-semibold text-white text-md hover:scale-105 hover:underline  transition-all duration-300 ease-in-out">
              Update Transaction
            </h4>
          </div>

          <div
            onClick={() => {
              try {
                navigate("/"); //change it
              } catch (error) {
                navigate("/");
              }
            }}
            className="font-semibold text-white text-xl flex gap-4 items-center hover:scale-105 hover:underline  transition-all duration-300 ease-in-out"
          >
            <FontAwesomeIcon
              className="text-white"
              style={{ fontSize: "25px" }}
              icon={faArrowRightFromBracket}
            />
            <span>Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
