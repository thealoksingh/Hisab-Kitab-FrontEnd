import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import hisabKitabBlack from "../assets/images/hisabkitab-black.png";
import logo from "../assets/logo-hisab-kitab.png";
import { ArrowLeft } from "lucide-react";
export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/document" ||
      location.pathname === "/document/"
    ) {
      navigate("/document/invite", { replace: true });
    }
  }, [location.pathname, navigate]);

  const globalNavToggler = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  const navLinks = [
    { name: "Invite Friend", path: "/document/invite" },
    { name: "Add Friend", path: "/document/addfriend" },
    { name: "Transaction", path: "/document/transaction" },
    { name: "Help & Support", path: "/document/help" },
    { name: "Forget Password", path: "/document/forget" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden fixed top-6 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 p-2 rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 lg:bg-gray-800 bg-gray-50 border rounded-sm border-gray-800 text-white transition-transform duration-300 ease-in-out transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 h-auto lg:h-full`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/user-dashboard"
                className="flex items-center p-2 lg:text-gray-300 text-black lg:hover:bg-gray-700 group"
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Hisab Kitab Logo"
                  className="w-6 h-6"
                />
                <span className="ms-3">
                  <img
                    src={hisabKitabBlack}
                    alt="logo"
                    className="h-8 max-w-md sm:max-w-lg md:max-w-xl filter lg:invert lg:brightness-200"
                  />
                </span>
              </a>
            </li>
            {navLinks.map(({ name, path }) => (
              <li key={path}>
                <button
                  onClick={() => handleNavigation(path)}
                  className={`flex w-full items-center text-start p-2 rounded-sm border lg:border-0
                  ${
                    location.pathname === path
                      ? "lg:bg-gray-700 bg-gray-200 font-semibold"
                      : "lg:hover:bg-gray-700"
                  }
                  ${
                    location.pathname === path
                      ? "lg:text-gray-300 text-black"
                      : "lg:text-gray-300 text-black"
                  }`}
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
                </button>
              </li>
            ))}
            <li className="lg:justify-start lg:pl-5 justify-center flex">
              <button
                onClick={() => window.history.back()}
                className="lg:bg-gray-500 lg:text-white lg:border-gray-400 border border-black border-sm text-black bg-gray-200 rounded-full p-2 hover:bg-gray-600"
              >
                <ArrowLeft className="w-6 h-6 animate-swing-x" />
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main
        onClick={globalNavToggler}
        className="flex-1 h-full   p-2 overflow-hidden"
      >
        <div className="sticky top-0 z-10 bg-white h-16 flex justify-center items-center font-Poppins font-semibold text-lg">
          {navLinks.find((link) => location.pathname === link.path)?.name ||
            "Dashboard"}
        </div>
        <Outlet />
      </main>
    </div>
  );
}
