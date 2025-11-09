import React from "react";
import { FaFilm } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black text-white z-50">
      <div className="relative flex justify-center items-center">
        <FaFilm className="text-6xl sm:text-7xl text-rose-500 animate-spin-slow drop-shadow-lg" />
        <div className="absolute w-20 h-20 rounded-full border-4 border-rose-500 border-t-transparent animate-spin-slower"></div>
      </div>
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-fadeIn">
        MovieMatrix
      </h1>

      <p className="mt-2 text-gray-400 text-sm sm:text-base animate-fadeInSlow">
        Loading your cinematic universe 🎬
      </p>
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spin-slower {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }

          .animate-spin-slower {
            animation: spin-slower 6s linear infinite;
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease-out forwards;
          }

          .animate-fadeInSlow {
            animation: fadeIn 2.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
