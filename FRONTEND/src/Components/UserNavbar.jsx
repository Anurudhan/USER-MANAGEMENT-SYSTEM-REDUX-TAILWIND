import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUserData } from "../redux/feature/UserSlice";
import { baseURL } from "../constants/Constants.Js";
import axios from "../../Axios";

function UserNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get("/logout")
      .then(() => {
        dispatch(clearUserData());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold flex">
            <h3 className="pt-2">Apple</h3>
            <img
              className="w-10 h-10 pe-1"
              src="https://svgsilh.com/svg/2962084.svg"
              alt="Logo"
            />
          </Link>
          <div className="md:flex space-x-4 hidden md:justify-end items-center">
            <Link
              to={userData ? "/settings" : "/login"}
              className="text-gray-300 hover:text-white"
            >
              Settings
            </Link>
            {userData ? (
              <>
                <Link
                  to="/account"
                  className="text-gray-300 hover:text-white"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-white"
                >
                  Signup
                </Link>
              </>
            )}
            <Link
              to={userData ? "/profile" : "/login"}
              className="flex items-center text-gray-300 hover:text-white"
            >
              {userData?.Profile ? (
                <img
                  src={baseURL + `/${userData.Profile}`}
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-1"
                />
              ) : (
                <svg
                  className="w-6 h-6 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1"
                  ></path>
                  <circle cx="12" cy="8" r="4"></circle>
                </svg>
              )}
              Profile
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <Link
              to="/settings"
              className="block text-gray-300 hover:text-white px-2 py-1"
            >
              Settings
            </Link>
            {userData ? (
              <>
                <Link
                  to="/account"
                  className="block text-gray-300 hover:text-white px-2 py-1"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-gray-300 hover:text-white px-2 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-300 hover:text-white px-2 py-1"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-300 hover:text-white px-2 py-1"
                >
                  Signup
                </Link>
              </>
            )}
            <Link
              to={userData ? "/profile" : "/login"}
              className="block text-gray-300 hover:text-white px-2 py-1 flex items-center"
            >
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-1"
                />
              ) : (
                <svg
                  className="w-6 h-6 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1"
                  ></path>
                  <circle cx="12" cy="8" r="4"></circle>
                </svg>
              )}
              Profile
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default UserNavbar;
