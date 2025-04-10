import React from 'react';
import "../CssStyle/GroupDashboard.css";
const images = [
  "/page3.jpg",
  "/page4.jpg",
  "/page5.jpg",
]
function Invite() {
   return (
    <>
    
   
    <div className="h-full  overflow-y-auto">
      {images.map((src, index) => (
        <div
          key={index}
          className="sm:min-h-[90vh] min-h-[40vh] bg-white shadow-md rounded-lg mb-4 sm:p-4 p-2 flex items-center justify-center"
         >
          <img
            src={src}
            alt={`Page ${index + 1}`}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
      ))}
    </div>
    </>
  );
}

export default Invite;