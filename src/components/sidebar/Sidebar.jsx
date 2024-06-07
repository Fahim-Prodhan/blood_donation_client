/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from 'react';
import logo from '../../assets/images/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaHome, FaRegUserCircle, FaUsers } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import { BiDonateHeart } from 'react-icons/bi';
import { IoIosLogOut } from 'react-icons/io';

const Sidebar = () => {

    const [sidebar, SetSidebar] = useState(false)
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    const signOut = () => {
        logout()
            .then(() => {
                toast.success('logout successful')
                navigate('/login')
            })
    }

    const handleSidebar = () => {
        SetSidebar(!sidebar)
    }


    return (
        <div className='relative'>

            <button onClick={handleSidebar} type="button" className="inline-flex z-10 absolute right-0 items-center p-2 text-2xl mt-2  ms-3 text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2">
                <GiHamburgerMenu />
            </button>

            <aside id="default-sidebar" className={`fixed left-0 z-40 w-64 lg:w-72 h-screen transition-transform sm:translate-x-0 ${sidebar ? 'top-0' : '-translate-x-full'}`} aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-[#eee] shadow grid ">
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
                                background: active ? '#374151' : ''

                            })} to='/dashboard' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' >< MdDashboard /></span></p>
                                <span className="ms-3">Dashboard</span>

                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/profile' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' ><FaRegUserCircle /></span></p>
                                <span className="ms-3">profile</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/create-donation-request' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' ><MdOutlineCreateNewFolder /></span></p>
                                <span className="ms-3">Create Donation Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/my-donation-requests' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' ><BiDonateHeart /></span></p>
                                <span className="ms-3">My Donation Requests</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/all-users' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' > <FaUsers /></span></p>
                                <span className="ms-3">All Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/all-blood-donation-request' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' > <FaUsers /></span></p>
                                <span className="ms-3">All Blood Donation Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => ({
                                color: "#FF204E",
                                background: isActive ? '#374151' : ''
                            })} to='/dashboard/content-management' className="flex items-center p-2 rounded-lg  hover:bg-gray-700 group">
                                <p className='text-2xl'><span className='text-gray-400 group-hover:text-white' > <FaUsers /></span></p>
                                <span className="ms-3">Content Management</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className='self-end md:space-x-6 lg:space-x-16'>
                        
                        <Link to='/'><button  className='btn bg-[#0D9276] text-white'>< FaHome /> Home</button></Link>
                        <button onClick={signOut} className='btn btn-error text-white'>Logout <IoIosLogOut /></button>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;