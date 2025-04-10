import React from 'react'
import { useNavigate } from 'react-router-dom';

const images = [
  "/page10.jpg",
  "/page11.jpg",
  "/page12.jpg",
    "/page13.jpg",
    "/page14.jpg",
    "/page15.jpg",
    "/page16.jpg",
  
]

function Transaction() {
   const navigate = useNavigate();

  
   return (
    <>
   <div className="h-full overflow-y-auto   ">
      {images.map((src, index) => (
        <div
          key={index}
          className="sm:min-h-[90vh] min-h-[40vh] bg-white shadow-md rounded-2xl mb-4  sm:p-4 p-2 flex items-center justify-center"
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
  )
}

export default Transaction