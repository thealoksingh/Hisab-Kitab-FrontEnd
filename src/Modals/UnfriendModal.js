import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../CssStyle/GroupDashboard.css";
import { unFriend } from "../Redux/Thunk";
import { showSnackbar } from "../Redux/SanckbarSlice";

const UnfriendModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { friendId } = useParams();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Only show modal if action is 'unfriend'
  const isOpen = friendId && action === "unfriend";
  if (!isOpen) return null;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUnfriend = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true);

    if (!isChecked) {
      alert("Please confirm by checking the box.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await dispatch(unFriend(friendId));
      // console.log("Unfriend successful ", response.data);
      if (unFriend.fulfilled.match(response)) {
        await dispatch(showSnackbar({
          message: response?.payload?.message || "Unfriended successfully",
          type: "success",
        }));
        navigate('/user-dashboard/friends'); // Navigate back to the previous page
      } else {
        console.error("Unfriend failed:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error while unfriending", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="UpdateFriendTransaction-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50  flex items-center justify-center bg-gray-500 bg-opacity-70 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full sm:w-1/2 md:w-1/2 max-w-5xl flex gap-4 justify-center transform transition-transform duration-500">
        <div className="form-give-got border border-gray-400 shadow-inner-custom relative bg-white w-full h-1/2 rounded-sm shadow dark:bg-gray-300">
          <div className="flex border-black-400 items-center justify-between p-1 md:p-2 rounded-sm bg-rose-500 dark:border-gray-700">
            <h4 className="text-lg font-xs sm:font-medium  text-white">
              Alert !!!
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-rose-700 hover:text-rose-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-rose-600 dark:hover:text-white"
              onClick={() => navigate(-1)} // Close modal on button click
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only black ">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            {/* the GIF */}
            <div className="flex justify-center mb-4">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG5qajA3aGpsYzBoZWFzN2U2eno5c2FpOXc2ZGY5bTUyNmV5Ymp6dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je3fAJ02BkvLYEE/giphy.gif"
                alt="Unfriend Gif"
                className="w-full h-full rounded-sm object-contain"
              />
            </div>

            <div className="mb-2  font-semibold justify-center align-center sm:mb-4">
              <div className="flex gap-3 mt-1 p-2   sm:border-none border-none">
                <label
                  htmlFor="description"
                  className="block mb-2 font-Poppins text-xs font-medium text-gray-900 dark:text-black"
                >
                  Are you sure ?
                </label>
                <input
                  type="checkbox"
                  id="unfriend-confirmation"
                  name="unfriend-confirmation"
                  className="form-radio-button-shadow mb-1 text-gray-400 dark:text-white"
                  required
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange();
                  }} // Prevents the event from bubbling
                />
                <label className="   font-Poppins   text-xs font-medium items-center text-white-900 dark:text-black">
                  Yes
                </label>
              </div>
            </div>

            <div className="mb-2 flex flex-wrap  justify-start font-Poppins sm:text-xs text-xs gap-2 sm:gap-4">
              <button
                onClick={(e) => handleUnfriend(e)}
                type="button"
                className="text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 rounded-sm px-3 py-2 sm:px-4 sm:py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-3 border-t-4 border-white rounded-full animate-spin"></div>
                    <div className="font-semibold ml-2 text-xs">loading..</div>
                  </div>
                ) : (
                  "Unfriend"
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1); // Close modal on button click
                }}
                type="button"
                className="text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 rounded-sm px-3 py-2 sm:px-4 sm:py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UnfriendModal;
