import {
  RiDashboardLine,
  RiSettings4Line,
  RiHomeSmile2Line,
  RiUserLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiTeamLine,
  RiFolderLine,
  RiFolderOpenLine,
} from "react-icons/ri";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { projectUserApi } from "../services/project-users/api";

interface Project {
  project_id: number;
  project_name: string;
}

export default function Sidebar() {
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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
      path: "/teams",
      label: "Teams",
      icon: <RiTeamLine size={20} />,
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
    if (user?.id) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      if (!user?.id) throw new Error('User not found');
      const userProjects = await projectUserApi.getUserProjects(user!.id);
      console.log("userProjects", userProjects)
      setProjects(userProjects);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <RiMenuLine size={24} />
        </button>
      )}

      <div
        className={`h-full w-64 bg-white shadow-lg ${
          isMobile ? `fixed inset-y-0 left-0 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } z-40` : ""
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-bold text-black">Project Manager</h2>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors ${
                      location.pathname === item.path
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
              </li>
              ))}

              <li className="pt-4">
                <button
                  className="flex items-center justify-between w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <RiFolderLine size={20} />
                    <span>Projects</span>
                  </div>
                </button>

                  <ul className="ml-4 mt-1 space-y-1">
                    {loading ? (
                      <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
                    ) : projects.length === 0 ? (
                      <li className="px-4 py-2 text-sm text-gray-500">No projects found</li>
                    ) : (
                      projects.map((project) => (
                        <li key={project.project_id}>
                          <button
                            onClick={() => handleProjectClick(project.project_id)}
                            className={`flex items-center space-x-2 w-full px-4 py-2 text-left text-sm rounded-md transition-colors ${
                              location.pathname === `/projects/${project.project_id}`
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <RiFolderOpenLine size={16} />
                            <span className="text-black">{project.project_name}</span>
                          </button>
                        </li>
                      ))
                    )}
                    <li>
                      <button
                        onClick={() => navigate('/new-project')}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <span>+ New Project</span>
                      </button>
                    </li>
                  </ul>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <RiUserLine size={20} />
                <span className="flex-1 truncate">{user?.fname || "User"}</span>
              </button>

              {showDropdown && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-md shadow-lg border">
              <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                    <RiLogoutBoxRLine size={20} />
                <span>Logout</span>
              </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
