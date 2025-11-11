import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b132b] text-white">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};


export default MainLayout;
