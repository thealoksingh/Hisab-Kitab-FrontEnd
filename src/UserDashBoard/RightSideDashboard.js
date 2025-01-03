
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import friendicon from '../assets/friendicon.png';

function RightSideDashBoard() {
  return (
    <>
      <div className="right-side  flex items-center justify-center rounded bg-slate-300 w-[50%] min-h-full relative overflow-hidden ">
        {/* <div className="default-right">
            <div className='ml-24'>
              <img src={friendicon} alt="Friend Icon" className="w-24 h-24" />
            </div>
            <br/>
              <h2 className="ml-4 text-lg text-gray-800">
               <b>Select any friend to View Deatails</b> 
              </h2>          
          </div> */}
          
        <div className="right-header top-[0] h-[10%] bg-slate-400 w-full absolute p-[10px] flex gap-[10px] flex items-center ">
          <div className="alphabet-circle bg-teal-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <h1 className="text-white text-lg">A</h1>
          </div>
          <div className="user-name">
            <h2 className="text-lg text-gray-800">Alok Singh</h2>
            <p className="text-sm text-gray-600">
              +91<span>9708571269</span>
            </p>
          </div>
             <div className="net-balance border border-teal-900 h-[35px] w-40 rounded flex items-center justify-center ml-5">
             <h2 className="text-black">You will get : <span className="text-green-900 "><span>$</span>8000</span></h2>
            </div>

          
          <div className="report-settings right-[10px] absolute flex gap-[10px] flex items-center justify-center">
            <div className="report h-[35px] w-28 bg-rose-600 rounded flex items-center justify-center">
              <h2 className="text-white">View Report</h2>
            </div>
            <div className="settings h-[50px] w-12 flex items-center justify-center ">
              <FontAwesomeIcon
                icon={faGear}
                className="text-white "
                style={{ fontSize: "25px " }}
              />
            </div>
          </div>
        </div>
      
          <div class="table-division  w-full absolute top-[10%]">
          <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
         <thead className="sticky bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Enteries
                  </th>
                  <th scope="col" className="px-6 py-3">
                    You gave
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    You got
                  </th>
                </tr>
              </thead>
              <tbody>
               
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
            
                    <div className="flex flex-col">
                      <span className="font-medium text-white ">
                        Closing Balance :<span> 4000</span> <span>$</span>
                      </span>
                      <span className="text-xs text-white mt-1">17/10/23 <span>4:00</span><span>PM</span></span>
                      
                    </div>
                  </td>
                  <td className="px-6 py-4  pr-[25px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-rose-500">23 <span>$</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right pr-[25px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-green-500">...<span>.. </span></span>
                    </div>
                  </td>
                </tr>
   
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
                  >
            
                    <div className="flex flex-col">
                      <span className="font-medium text-white ">
                        Closing Balance :<span> 4000</span> <span>$</span>
                      </span>
                      <span className="text-xs text-white mt-1">17/10/23 <span>6:00</span><span>PM</span></span>
                      
                    </div>
                  </td>
                  <td className="px-6 py-4  pr-[25px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-rose-500">...<span>..</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right pr-[25px]">
                    <div className="flex flex-col">
                      <span className="font-medium text-green-500">50 <span> $</span></span>
                    </div>
                  </td>
                </tr>
               
                
              </tbody>
            </table>
          </div>
          <div className="right-footer w-full  bottom-4 absolute h-[50px] flex items-center justify-center gap-12 ">
        <button className="text-white text-lg h-[40px] w-40 rounded bg-rose-500">You Gave : <span>$</span></button>
        <button className="text-white text-lg h-[40px] w-40 rounded bg-green-500">You Got : <span>$</span></button>
      </div>
  </div>
     
    </>
  );
}

export default RightSideDashBoard;
