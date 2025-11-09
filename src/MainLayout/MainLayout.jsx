import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <div className='flex-1 mt-10 '>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;