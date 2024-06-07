import React from 'react';
import useDonationRequest from '../../hook/useDonationRequest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {

    const { donationRequests,refetch } = useDonationRequest()
    const axiosSecure = useAxiosSecure();

    const handleDeleteDonationReq = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/my-donation-request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!"
                            });
                        }
                    })

            }
        });

    }


    return (
        <div>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>My Donation Requests</h1>
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
                                <th> View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationRequests.map(d =>
                                    <tr key={d._id}>
                                        <td>{d.recipientName}</td>
                                        <td>{d.upazila}, {d.district}</td>
                                        <td>{d.donationDate}</td>
                                        <td>{d.donationTime}</td>
                                        <td>{d.status}</td>
                                        <td>{d?.donarInformation}</td>
                                        <td className='space-x-2'><Link to={`/dashboard/update-donation-requests/${d._id}`}><button className='text-[#615EFC] text-2xl'><FaEdit /></button> </Link><button onClick={()=>handleDeleteDonationReq(d._id)} className='text-[#FF204E] text-2xl'><MdDelete /></button></td>
                                        <td><button className='text-[#41B06E] hover:bg-[#41b06d5c] px-2 py-1 rounded-md '>view</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDonationRequests;