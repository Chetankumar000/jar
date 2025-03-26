import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const user = useAuthStore.getState().user;
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Call your logout logic here (e.g., clearing tokens, Zustand state)
    navigate("/"); // Redirect to the home page
  };
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const headerItems = [
    { label: "HOME", path: "/" },
    { label: "QUIZ ME", path: "/quizme" },
    { label: "MY JARVIS", path: "/myjarvis" },
    { label: "STUDY MATERIAL", path: "/studymaterial" },
    { label: "SHOP", path: "/shop" },
    { label: "LEADERBOARD", path: "/leaderboard" },
  ];

  const navLinkStyles = ({ isActive }) =>
    `mx-3 ${isActive ? "text-[#39ff14]" : "text-white"} `;

  function formatUserName(name) {
    return name.length > 3 ? name.slice(0, 3) + "..." : name;
  }

  return (
    <div className="py-2 2xl:py-3 sticky  top-0 w-full z-50 shadow-lg bg-[#000E1B]">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-evenly  items-center font-semibold text-white text-sm">
        {/* <div className="mr-12">
          <img className="h-12" src="/svg_icons/i.svg" alt="indianAtoms" />
        </div> */}
        <div className="flex items-center 2xl:gap-[3vw] gap-[3vw] 2xl:text-lg font-bold">
          {headerItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <NavLink to={item.path} className={navLinkStyles}>
                {item.label}
              </NavLink>
              {index < headerItems.length && (
                <span className="text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}

          <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setIsUserDropdownOpen(true)}
            onMouseLeave={() => setIsUserDropdownOpen(false)}
            aria-expanded={isUserDropdownOpen}
          >
            {isAuthenticated ? (
              <>
                <img
                  className="w-5 h-5 mr-2 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9pLoSySk6m6k8jo6mrZgifjDTKRYa4xt3Q&s"
                  alt="User Avatar"
                />
                <span className="bg-blue-600 py-1 px-1 rounded-md">
                  {formatUserName(user?.name) || "User"}
                </span>
              </>
            ) : (
              <Link
                to="/login"
                className="px-2 py-1 bg-green-500 rounded hover:bg-green-600"
              >
                Login
              </Link>
            )}

            {/* User Dropdown */}
            {user && isUserDropdownOpen && (
              <div
                className="absolute top-7 right-0 w-32 bg-gray-800 text-white text-sm rounded shadow-lg transition-opacity duration-300 ease-in-out opacity-100"
                role="menu"
              >
                <ul className="flex flex-col">
                  <Link to="/profile">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    Settings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-700 cursor-pointer rounded"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex px-4 items-center justify-between md:hidden">
        <button
          className="text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
        <div
          className="relative flex items-center cursor-pointer"
          onMouseEnter={() => setIsUserDropdownOpen(true)}
          onMouseLeave={() => setIsUserDropdownOpen(false)}
        >
          <img
            className="w-6 h-6 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9pLoSySk6m6k8jo6mrZgifjDTKRYa4xt3Q&s"
            alt="User Avatar"
          />
        </div>

        {/* Mobile User Dropdown */}
        {isUserDropdownOpen && (
          <div
            className="absolute top-12 right-6 w-32 bg-gray-800 text-white text-sm rounded shadow-lg transition-opacity duration-300 ease-in-out opacity-100"
            role="menu"
          >
            <ul className="flex flex-col">
              <Link to="/profile">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
              </Link>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Settings
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-red-700 cursor-pointer rounded"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center text-xs bg-[#000E1B] text-white font-semibold py-2 space-y-2">
          {headerItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className="hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
