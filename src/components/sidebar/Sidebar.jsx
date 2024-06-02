/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.png'
import {  NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaBlogger, FaRegUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {


    const [sidebar, SetSidebar] = useState(false)



    const handleSidebar = () => {
        SetSidebar(!sidebar)
    }

    return (
        <div>
          
            <button onClick={handleSidebar} type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className={`fixed left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${sidebar ? 'top-20' : '-translate-x-full'}`} aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-[#eee] shadow">
                    <ul className="space-y-2 font-medium">
                        <button onClick={handleSidebar} className='absolute right-4 text-white text-2xl md:hidden block'><IoCloseSharp /></button>

                        {/* Profile Pic and name */}
                        <div className='mb-4 '>
                            
                            <img className='w-[50%] mx-auto' src={logo} alt="" />
                            <hr className='border-2 mt-4 border-black' />

                        </div>

                        {/* Others */}
                        <li>
                            <NavLink style={() => ({
                                color: "#FF204E",
                                
                            })} to='/dashboard' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< MdDashboard /></span></p>
                                <span className="ms-3">Dashboard</span>

                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={() => ({
                                color:  "#FF204E",
                            })} to='/dashboard/profile' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' ><FaRegUserCircle /></span></p>
                                <span className="ms-3">profile</span>
                            </NavLink>
                        </li>     
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;