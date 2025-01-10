import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddFriendModal from "../Modals/AddFriendModal";
import moment from "moment";
import "../CssStyle/GroupDashboard.css";
import FriendRequestModal from "../Modals/FriendRequestModal";
function LeftSideDashBoard({
  user,
  friends,
  setIsFriendSelected,
  setSelectedFriend,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
}) {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const [getAmount, setGetAmount] = useState(0);
  const [giveAmount, setGiveAmount] = useState(0);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [filterName, setFilterName] = useState("All");

  const [filteredFriends, setFilteredFriends] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("All");

  const [sortCriteria, setSortCriteria] = useState("Most Recent"); // e.g., "By Type", "By Date", "By Name"
  const [isFriendRequestModalOpen, setIsFriendRequestModalOpen] = useState(false);

   const toggleFriendRequestModal=()=>{
    setIsFriendRequestModalOpen(!isFriendRequestModalOpen);
   };
  const applyFilter = (criteria) => {
    setFilteredFriends([]);
    setFilterCriteria(criteria);

    function calculateYouWillGet(friends) {
      return friends.filter((friend) => friend.closingBalance > 0);
    }

    function calculateYouWillGive(friends) {
      return friends.filter((friend) => friend.closingBalance < 0);
    }

    function calculateSettled(friends) {
      return friends.filter((friend) => friend.closingBalance === 0);
    }

    let sortedFriends = [];

    switch (criteria) {
      case "You Will Get":
        sortedFriends = calculateYouWillGet(friends);
        break;
      case "You Will Give":
        sortedFriends = calculateYouWillGive(friends);
        break;
      case "Settled":
        sortedFriends = calculateSettled(friends);
        break;
      default:
        sortedFriends = friends;
        break;
    }

    setFilteredFriends(sortedFriends);
    setIsFilterOpen(false); // Close the dropdown after selection
  };

  const sortItems = (criteria) => {
    let sorted = [...filteredFriends]; // Assuming `filteredFriends` is the filtered array

    if (criteria === "Most Recent") {
      sorted.sort((a, b) => new Date(b.lastTransactionDate) - new Date(a.lastTransactionDate)); // Sort by newest date first
    } else if (criteria === "Oldest") {
      sorted.sort((a, b) => new Date(a.lastTransactionDate) - new Date(b.lastTransactionDate)); // Sort by oldest date first
    } else if (criteria === "Highest Amount") {
      sorted.sort((a, b) => b.closingBalance - a.closingBalance); // Sort by highest amount first
    } else if (criteria === "Lowest Amount") {
      sorted.sort((a, b) => a.closingBalance - b.closingBalance); // Sort by lowest amount first
    } else if (criteria === "By Name") {
      sorted.sort((a, b) => a.userEntity.fullName.localeCompare(b.userEntity.fullName)); // Sort alphabetically by name
    }

    setFilteredFriends(sorted);
    console.log("Filter friend sorted on the basis of")
    // Update the filtered items with the sorted array
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria); // Store the current sorting criteria
    sortItems(criteria); // Apply sorting
    toggleSortDropdown();
  };






  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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

  useEffect(() => {
    calculateAmount(friends);
    applyFilter(filterCriteria);
  }, [user, friends, refreshFriendTransaction]); // Dependency array ensures the function runs whenever `friendList` changes

  function calculateAmount(friendList) {
    let totalGetAmount = 0;
    let totalGiveAmount = 0;

    friendList.forEach((friend) => {
      if (friend.closingBalance > 0) {
        totalGetAmount += friend.closingBalance;
      } else {
        totalGiveAmount -= friend.closingBalance;
      }
    });

    setGetAmount(totalGetAmount);
    setGiveAmount(totalGiveAmount);
  }

  // useEffect(() => {
  //   // Run applyFilter with "ALL" when the component first renders
  //   applyFilter(filterCriteria);
  // }, [user]); // Empty dependency array ensures it runs only on initial render




  return (
    <>
      <div className="left-side rounded  w-[50%] min-h-[100vh] relative overflow-hidden  ">
        <div className="left-upper h-[20%] bg-slate-300 w-[100%] relative">
          <div className="flex h-[30%] relative bg-slate-400">
            <div className="w-[35%] h-[100%] p-2">
              You'll Give:<span className="text-rose-600"> ${giveAmount}</span>
            </div>
            <div className="w-[35%] h-[100%] p-2">
              You'll Get:<span className="text-green-900"> ${getAmount}</span>
            </div>
            <div className="w-[30%] h-[100%] p-1">
              <button className="bg-rose-600 text-white font-bold py-1 px-4 rounded-[4px] flex items-center justify-center">
                <span className="mr-2">^</span> View Report
              </button>
            </div>
          </div>
          <div className="flex h-[60%] relative gap-2">
            <div className="search-box w-[35%] h-[100%] p-2">
              <h4 className="">Search Friend</h4>
              <div className=" h-[100%]  flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-10 px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="filter-section w-[30%] h-[100%]   relative p-2 ">
              <h4 className="">Filter</h4>
              <button
                onClick={toggleFilterDropdown}
                className="absolute bottom-0 w-[90%] h-10 text-white bg-gray-200 hover:bg-gray-700   font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 "
                type="button"
              >
                {filterCriteria}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isFilterOpen && (
                <div className="z-50 mt-[30%] absolute bg-white divide-y divide-gray-100 rounded-sm shadow w-[90%] dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {["All", "You Will Get", "You Will Give", "Settled"].map((criteria) => (
                      <li key={criteria}>
                        <button
                          onClick={() => applyFilter(criteria)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {criteria}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>)}
            </div>
            <div className="sort-section w-[30%] h-[100%]   relative p-2">
              <h4 className="">Sort By</h4>

              <button
                onClick={toggleSortDropdown}
                className="absolute bottom-0 w-[90%] h-10 text-white bg-gray-200 hover:bg-gray-700   font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 "
                type="button"
              >
                {sortCriteria}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isSortOpen && (
                <div className="z-50 mt-[30%] absolute bg-white divide-y divide-gray-100 rounded-sm shadow w-[90%] dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <p
                        onClick={() => handleSort("Most Recent")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        Most Recent
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => handleSort("Oldest")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        Oldest
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => handleSort("Highest Amount")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        Highest Amount
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => handleSort("Lowest Amount")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        Lowest Amount
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => handleSort("By Name")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        By Name
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[70%] w-[100%] g-slate-300 relative scrollable">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 uppercase dark:text-gray-400">
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
              {filteredFriends.map((friend) => (
                <tr
                  key={friend.userEntity.userId} // Use userId as key for each row
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleRowClick(friend.userEntity)}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
                    <span className="inline-block w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-3">
                      {friend.userEntity.fullName[0].toUpperCase()}{" "}
                      {/* First letter of name for avatar */}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {friend.userEntity.fullName}
                      </span>
                      <span className="text-xs text-white">
                        {friend.lastTransactionDate
                          ? moment(friend.lastTransactionDate).fromNow()
                          : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right pr-[25px]">
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${friend.closingBalance >= 0
                          ? "text-green-500"
                          : "text-red-500"
                          }`}
                      >
                        {Math.abs(friend.closingBalance)}
                      </span>

                      <span className="text-xs text-white">
                        {friend.closingBalance != null &&
                          friend.closingBalance >= 0
                          ? "You will get"
                          : "You will give"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="left-side-lower w-full gap-4 bg-slate-200 p-2 bottom-4 absolute h-[50px] flex items-center justify-center">
       

            <button onClick={handleAddFriendClick} className="w-1/3  h-full bg-cyan-600 text-sm text-white 600    hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
            Add Friend       
            
          </button>
          

          <AddFriendModal
            userId={user.userId}
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
          />
          <button onClick={toggleFriendRequestModal} className="w-1/3  h-full bg-teal-600 text-sm text-white 600    hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                   
          View Friend Request
                 </button>

              <FriendRequestModal isOpen={isFriendRequestModalOpen} toggleModal={toggleFriendRequestModal}/>
        </div>
      </div>
    </>
  );
}

export default LeftSideDashBoard;
