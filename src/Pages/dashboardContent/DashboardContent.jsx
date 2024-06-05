import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useDonationRequest from '../../hook/useDonationRequest';
import { FaArrowDown, FaArrowUp, FaEdit, FaUsers } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiFillDollarCircle } from "react-icons/ai";
import { BiSolidDonateHeart } from "react-icons/bi";

const DashboardContent = () => {
    const { user } = useContext(AuthContext)
    const { donationRequests } = useDonationRequest()

    return (
        <div>
            <h1 className='text-4xl text-center font-bold py-8'><span className='text-[#FF204E]'>Welcome </span>{user?.displayName}</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Recipient Name</th>
                                <th>Recipient location</th>
                                <th>Donation date</th>
                                <th>Donation time</th>
                                <th>Donation status</th>
                                <th> Donor information</th>
                                <th> Action </th>
                                <th> View </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationRequests.slice(0, 5).map(d =>
                                    <tr key={d._id}>
                                        <td>{d.recipientName}</td>
                                        <td>{d.upazila}, {d.district}</td>
                                        <td>{d.donationDate}</td>
                                        <td>{d.donationTime}</td>
                                        <td>{d.status}</td>
                                        <td>{d?.donarInformation}</td>
                                        <td className='space-x-2'><button className='text-[#615EFC] text-2xl'><FaEdit /></button> <button className='text-[#FF204E] text-2xl'><MdDelete /></button></td>
                                        <td><button className='text-[#41B06E] hover:bg-[#41b06d5c] px-2 py-1 rounded-md '>view</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className='mt-4 text-center'>
                    <Link to='/dashboard/my-donation-requests'> <button className="btn bg-[#279eff53] text-[#279EFF]">view my all request</button></Link>
                </div>
            </div>

            {/* For admin */}
            <div className='grid grid-cols-1 lg:grid-cols-3 mx-4 gap-6 justify-center'>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-actions justify-end">
                            <button className="btn btn-square btn-md">
                                <FaUsers className='text-2xl'  />
                            </button>
                        </div>
                        <p>Total User</p>
                        <h1 className='text-2xl font-semibold flex items-center gap-4'>4500 <span className='flex items-center text-xs px-2 py-1 bg-[#74e29140] text-[#74E291] rounded-md'><FaArrowUp /> +5.9%</span></h1>
                        <p className='flex items-center'>increase by <span className='flex items-center px-2 py-1 text-[#74E291] rounded-md'><FaArrowUp className='text-xs' /> +5.9%</span> this month</p>
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-actions justify-end">
                            <button className="btn btn-square btn-md">
                            <AiFillDollarCircle className='text-2xl' />
                            </button>
                        </div>
                        <p>Total funding</p>
                        <h1 className='text-2xl font-semibold flex items-center gap-4'>$4500 <span className='flex items-center text-xs px-2 py-1 bg-[#ff204d27] text-[#FF204E] rounded-md'><FaArrowDown /> +5.9%</span></h1>
                        <p className='flex items-center'>decrease by <span className='flex items-center px-2 py-1 text-[#FF204E] rounded-md'><FaArrowDown className='text-xs' /> +5.9%</span> this month</p>
                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="card-actions justify-end">
                            <button className="btn btn-square btn-md">
                            <BiSolidDonateHeart className='text-2xl' />
                            </button>
                        </div>
                        <p>Total Blood Donation Request</p>
                        <h1 className='text-2xl font-semibold flex items-center gap-4'>4500 <span className='flex items-center text-xs px-2 py-1 bg-[#74e29140] text-[#74E291] rounded-md'><FaArrowUp /> +5.9%</span></h1>
                        <p className='flex items-center'>increase by <span className='flex items-center px-2 py-1 text-[#74E291] rounded-md'><FaArrowUp className='text-xs' /> +5.9%</span> this month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;