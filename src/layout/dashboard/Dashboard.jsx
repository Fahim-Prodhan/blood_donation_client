import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <Sidebar></Sidebar>
           <div className='md:ml-[300px] ml-4'> <Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;