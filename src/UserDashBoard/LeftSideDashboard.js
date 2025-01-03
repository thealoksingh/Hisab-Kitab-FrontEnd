import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddFriendModal from "../Modals/AddFriendModal";

function LeftSideDashBoard({ setIsFriendSelected, setSelectedFriend }) {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleAddFriendClick = () => {
    toggleModal(); // Open the modal
  };

  const handleRowClick = (friend) => {
    setIsFriendSelected(true); // Update `isFriendSelected` to true
    setSelectedFriend(friend); // Set the selected friend's details
  };

  return (
    <>
      <div className="left-side rounded bg-slate-200 w-[50%] min-h-[100vh] relative overflow-hidden">
        <div className="left-upper h-[20%] bg-slate-300 w-[100%] relative">
          <div className="flex h-[30%] relative bg-slate-400">
            <div className="w-[35%] h-[100%] p-2">
              You'll Give:<span className="text-rose-600"> $5000</span>
            </div>
            <div className="w-[35%] h-[100%] p-2">
              You'll Get:<span className="text-green-900"> $8000</span>
            </div>
            <div className="w-[30%] h-[100%] p-1">
              <button className="bg-rose-600 text-white font-bold py-1 px-4 rounded-[4px] flex items-center justify-center">
                <span className="mr-2">^</span> View Report
              </button>
            </div>
          </div>
          <div className="flex h-[30%] relative">
            <div className="w-[35%] h-[100%] p-2"> Search Friend</div>
            <div className="w-[35%] h-[100%] p-2"> Filter</div>
            <div className="w-[30%] h-[100%] p-2">Sort By</div>
          </div>
          <div className="flex h-[30%] relative">
            <div className="w-[35%] h-[100%] p-2 flex items-center justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-[35%] h-[100%] p-2 relative"></div>
            <div className="w-[30%] h-[100%] p-2 "></div>
          </div>
        </div>

        <div className="left-side-middle min-h-64 bg-slate-100 w-[100%] relative">
          <div className="relative overflow-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="sticky bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  onClick={() =>
                    handleRowClick({
                      name: "Alok Singh",
                      date: "17/10/23",
                      amount: "23$",
                      type: "you'll get",
                    })
                  }
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
                    <span className="inline-block w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-3">
                      A
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        Alok Singh
                      </span>
                      <span className="text-xs text-white">17/10/23</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right pr-[25px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">23$</span>
                      <span className="text-xs text-white">you'll get</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="left-side-lower w-full bottom-4 absolute h-[50px] flex items-center justify-center">
          <button
            onClick={handleAddFriendClick}
            className="block text-white w-96 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Friend
          </button>

          <AddFriendModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
      </div>
    </>
  );
}

export default LeftSideDashBoard;
