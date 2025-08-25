import React from "react";
import friendicon from "../assets/friendicon.png";

function InstructionToSelect() {
  return (
    <div className="right-side relative z-10 rounded h-screen lg:w-full overflow-hidden pl-0 md:pl-2 lg:pl-0">
      <div className="flex flex-col h-[90%] lg:h-[98%] overflow-y-auto lg:pt-0">
        <div className="default-right h-screen border border-sm border-gray-500 shadow-inner-custom w-full bg-gray-300 flex flex-col items-center justify-center p-2">
          <div className="mb-4 sm:hidden md:hidden hover:animate-bounce lg:block">
            <img
              src={friendicon || "/placeholder.svg"}
              alt="Friend Icon"
              className="w-24 h-24"
            />
          </div>
          <h2 className="text-lg sm:text-xs md:text-sm lg:text-lg text-gray-800 text-center">
            <b>Select any friend to view details</b>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InstructionToSelect;
