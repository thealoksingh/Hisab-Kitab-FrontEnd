import React, { useState, useEffect } from "react";
import { createTicket, getAllTickets } from "../Api/HisabKitabApi";
import "../CssStyle/GroupDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteTicketApi } from "../Api/HisabKitabApi";
function HelpAndSupport({ user, isOpen, toggleModal }) {
  const [choice, setChoice] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isRefreshTicket, setRefreshTicket] = useState(false);
  const handleChoice = (value) => {
    setChoice(value);
    if (value === "view") {
      setRefreshTicket(!isRefreshTicket);
    }
  };

  const [formData, setFormData] = useState({
    userId: user.userId,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTicket(formData);

      alert(
        "Ticket created successfully! With Ticket ID: " + response.data.ticketId
      );
      setFormData({ userId: user.userId, title: "", description: "" });
      handleClose();
    } catch (error) {
      alert("Failed to create ticket. Please try again.");
      handleClose();
    }
  };
  useEffect(() => {
    if (choice !== "view") return;
    const fetchAllTickets = async () => {
      try {
        const response = await getAllTickets(user.userId);
        setTickets(response.data);
        // console.log("Tickets fetched successfully");

        console.log(tickets);
      } catch (error) {
        alert("Failed to fetch Tickets.");
      }
    };
    fetchAllTickets();
  }, [isRefreshTicket]);

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
              Help & Support
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-teal-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-teal-600 dark:hover:text-white"
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
            <div className="p-4 md:p-5">
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
            <div className="p-1 md:p-5">
              <div className="scrollable shadow-inner-custom w-full p-2 max-h-96 border border-gray-400 bg-gray-100">
                {/* repeat this  */}
                {tickets.map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="ticket-card shadow-inner-custom rounded-sm w-full h-auto border border-gray-300 bg-white p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold text-gray-800">{`Ticket ID: ${ticket.ticketId}`}</h2>

                      {ticket.status === "OPEN" && (
                        <FontAwesomeIcon
                          onClick={() => handleDeleteTicket(ticket.ticketId)}
                          icon={faTrashCan}
                          className="text-rose-500 hover:text-rose-600 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                          style={{ fontSize: "25px" }}
                        />
                      )}
                    </div>

                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          <strong>Title:</strong> {ticket.issueTitle}
                        </p>
                        <div className=" input-field-shadow rounded-sm  border border-gray-200  p-1 mb-1 max-w-56 max-h-24 overflow-y-auto">
                          <p>
                            <strong>Description:</strong>

                            {ticket.description}
                          </p>
                        </div>
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
                        <p className="mb-1">
                          <strong>Priority:</strong> {ticket.priority || "None"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-700">
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
                  </div>
                ))}

                {/* .....  */}
              </div>
            </div>
          )}

          {choice === "create" && (
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
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
                <label className="block mb-2 text-sm font-medium text-gray-900">
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
              <div className="mb-2 flex gap-4">
                <button
                  type="submit"
                  className="w-1/3 bg-teal-600 text-white rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-teal-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 bg-rose-600 text-white rounded-sm px-4 py-1 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
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
