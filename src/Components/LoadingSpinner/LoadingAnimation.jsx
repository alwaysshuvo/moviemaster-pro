
import React from "react";
import "animate.css";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 animate__animated animate__fadeIn animate__faster">
      <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold text-gray-700 animate__animated animate__pulse animate__infinite">
        Finishing up your signup...
      </h2>
    </div>
  );
};

export default LoadingAnimation;
