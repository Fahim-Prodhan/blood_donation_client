/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png'
import {  NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import {  FaHome, FaRegUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {


    const [sidebar, SetSidebar] = useState(false)



    const handleSidebar = () => {
        SetSidebar(!sidebar)
    }

    return (
        <div className='relative'>
          
            <button onClick={handleSidebar} type="button" className="inline-flex z-10 absolute right-0 items-center p-2 text-2xl mt-2  ms-3 text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2">
            <GiHamburgerMenu />
            </button>

            <aside id="default-sidebar" className={`fixed left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${sidebar ? 'top-0' : '-translate-x-full'}`} aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-[#eee] shadow">
                    <ul className="space-y-2 font-medium">
                        <button onClick={handleSidebar} className='absolute right-4  text-2xl md:hidden block'><IoCloseSharp /></button>

                        {/* Profile Pic and name */}
                        <div className='mb-4 '>
                            
                            <img className='w-[50%] mx-auto' src={logo} alt="" />
                            <hr className='border-2 mt-4 border-black' />

                        </div>

                        {/* Others */}
                        <li>
                            <NavLink style={() => ({
                                color: "#FF204E",
                                
                            })} to='/' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< FaHome /></span></p>
                                <span className="ms-3">Home</span>

                            </NavLink>
                        </li>
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