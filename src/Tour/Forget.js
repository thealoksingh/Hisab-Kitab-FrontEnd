import React from 'react'

const images = [
 
  
    "/page28.jpg",
    "/page29.jpg",
   
  
]

function Forget() {
  return (
    <>
    <span className='flex justify-center font-Poppins font-semibold text-xl'> Forget password</span>
    <div className="h-full overflow-y-auto mt-8 space-y-10 ">
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
  )
}

export default Forget