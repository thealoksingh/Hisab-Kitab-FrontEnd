import React from 'react'


const images = [
  "/page23.jpg",
  "/page24.jpg",
  "/page25.jpg",
  "/page26.jpg",
    "/page27.jpg",
   
  
]

function Help() {
  return (
    <>
    <div className="h-full overflow-y-auto    ">
      {images.map((src, index) => (
        <div
          key={index}
          className="sm:min-h-[90vh] min-h-[40vh] bg-white shadow-md mb-4 rounded-2xl sm:p-4 p-2 flex items-center justify-center"
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

export default Help