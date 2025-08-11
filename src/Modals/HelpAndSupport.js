import React, { useState, useEffect } from "react";

import "../CssStyle/GroupDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTicketApi } from "../Api/HisabKitabApi";
import { useDispatch } from "react-redux";
import { createTicket, getAllTickets } from "../Redux/Thunk";
import { showSnackbar } from "../Redux/SanckbarSlice";

function HelpAndSupport({ user, isOpen, toggleModal }) {
  const [choice, setChoice] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isRefreshTicket, setRefreshTicket] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isTicketsLoading, setTicketsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChoice = (value) => {
    setChoice(value);
    if (value === "view") {
      setRefreshTicket(!isRefreshTicket);
    }
  };

  const [formData, setFormData] = useState({
    userId: user?.userId,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title.trim() || !formData.description.trim()) {
    dispatch(showSnackbar({
      message: "Title and description cannot be empty.",
      type: "error"
    }));
    return;
  }

  setLoading(true);
  try {
    const response = await dispatch(createTicket(formData));
    dispatch(showSnackbar({
      message: "Ticket created successfully! With Ticket ID: " + response?.payload?.data?.ticketId,
      type: "success"
    }));
    setFormData({ userId: user.userId, title: "", description: "" });
    handleChoice("view");
  } catch (error) {
    dispatch(showSnackbar({
      message: "Failed to create ticket. Please try again.",
      type: "error"
    }));
    handleClose();
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  if (choice !== "view") return;
  const fetchAllTickets = async () => {
    setTicketsLoading(true);
    try {
      const response = await dispatch(getAllTickets());
      // console.log("Tickets fetched successfully:", response?.payload?.data);
      setTickets(response?.payload?.data || []);
      // Optionally show a success snackbar:
      // dispatch(showSnackbar({
      //   message: "Tickets fetched successfully!",
      //   type: "success"
      // }));
    } catch (error) {
      dispatch(showSnackbar({
        message: "Failed to fetch Tickets.",
        type: "error"
      }));
    } finally {
      setTicketsLoading(false);
    }
  };
  fetchAllTickets();
}, [isRefreshTicket, dispatch, choice]);

  const handleClose = () => {
    setChoice(null);
    setFormData({ userId: user.userId, title: "", description: "" });
    toggleModal();
  };

  const handleDeleteTicket = async (ticketId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirmation) return;

    try {
      await deleteTicketApi(ticketId);
      alert("Ticket deleted successfully");
      setRefreshTicket(!isRefreshTicket);
    } catch (error) {
      alert("Failed to delete the Ticket. Please try again.");
    }
  };

  return (
    <div
      id="help-and-supp-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="main-form relative p-4 w-full max-w-5xl flex gap-4 justify-center">
        <div className="form-add-frnd border border-gray-400 shadow-inner-custom relative bg-white  w-[100%] h-[60%]  sm:w-1/2 sm:h-1/3 md:w-1/2 md:h-1/3  rounded-sm shadow dark:bg-gray-300">
          <div className="flex items-center justify-between p-2 md:p-2  sm:p-40 rounded-sm bg-teal-600">
            <h4 className="text-lg font-semibold text-gray-100">
              Help & Support
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent  hover:text-gray-100 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-teal-600 dark:hover:text-white"
              onClick={handleClose} // Close modal and reset form
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
          {choice === null && (
            <div className="p-4 sm:h-1/2 sm:h-1/2 md:p-5">
              <div className="mb-2 flex flex-col gap-2">
                <button
                  onClick={() => handleChoice("create")}
                  type="submit"
                  className="w-full border bg-gray-100 hover:bg-cyan-500 hover:text-white border-cyan-500 text-cyan-500 rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Create A New Ticket
                </button>
                <button
                  onClick={() => {
                    handleChoice("view");
                    // fetchAllTickets();
                  }}
                  type="button"
                  className="w-full border bg-gray-100 hover:bg-yellow-500 hover:text-white border-yellow-500 text-yellow-500 rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  View Tickets
                </button>
              </div>
            </div>
          )}
          {choice === "view" && (
            <div className="p-1 md:p-5 ">
              {isTicketsLoading ? (
                <div className=" scroll-auto overflow-y-scroll w-full p-2 h-96 border border-gray-400 bg-gray-100">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="Help-Tickets-loading bg-gray-300 animate-pulse mb-2 border border-gray-400 flex shadow-inner-custom gap-2 p-2 pr-4  h-24 rounded-sm shadow-sm items-start"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className=" scroll-auto overflow-y-scroll w-full p-2 min-h-64 max-h-96 border border-gray-400 bg-gray-100">
                  {tickets.length===0 &&<div className="flex justify-center items-center h-64 w-full  text-lg text-gray-300">
                    <h1>Tickets Not Found</h1>
                  </div>}

                  {tickets.map((ticket) => (
                    <div
                      key={ticket.ticketId}
                      className="ticket-card shadow-inner-custom  text-sm rounded-sm w-full h-auto border border-gray-300 bg-white p-4 mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm  font-semibold text-gray-800">{`Ticket ID: ${ticket.ticketId}`}</h2>

                        {ticket.status === "OPEN" && (
                          <FontAwesomeIcon
                            onClick={() => handleDeleteTicket(ticket.ticketId)}
                            icon={faTrashCan}
                            className="text-rose-500 hover:text-rose-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            style={{ fontSize: "18px" }}
                          />
                        )}
                      </div>

                      <div className="flex justify-between mt-2">
                        <div className="text-xs mr-2 text-wrap text-gray-700">
                          <p className="mb-1">
                            <strong>Status: </strong>
                            <span
                              className={`font-semibold ${
                                ticket.status === "OPEN"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {ticket.status}
                            </span>
                          </p>
                          <p className="mb-2 ">
                            <strong>Priority:</strong>{" "}
                            {ticket.priority || "None"}
                          </p>
                          <p className="mb-1">
                            <strong>Title:</strong> {ticket.issueTitle}
                          </p>
                        </div>
                        <div className=" text-gray-700">
                          <p className="text-xs text-gray-500">
                            <strong>Created:</strong>{" "}
                            {new Date(ticket.createdDate).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Updated:</strong>{" "}
                            {new Date(ticket.updatedDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className=" rounded-sm  text-xs text-gray-700">
                        <p className="">
                          <strong>Description : </strong>

                          {ticket.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* .....  */}
                </div>
              )}
            </div>
          )}

          {choice === "create" && (
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold font-Poppins    text-gray-900">
                  Title :
                </label>
                <input
                  name="title"
                  type="text"
                  id="title"
                  className="w-full input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2"
                  placeholder="Enter title here"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-Poppins mb-2 text-sm font-semibold  text-gray-900">
                  Description :
                </label>
                <textarea
                  name="description"
                  className="w-full h-32 input-field-shadow border border-gray-400 text-gray-600 rounded-sm p-2 text-left"
                  placeholder="Please describe the issue. We're always here for you."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2  font-Poppins  sm:text-xs flex gap-4  ">
                <button
                  type="submit"
                  className=" bg-teal-600 text-white rounded-sm px-6 py-1 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center ">
                      <div className="w-5 h-5 border-3 border-t-4 border-white rounded-full animate-spin"></div>
                      <div className="font-semibold ml-2">Processing..</div>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className=" bg-rose-600 text-white rounded-sm px-4 py-2 
                      focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-md transition-all duration-300 
                  ease-in-out transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
