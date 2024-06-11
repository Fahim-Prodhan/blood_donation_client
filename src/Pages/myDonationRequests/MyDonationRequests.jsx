import React, { useState } from 'react';
import useDonationRequest from '../../hook/useDonationRequest';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {

    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const { donationRequests, refetch } = useDonationRequest({ currentPage, itemsPerPage })
    const axiosSecure = useAxiosSecure();


    const allReq = donationRequests.donationsReq || [];
    const totalCount = donationRequests.totalCount || 0;
    const numberOfPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);


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

    const handleUpdateStatus = (id, value) => {
        if (value === 'done') {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to change the status",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Change it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/my-donation-request/updateStatus/${id}`, { status: 'done' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Donation Done',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });
        }else if (value === 'cancel') {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to change the status",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Change it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/my-donation-request/updateStatus/${id}`, { status: 'cancel' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Donation Cancel',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };


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
                                <th>Done/Cancel</th>
                                <th> Action </th>
                                <th> View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allReq.map(d =>
                                    <tr key={d?._id}>
                                        <td>{d?.recipientName}</td>
                                        <td>{d?.upazila}, {d.district}</td>
                                        <td>{d?.donationDate}</td>
                                        <td>{d?.donationTime}</td>
                                        <td>{d?.status}</td>
                                        <td><div>
                                            <div className="font-bold">{d?.donorName}</div>
                                            <div className="text-sm opacity-50">{d?.donorEmail}</div>
                                        </div></td>
                                        <td>
                                            {
                                                d?.status === 'inprogress' &&
                                                <div className='space-x-2'>
                                                    <button onClick={()=>handleUpdateStatus(d?._id, 'done')} className="btn btn-sm text-white btn-success">Done</button>
                                                    <button onClick={()=>handleUpdateStatus(d?._id, 'cancel')} className="btn btn-sm text-white btn-error">Cancel</button>
                                                </div>
                                            }
                                        </td>
                                        <td className='space-x-2'><Link to={`/dashboard/update-donation-requests/${d._id}`}><button className='text-[#615EFC] text-2xl'><FaEdit /></button> </Link><button onClick={() => handleDeleteDonationReq(d._id)} className='text-[#FF204E] text-2xl'><MdDelete /></button></td>
                                        <td><Link to={`/donation-requests-details/${d?._id}`}><button className='text-[#41B06E] hover:bg-[#41b06d5c] px-2 py-1 rounded-md '>view</button></Link></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-center mt-12 gap-4'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {pages.map(page => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
                        key={page}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default MyDonationRequests;