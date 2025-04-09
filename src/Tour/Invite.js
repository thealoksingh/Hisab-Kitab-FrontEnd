import React from 'react';

const images = [
  "/page3.jpg",
  "/page4.jpg",
  "/page5.jpg",
]
function Invite() {
  return (
    <>
    <span className='flex positon-fixed justify-center font-Poppins font-semibold text-xl'> Invite Friend</span>
    <div className="h-full overflow-y-auto sm:space-y-8 mt-8 space-y-0 ">
      {images.map((src, index) => (
        <div
          key={index}
          className="sm:min-h-[90vh] min-h-[40vh] bg-white shadow-md rounded-2xl sm:p-4 p-2 flex items-center justify-center"
         >
          <img
            src={src}
            alt={`Page ${index + 1}`}
            className="max-h-full max-w-full object-contain rounded-xl"
          />
        </div>
      ))}
    </div>
    </>
  );
}

export default Invite;