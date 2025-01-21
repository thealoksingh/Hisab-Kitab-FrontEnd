import react from "react";

function HelpAndSupport({ isOpen, toggleModal }) {
  
  return (
    <div
      id="add-friend-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form-add-frnd border border-gray-400 shadow-inner-custom relative bg-white w-1/2 h-1/3 rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2 rounded-sm bg-teal-600">
            <h4 className="text-lg font-semibold text-gray-200">
              Help & Support{" "}
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-teal-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-teal-600 dark:hover:text-white"
              onClick={toggleModal}
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">

          <div className=" mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
               Title :
              </label>
              <input
                name="title"
                type="text"
                id="title"
               
                className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                placeholder="Enter title here"
                
              />
            </div>
            <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
               Description :
              </label>
              <textarea
                name="issue"
                id=""
                className="w-full h-32 input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2 text-left"
                placeholder="Please describe the issue. We're always here for you."
              />
            </div>

            <div className="mb-2 flex gap-4">
              <button
              
                className="w-1/3 bg-teal-600 text-white rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 "
              >
                Submit
              </button>
              <button
                onClick={
                    toggleModal
                  }
                className="w-1/3 bg-rose-600 text-white rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HelpAndSupport;
