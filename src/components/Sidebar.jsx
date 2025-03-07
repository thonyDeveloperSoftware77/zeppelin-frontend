import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { UserButton } from "@clerk/clerk-react";

const Sidebar = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const location = useLocation(); // Obtiene la ruta actual

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="sidebar">
      <aside className={`${isOpen ? "translate-x-0" : "-translate-x-full px-4"}`}>
        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex gap-4 p-4">
          <UserButton />
          <div className="flex flex-col">
            <p className="text-md">HeroUI</p>
            <p className="text-small text-default-500">heroui.com</p>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="py-4 overflow-y-auto">
          <nav>
            <ul className="space-y-2 px-3">
              {routes.map((route, index) => (
                <li key={index}>
                  {route.submenu ? (
                    <div className="mb-1">
                      <button
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700 transition-colors"
                        onClick={() => toggleSubMenu(index)}
                      >
                        <div className="flex items-center gap-2">
                          {route.icon && <span>{route.icon}</span>}
                          <span>{route.name}</span>
                        </div>
                      </button>
                      {openSubMenus[index] && (
                        <ul className="pl-6 mt-1 space-y-1">
                          {route.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                                  location.pathname === subItem.path
                                    ? "selected-option"
                                    : "hover:bg-gray-700 hover:text-white"
                                }`}
                              >
                                {subItem.icon && <span>{subItem.icon}</span>}
                                <span>{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={route.path}
                      className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                        location.pathname === route.path
                          ? "selected-option"
                          : "hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {route.icon && <span>{route.icon}</span>}
                      <span>{route.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
