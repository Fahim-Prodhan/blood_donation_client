import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useDonationRequest from '../../hook/useDonationRequest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
        </div>
    );
};

export default DashboardContent;