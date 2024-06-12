import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCurrentUser from '../../hook/useCurrentUser';
import { Helmet } from 'react-helmet';

const AllDonationRequest = () => {

    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');
    const axiosSecure = useAxiosSecure()
    const { currentUser } = useCurrentUser();

    const { refetch, data: allDonationRequest = {} } = useQuery({
        queryKey: ['allDonationReq', currentPage, itemsPerPage, status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request?page=${currentPage - 1}&size=${itemsPerPage}&status=${status}`)
            return res.data
        }
    })

    console.log(allDonationRequest);

    const allReq = allDonationRequest.allDonations || [];
    const totalCount = allDonationRequest.totalCount || 0;
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

    const handleChangeStatus = (id, value)=>{
        if(value === 'pending'){
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
                    axiosSecure.patch(`/donation-request/updateStatus/${id}`,{status:'pending'})
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Status is now pending!',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });
        }else if(value === 'inprogress'){
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
                    axiosSecure.patch(`/donation-request/updateStatus/${id}`,{status:'inprogress'})
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Status is now inprogress!',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });
        }else if(value === 'canceled'){
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
                    axiosSecure.patch(`/donation-request/updateStatus/${id}`,{status:'canceled'})
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Status is now canceled!',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });
        }else if(value === 'done'){
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
                    axiosSecure.patch(`/donation-request/updateStatus/${id}`,{status:'done'})
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'Status is now done!',
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
             <Helmet>
                <title>BloodBridge | Donation Requests</title>
            </Helmet>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>All Donation Requests</h1>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1 bg-[#0d92753c] text-[#0D9276]">Filter</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setStatus('')}>All</a></li>
                    <li><a onClick={() => setStatus('pending')}>Pending</a></li>
                    <li><a onClick={() => setStatus('inprogress')}>In Progress</a></li>
                    <li><a onClick={() => setStatus('done')}>Done</a></li>
                    <li><a onClick={() => setStatus('canceled')}>Canceled</a></li>

                </ul>
            </div>
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
                                <th>Change status</th>
                                <th> Donor information</th>
                                {
                                    currentUser?.role === 'admin' &&
                                    <th> Action </th>
                                }
                                <th> View </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allReq.map(d =>
                                    <tr key={d?._id}>
                                        <td>{d?.recipientName}</td>
                                        <td>{d?.upazila}, {d?.district}</td>
                                        <td>{d?.donationDate}</td>
                                        <td>{d?.donationTime}</td>
                                        <td>{d?.status}</td>
                                        <td>
                                            <div className="dropdown">
                                                <div tabIndex={0} role="button" className="btn btn-sm btn-error text-white m-1">Change</div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a onClick={() => handleChangeStatus(d?._id,'pending')}>Pending</a></li>
                                                    <li><a onClick={() => handleChangeStatus(d?._id,'inprogress')}>In Progress</a></li>
                                                    <li><a onClick={() => handleChangeStatus(d?._id,'canceled')}>Canceled</a></li>
                                                    <li><a onClick={() => handleChangeStatus(d?._id,'done')}>Done</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">{d?.donorName}</div>
                                                <div className="text-sm opacity-50">{d?.donorEmail}</div>
                                            </div>
                                        </td>
                                        {
                                            currentUser?.role === 'admin' &&
                                            <td className='space-x-2'><Link to={`/dashboard/update-donation-requests/${d._id}`}><button className='text-[#615EFC] text-2xl'><FaEdit /></button> </Link> <button onClick={() => handleDeleteDonationReq(d._id)} className='text-[#FF204E] text-2xl'><MdDelete /></button></td>

                                        }
                                        <td><Link to={`/donation-requests-details/${d._id}`}><button className='text-[#41B06E] hover:bg-[#41b06d5c] px-2 py-1 rounded-md '>view</button></Link></td>

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
        </div >
    );
};

export default AllDonationRequest;