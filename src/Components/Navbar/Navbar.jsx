import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ theme, setTheme }) => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await new Promise((r) => setTimeout(r, 1200));
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="lg:hidden text-2xl mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>

          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl"
          >
            <img
              src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png"
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span>
              Movie<span className="text-primary">Matrix</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-medium">
          <NavLink to="/" end className="hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/all-movies" className="hover:text-primary">
            All Movies
          </NavLink>
          <NavLink to="/movies/my-collection" className="hover:text-primary">
            My Collection
          </NavLink>
          <NavLink to="/movies/add" className="hover:text-primary">
            Add Movie
          </NavLink>
        </div>

        <div className="flex items-center gap-3 relative">
          {user ? (
            <div
              className="relative flex items-center gap-2"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={user?.photoURL || "https://i.ibb.co.com/d2mY2mP/user.png"}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-purple-500 transition"
              />
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 right-0 bg-base-200 rounded-lg shadow-md px-3 py-2 text-sm"
                  >
                    <p className="text-center font-semibold">
                      {user.displayName || "User"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className={`btn btn-sm bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white flex items-center gap-2 ${
                  loggingOut ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loggingOut && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-sm bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-sm bg-gradient-to-l from-purple-500 to-fuchsia-500 text-white"
              >
                Register
              </Link>
            </div>
          )}

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "night"}
            />
            <span className="ml-1 text-sm font-medium hidden sm:inline">
              {theme === "night" ? "Dark" : "Light"}
            </span>
          </label>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-base-100 border-t border-base-300"
        >
          <ul className="p-4 space-y-2 font-medium">
            <li>
              <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-movies" onClick={() => setIsMenuOpen(false)}>
                All Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies/my-collection"
                onClick={() => setIsMenuOpen(false)}
              >
                My Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies/add" onClick={() => setIsMenuOpen(false)}>
                Add Movie
              </NavLink>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
