import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Invite from './Invite';
import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import logo from "../assets/logo-hisab-kitab.png";



export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu on mobile after click
  };

  return (
    <div className="flex w-full h-screen">
      {/* Toggle Button for Mobile */}
      <div className="md:hidden fixed  top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-gray-800 p-2 rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
      
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
        >
         <a
                href="/user-dashboard"
                className="flex items-center p-2 lg:text-gray-300 text-black   lg:hover:bg-gray-700 group"
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Hisab Kitab Logo"
                  className="w-6 h-6 "
                />
                <span className="ms-3">
                  {" "}
                  <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter lg:invert lg:brightness-200"
                  />{" "}
                </span>
              </a>

          <nav className="flex flex-col mt-12 gap-3">
           <button
           onClick={() => handleNavigation('/document/invite')}
            className="text-left hover:bg-gray-500 py-1 px-4 rounded-md"
            >
           Invite Friend
          </button>
            <button
           onClick={() => handleNavigation('/document/addfriend')}
            className="text-left hover:bg-gray-500 py-1 px-4 rounded-md"
            >
           Add Friend
          </button>
           <button
           onClick={() => handleNavigation('/document/transaction')}
            className="text-left hover:bg-gray-500 py-1 px-4 rounded-md"
            >
           Transaction
          </button>
          <button
           onClick={() => handleNavigation('/document/help')}
            className="text-left hover:bg-gray-500 py-1 px-4 rounded-md"
            >
           Help & Support
          </button>
          <button
           onClick={() => handleNavigation('/document/forget')}
            className="text-left hover:bg-gray-500 py-1 px-4 rounded-md"
            >
           Forget Password
          </button>
          
       
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}