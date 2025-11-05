import { LOGO_URL } from "../utils/constant";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onlinestatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const isLoggedIn = btnNameReact === "Logout";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center">
            <img
              className="w-16 h-16 sm:w-24 sm:h-24"
              src={LOGO_URL}
              alt="ProFood Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/96x96/fe9801/white?text=ProFood";
              }}
            />
            <span className="ml-2 text-xl sm:text-2xl font-bold text-orange-600 hidden sm:inline">
              ProFood
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-gray-700 font-medium">
              <li className="hidden xl:flex items-center">
                <span className="text-sm text-gray-600 mr-2">Status:</span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    onlinestatus ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="ml-1.5 text-xs text-gray-500">
                  {onlinestatus ? "Online" : "Offline"}
                </span>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-orange-600 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-600 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="relative hover:text-orange-600 transition-colors duration-200 flex items-center gap-1"
                >
                  <span className="text-xl">🛒</span>
                  Cart
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3 ml-4 border-l pl-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg">
                    <span className="text-xl">👤</span>
                    <span className="font-semibold text-gray-700 text-sm">
                      {loggedInUser}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium"
                    onClick={() => setbtnNameReact("Login")}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-md"
                  onClick={() => setbtnNameReact("Logout")}
                >
                  Login
                </button>
              )}
            </div>
          </nav>

          <div className="flex lg:hidden items-center gap-3">
            <Link to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-3">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  onlinestatus ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-xs text-gray-500">
                {onlinestatus ? "Online" : "Offline"}
              </span>
            </div>

            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart ({cartItems.length})
            </Link>

            {/* Mobile Login/Logout */}
            <div className="px-4 py-2 border-t border-gray-200 mt-2 pt-4">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
                    <span className="text-xl">👤</span>
                    <span className="font-semibold text-gray-700">
                      {loggedInUser}
                    </span>
                  </div>
                  <button
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium"
                    onClick={() => {
                      setbtnNameReact("Login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold"
                  onClick={() => {
                    setbtnNameReact("Logout");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
