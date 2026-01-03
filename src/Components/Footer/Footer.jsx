import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content py-10 transition-all">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <Link
            to="/"
            className="flex items-center gap-[4px] font-extrabold text-xl sm:text-2xl"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <img
                src="https://i.ibb.co.com/PzMVBr3h/Chat-GPT-Image-Nov-13-2025-03-22-06-PM.png"
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </div>

            <span
              className="leading-none ml-[-10px]
"
            >
              Movie<span className="text-primary">Matrix</span>
            </span>
          </Link>
          <p className="text-sm opacity-80">
            Explore, collect, and review your favorite films — all in one place.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="/movies" className="hover:text-primary">
                All Movies
              </a>
            </li>
            <li>
              <a href="/movies/add" className="hover:text-primary">
                Add Movie
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm opacity-80">Email: support@moviematrix.com</p>
          <p className="text-sm opacity-80">Phone: +880 1234-567890</p>
        </div>
      </div>
      <p className="text-center text-sm opacity-60 mt-6">
        © {new Date().getFullYear()} MovieMatrix. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
