import React, { useEffect, useState } from "react";
import "../CssStyle/GroupDashboard.css";
import AddGroupModal from "../Modals/AddGroupModal";

const GroupDashboardLeftSection = () => {
  const [isAddGroupFormOpen, setIsAddGroupFormOpen] = useState(false);

  const toggleAddGroupForm = () => {
    setIsAddGroupFormOpen(!isAddGroupFormOpen);
  };

  return (
    <>
      <div className="w-[20%] h-[100%] flex flex-col bg-gray-200 items-center relative rounded overflow-hidden">
        <div className="text-white text-lg h-12 p-2 bg-gray-400 w-full items-center justify-center flex ">
          Your Groups
        </div>
        {/* your Groups */}
        <div className="w-full h-[83%] flex flex-col  items-center relative rounded scrollable">
          {/* Group */}
          <div className=" h-10 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className=" h-7 w-7 rounded-full bg-teal-900 items-center justify-center flex text-white ">
              A
            </div>
            <h4 className="px-4 text-sm text-white">Group Name 1.0</h4>
          </div>
          {/* Group */}
          <div className=" h-10 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className=" h-7 w-7 rounded-full bg-sky-900 items-center justify-center flex text-white ">
              A
            </div>
            <h4 className="px-4 text-sm text-white">Group Name 2</h4>
          </div>
          {/* Group */}
          <div className=" h-10 p-2 border border-gray-300 bg-gray-500 w-full items-center  flex hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className=" h-7 w-7 rounded-full bg-yellow-700 items-center justify-center flex text-white ">
              A
            </div>
            <h4 className="px-4 text-sm text-white">Group Name 3</h4>
          </div>
        </div>
        {/* Add Group Button */}
        <div className="absolute bottom-0 w-full h-[10%] p-2 flex items-center justify-center">
          <button
            onClick={toggleAddGroupForm}
            className="text-sm text-white  bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-20 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Add Group
          </button>
          <AddGroupModal
            isOpen={isAddGroupFormOpen}
            toggleModal={toggleAddGroupForm}
          />
        </div>
      </div>
    </>
  );
};

export default GroupDashboardLeftSection;
