import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shered/Navbar';
import Footer from '../pages/shered/Footer';


const MainLayouts = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar />
            <div className='min-h-[calc(100vh-398px)] pt-18 '><Outlet /></div>
            <Footer />
        </div>
    );
};

export default MainLayouts;