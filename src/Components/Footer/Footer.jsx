import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">

          <div className="flex flex-col space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png"
                alt="MovieMatrix Logo"
                className="w-10 h-10 rounded"
              />
              <Link
                to="/"
                className="text-3xl font-bold text-rose-500 hover:text-rose-600 transition"
              >
                MovieMatrix
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for exploring movies, reviews, trailers, and everything cinema!  
              Dive into the matrix of entertainment 🎥
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-200 text-lg">Quick Links</h3>
            <Link to="/" className="hover:text-rose-500 transition">Home</Link>
            <Link to="/movies" className="hover:text-rose-500 transition">Movies</Link>
            <Link to="/reviews" className="hover:text-rose-500 transition">Reviews</Link>
            <Link to="/profile" className="hover:text-rose-500 transition">My Profile</Link>
            <Link to="/privacy" className="hover:text-rose-500 transition">Privacy Policy</Link>
          </div>
}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-200 text-lg">Contact</h3>
            <p>Email: <a href="mailto:info@moviematrix.com" className="hover:text-rose-500 transition">info@moviematrix.com</a></p>
            <p>Phone: <a href="tel:+880123456789" className="hover:text-rose-500 transition">+880 123 456 789</a></p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>

          {/* --- Social Links --- */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-gray-200 text-lg">Follow Us</h3>
            <div className="flex space-x-4 mt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-full shadow hover:bg-rose-500 hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/MovieMatrixOfficial"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-full shadow hover:bg-rose-500 hover:text-white transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-full shadow hover:bg-rose-500 hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-full shadow hover:bg-rose-500 hover:text-white transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MovieMatrix. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
