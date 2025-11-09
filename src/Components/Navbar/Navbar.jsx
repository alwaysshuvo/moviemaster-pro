import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img
              src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <span>
              Movie<span className="text-primary">Matrix</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ul className="menu menu-horizontal px-1 font-medium text-base">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/all-movies">All Movies</NavLink></li>
            <li><NavLink to="/movies/my-collection">My Collection</NavLink></li>
            <li><NavLink to="/movies/add">Add Movie</NavLink></li>
          </ul>
          <button
            onClick={toggleTheme}
            className="btn btn-sm border border-gray-300 bg-base-200"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <>
              <img
                src={user?.photoURL || "https://i.ibb.co.com/d2mY2mP/user.png"}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm text-white font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary btn-sm text-white font-semibold hover:scale-105 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white font-semibold transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-sm border border-gray-300 bg-base-200"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <>
              <img
                src={user?.photoURL || "https://i.ibb.co.com/d2mY2mP/user.png"}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm text-white font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary btn-sm text-white font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white font-semibold"
              >
                Register
              </Link>
            </>
          )}
          <button
            className="text-2xl ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-base-100 border-t border-gray-200">
          <ul className="menu p-4 space-y-2 font-medium text-base">
            <li><NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/all-movies" onClick={() => setIsMenuOpen(false)}>All Movies</NavLink></li>
            <li><NavLink to="/movies/my-collection" onClick={() => setIsMenuOpen(false)}>My Collection</NavLink></li>
            <li><NavLink to="/movies/add" onClick={() => setIsMenuOpen(false)}>Add Movie</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
