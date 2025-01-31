import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddFriendModal from "../Modals/AddFriendModal"
import moment from "moment"
import "../CssStyle/GroupDashboard.css"
import FriendRequestModal from "../Modals/FriendRequestModal"
import { apiClient } from "../Api/ApiClient"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import ProfileCircle from "../utils/ProfileCircle"
function LeftSideDashBoard({
  user,
  friends,
  setIsFriendSelected,
  setSelectedFriend,
  refreshFriendTransaction,
  setRefreshFriendTransaction,
  friendRequestCount,
  isOpen,
  toggleSidebar,
}) {
  const location = useLocation()
  const [isModalOpen, setModalOpen] = useState(false)

  const [getAmount, setGetAmount] = useState(0)
  const [giveAmount, setGiveAmount] = useState(0)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const [filterName, setFilterName] = useState("All")

  const [filteredFriends, setFilteredFriends] = useState([])
  const [filterCriteria, setFilterCriteria] = useState("All")

  const [sortCriteria, setSortCriteria] = useState("Most Recent") // e.g., "By Type", "By Date", "By Name"
  const [isFriendRequestModalOpen, setIsFriendRequestModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState("")

  const toggleFriendRequestModal = () => {
    setIsFriendRequestModalOpen(!isFriendRequestModalOpen)
    setRefreshFriendTransaction(!refreshFriendTransaction)
  }
  const applyFilter = (criteria) => {
    setFilteredFriends([])
    setFilterCriteria(criteria)

    function calculateYouWillGet(friends) {
      return friends.filter((friend) => friend.closingBalance > 0)
    }

    function calculateYouWillGive(friends) {
      return friends.filter((friend) => friend.closingBalance < 0)
    }

    function calculateSettled(friends) {
      return friends.filter((friend) => friend.closingBalance === 0)
    }

    let sortedFriends = []

    switch (criteria) {
      case "You Will Get":
        sortedFriends = calculateYouWillGet(friends)
        break
      case "You Will Give":
        sortedFriends = calculateYouWillGive(friends)
        break
      case "Settled":
        sortedFriends = calculateSettled(friends)
        break
      default:
        sortedFriends = friends
        break
    }
    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase()
      setSearchQuery(query)

      // Filter friends based on the search query and any applied filters
      const filtered = friends.filter((friend) => {
        const nameMatch = friend.userEntity.fullName.toLowerCase().includes(query)
        const balanceMatch = friend.closingBalance.toString().includes(query)
        return nameMatch || balanceMatch
      })

      // Apply the current filter criteria to the search results
      const finalFiltered = applyFilterLogic(filtered)

      setFilteredFriends(finalFiltered)
    }

    // Function to reapply filter logic to search results
    const applyFilterLogic = (list) => {
      switch (filterCriteria) {
        case "You Will Get":
          return list.filter((friend) => friend.closingBalance > 0)
        case "You Will Give":
          return list.filter((friend) => friend.closingBalance < 0)
        case "Settled":
          return list.filter((friend) => friend.closingBalance === 0)
        default:
          return list
      }
    }

    setFilteredFriends(sortedFriends)
    setIsFilterOpen(false) // Close the dropdown after selection
  }

  const sortItems = (criteria) => {
    const sorted = [...filteredFriends] // Assuming `filteredFriends` is the filtered array

    if (criteria === "Most Recent") {
      sorted.sort((a, b) => new Date(b.lastTransactionDate) - new Date(a.lastTransactionDate)) // Sort by newest date first
    } else if (criteria === "Oldest") {
      sorted.sort((a, b) => new Date(a.lastTransactionDate) - new Date(b.lastTransactionDate)) // Sort by oldest date first
    } else if (criteria === "Highest Amount") {
      sorted.sort((a, b) => b.closingBalance - a.closingBalance) // Sort by highest amount first
    } else if (criteria === "Lowest Amount") {
      sorted.sort((a, b) => a.closingBalance - b.closingBalance) // Sort by lowest amount first
    } else if (criteria === "By Name") {
      sorted.sort((a, b) => a.userEntity.fullName.localeCompare(b.userEntity.fullName)) // Sort alphabetically by name
    }

    setFilteredFriends(sorted)
    console.log("Filter friend sorted on the basis of")
    // Update the filtered items with the sorted array
  }
  // let ListToApplySearch = [...filteredFriends];

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
    if (query !== "") {
      const filtered = filteredFriends.filter((friend) => {
        const nameMatch = friend.userEntity.fullName.toLowerCase().includes(query)
        const balanceMatch = friend.closingBalance.toString().includes(query)
        return nameMatch || balanceMatch
      })

      setFilteredFriends(filtered)
    } else {
      setFilteredFriends(friends)
    }
  }

  const handleSort = (criteria) => {
    setSortCriteria(criteria) // Store the current sorting criteria
    sortItems(criteria) // Apply sorting
    toggleSortDropdown()
  }

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen)
  }
  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const handleAddFriendClick = () => {
    toggleModal() // Open the modal
  }
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleRowClick = (friend) => {
    setSelectedFriend(friend.userEntity)
    setIsFriendSelected(true)
    if (window.innerWidth < 1024) {
      toggleSidebar() // Close the left sidebar on mobile when a friend is selected
    }
  }

  useEffect(() => {
    calculateAmount(friends)
    applyFilter(filterCriteria)
  }, [user, friends, refreshFriendTransaction, filterCriteria]) // Added filterCriteria to dependencies

  function calculateAmount(friendList) {
    let totalGetAmount = 0
    let totalGiveAmount = 0

    friendList.forEach((friend) => {
      if (friend.closingBalance > 0) {
        totalGetAmount += friend.closingBalance
      } else {
        totalGiveAmount -= friend.closingBalance
      }
    })

    setGetAmount(totalGetAmount)
    setGiveAmount(totalGiveAmount)
  }
  useEffect(() => {
    setUserId(user.userId)
  }, [user])

  if (!user) {
    return
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.get("/api/reports/whole-transaction", {
        params: {
          userId,
        },
        responseType: "blob", // Ensures the response is handled as a binary file
      })

      // Create a Blob from the response
      const blob = new Blob([response.data], { type: "application/pdf" })

      // Generate a URL for the Blob
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)

      // Extract filename from Content-Disposition header (if available)
      const contentDisposition = response.headers["content-disposition"]
      let filename = user.fullName + "Transaction report.pdf"
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/)
        if (match && match[1]) {
          filename = match[1]
        }
      }

      // Set the filename and trigger download
      link.download = filename
      link.click()

      setLoading(false)
    } catch (err) {
      setError("Failed to download the report. Please try again.")
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={`left-side rounded h-screen lg:w-full relative overflow-hidden transition-all duration-300 ${isOpen ? "translate-x-0" :  "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Toggle button for mobile */}
        {/* <button onClick={toggleSidebar} className="lg:hidden absolute top-2 right-2 bg-gray-200 p-2 rounded-full">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

        <div className="left-upper sm:font-normal justify-between h-32 w-full">
          <div className="flex px-2 shadow-inner-custom items-center gap-1 justify-between border border-gray-300 sm:h-10  h-12 bg-gray-300">
            <div className="p-2 flex-shrink sm:font-sm  font-semibold">
              You'll Give:
              <span className="text-rose-600 font-sm "> ₹{giveAmount}</span>
            </div>
            <div className="p-2 flex-shrink font-semibold">
              You'll Get:
              <span className="text-green-900 font-semibold"> ₹{getAmount}</span>
            </div>
            <div className="w-[30%] h-[100%] p-1">
              {/* view report  */}
              <button
                onClick={handleDownload}
                className="bg-rose-600  text-white font-bold py-1 px-4 flex items-center justify-center hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-sm shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faDownload} />
                </span>{" "}
                <span className=" line-clamp-1"> {loading ? "Downloading..." : "View Report"} </span>
              </button>
            </div>
          </div>

          <div className="text-sm  py-1 sm:py-3  bg-gray-300 justify-between flex h-32 relative gap-2">
            {/* searchfrined */}
            <div className="search-box w-[40%]  h-full p-2">
              <p className="p-1 line-clamp-1">Search Friend</p>

              <input
                type="text"
                placeholder="Search..."
                className="w-full  sm:h-7 h-10 pb-1 px-3 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {/* filter */}

            <div className="filter-section w-[30%]  h-full  relative p-2 ">
              <p className="p-1">Filter</p>
              <button
                onClick={toggleFilterDropdown}
                className="   h-10 border justify-between border-gray-500  sm:h-7  text-white bg-gray-500 hover:bg-gray-700   font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 "
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
                <div className="z-50 mt-1 absolute bg-white divide-y divide-gray-100  w-[90%] dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {["All", "You Will Get", "You Will Give", "Settled"].map((criteria) => (
                      <li key={criteria}>
                        <button
                          onClick={() => applyFilter(criteria)}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {criteria}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

           {/* shortBy */}

            <div className="sort-section  text-black h-full w-[30%]  relative p-2">
              <p className="p-1">Sort By</p>

              <button
                onClick={toggleSortDropdown}
                className="w-full line-clamp-1  h-10 justify-between  border-gray-500 sm:h-7   text-white bg-gray-500 hover:bg-gray-700   font-medium rounded-sm text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 "
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
                <div className="z-50 mt-1  absolute bg-white divide-y divide-gray-100 rounded-sm shadow w-[90%] dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <p
                        onClick={() => handleSort("Most Recent")}
                        className="block line-clamp-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
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

        {/* centerbox */}

        <div className="h-[73%]  border border-gray-500 shadow-inner-custom w-full bg-gray-400 relative  ">
          <table className="w-full  border-separate border-spacing-y-1 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky  border  shadow-inner-custom  top-0 bg-gray-50 dark:bg-gray-100 text-xs text-gray-400 uppercase dark:text-gray-800">
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
                  key={friend.userEntity.userId}
                  className={`bg-white border-b border-1 shadow-inner-custom rounded-sm  dark:border-gray-100 cursor-pointer ${
                    selectedRowId === friend.userEntity.userId
                      ? "bg-gray-300 dark:bg-gray-300"
                      : "bg-gray-100 dark:bg-gray-100"
                  }`}
                  onClick={() => handleRowClick(friend)} // Pass `userEntity` here
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
                    <ProfileCircle
                      className="h-8 w-8 mr-4"
                      key={friend.userEntity.userId}
                      name={friend.userEntity.fullName}
                      color={friend.userEntity.colorHexValue} // Pass the user's associated color
                    />

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{friend.userEntity.fullName}</span>
                      <span className="text-xs text-gray-800">
                        {friend.lastTransactionDate ? moment(friend.lastTransactionDate).fromNow() : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right pr-[25px]">
                    <div className="flex flex-col">
                      <span
                        className={` font-semibold  ${friend.closingBalance >= 0 ? "text-green-500 " : "text-red-500"}`}
                      >
                        ₹ {Math.abs(friend.closingBalance)}
                      </span>

                      <span className="text-xs text-gray-800">
                        {friend.closingBalance != null && friend.closingBalance >= 0 ? "You will get" : "You will give"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       {/* leftlower */}

        <div className="left-side-lower  font-Poppins sm:text-xs gap-1  justify-evenly   border-none sm:text-wrap md:text-xs border-gray-400  w-full lg:gap-4  text-wrap bg-gray-300 p-2 bottom-20 sm:bottom-6 absolute h-[50px] flex items-center ">
          <button
            onClick={handleAddFriendClick}
            className="w-1/4 shadow-inner-custom h-full bg-cyan-700 text-sm text-white 600    hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium  px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          > 
            Add Friend
          </button>

          <AddFriendModal
            user={user}
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
          />
          <button
            onClick={toggleFriendRequestModal}
            className="relative w-1/2 h-full  bg-green-800 text-sm text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium  px-0.5 py-0.5 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="h-6 w-6  absolute -right-2 -top-2 border border-white flex items-center justify-center  bg-orange-500 text-white text-xs font-bold shadow-sm">
              {friendRequestCount}
            </div>
            View Friend Request
          </button>

          <FriendRequestModal
            refreshFriendTransaction={refreshFriendTransaction}
            setRefreshFriendTransaction={setRefreshFriendTransaction}
            user={user}
            isOpen={isFriendRequestModalOpen}
            toggleModal={toggleFriendRequestModal}
          />
        </div>
      </div>
    </>
  )
}

export default LeftSideDashBoard

