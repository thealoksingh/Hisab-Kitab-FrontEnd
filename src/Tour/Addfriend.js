import React from 'react'

const images = [
  "/page6.jpg",
  "/page7.jpg",
  "/page8.jpg",
  "/page9.jpg",
  
]

function Addfriend() {
  return (
    <>
   
    <div className="h-full overflow-y-auto     ">
      {images.map((src, index) => (
        <div
          key={index}
          className="sm:min-h-[90vh] min-h-[40vh] bg-white mb-4 shadow-md rounded-2xl sm:p-4 p-2 flex items-center justify-center"
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

export default Addfriend