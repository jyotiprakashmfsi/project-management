import {
  RiDashboardLine,
  RiSettings4Line,
  RiHomeSmile2Line,
  RiUserLine,
  RiLogoutBoxRLine,
  RiMenuLine,
} from "react-icons/ri";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";



export default function Sidebar() {
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: <RiHomeSmile2Line size={20} /> },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <RiDashboardLine size={20} />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <RiSettings4Line size={20} />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowDropdown(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-100"
      >
        <RiMenuLine size={24} />
      </button>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed md:static h-screen bg-white z-40 ${
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-16 md:translate-x-0"
        }`}
      >
        <div className="h-full p-4 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="mb-8">
              <h1 className={`text-2xl font-bold text-gray-800 whitespace-nowrap ${
                !isSidebarOpen && "md:hidden"
              }`}>
                Task Manager
              </h1>
            </div>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.path}
                      className={`flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                        !isSidebarOpen && "md:justify-center"
                      }`}
                    >
                      {item.icon}
                      <span className={`ml-2 whitespace-nowrap ${
                        !isSidebarOpen && "md:hidden"
                      }`}>
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                !isSidebarOpen && "md:justify-center"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <RiUserLine size={20} className="text-indigo-600" />
              </div>
              <div className={`flex-1 text-left whitespace-nowrap ${
                !isSidebarOpen && "md:hidden"
              }`}>
                <p className="font-medium text-gray-900">{user?.fname}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </button>

            {showDropdown && (
              <div className={`absolute ${isSidebarOpen ? 'bottom-full left-0 w-full' : 'bottom-0 left-full ml-2'} mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px]`}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <RiLogoutBoxRLine size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
