import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2'

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterChange, setFilterChange] = useState('');


    const { refetch, data: allUsersData = {} } = useQuery({
        queryKey: ['allUsers', currentPage, itemsPerPage, filterChange],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage - 1}&size=${itemsPerPage}&status=${filterChange}`);
            return res.data;
        }
    });

    const allUsers = allUsersData.users || [];
    const totalCount = allUsersData.totalCount || 0;
    const numberOfPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);

    // console.log(allUsers);


    const handleStatus = (id, value) => {
        console.log(id, value);
        if (value === 'active') {
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
                    axiosSecure.patch(`/users/updateStatus/${id}`, { IsActive: 'active' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'User is Active now',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });

        } else if (value === 'blocked') {
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
                    axiosSecure.patch(`/users/updateStatus/${id}`, { IsActive: 'blocked' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'User is Blocked now',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });

        } else if (value === 'volunteer') {
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
                    axiosSecure.patch(`/users/updateStatus/${id}`, { role: 'volunteer' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'User is Volunteer now',
                                    icon: "success"
                                });
                                refetch()
                            }
                        })

                }
            });

        } else if (value === 'admin') {
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
                    axiosSecure.patch(`/users/updateStatus/${id}`, { role: 'admin' })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Changed!",
                                    text: 'User is Admin now',
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
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>All Users</h1>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1 bg-[#0d92753c] text-[#0D9276]">Filter</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setFilterChange('')}>All Users</a></li>
                    <li><a onClick={() => setFilterChange('active')}>Active</a></li>
                    <li><a onClick={() => setFilterChange('blocked')}>Blocked</a></li>
                </ul>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>avatar</th>
                            <th>name & email</th>
                            <th>role</th>
                            <th>Status</th>
                            <th>Block Action</th>
                            <th>Volunteer Action</th>
                            <th>Admin action</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allUsers.map(u =>
                            <tr key={u._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={u?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3 max-w-xs">
                                        <div>
                                            <div className="font-bold">{u?.name}</div>
                                            <div className="text-sm opacity-50">{u?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{u?.role}</td>
                                <td>{u?.IsActive}</td>
                                <td>
                                    {
                                        u?.IsActive === 'active' ?
                                            <button onClick={() => handleStatus(u?._id, 'blocked')} className="btn btn-xs bg-[#ff204d37]  text-[#FF204E]">Block User</button> :
                                            <button onClick={() => handleStatus(u?._id, 'active')} className="btn bg-[#83b5ff2c]  btn-xs text-[#83B4FF] ">Active User</button>


                                    }
                                </td>
                                <td>
                                    {
                                        u?.role === 'volunteer' ?
                                            <button className="btn btn-ghost btn-xs ">Already Volunteer</button> :
                                            <button onClick={() => handleStatus(u?._id, 'volunteer')} className="btn btn-ghost btn-xs bg-[#ff91003f] text-[#FF8F00]">Make Volunteer</button>
                                    }
                                </td>
                                <td>
                                    {
                                        u?.role === 'admin' ?
                                            <button className="btn btn-ghost btn-xs ">Already Admin</button> :
                                            <button onClick={() => handleStatus(u?._id, 'admin')} className="btn btn-ghost btn-xs bg-[#04d0013a] text-[#06D001]">Make Admin</button>
                                    }
                                </td>
                                {/* <td>
                                    <details className="dropdown dropdown-end my-5">
                                        <summary className="m-1 btn"><BsThreeDotsVertical /></summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[999] bg-base-100 rounded-box w-52">
                                            <li><a>  {
                                                u?.IsActive === 'active' ?
                                                    <button onClick={() => handleStatus(u?._id, 'blocked')} className="btn btn-xs bg-[#ff204d37]  text-[#FF204E]">Block User</button> :
                                                    <button onClick={() => handleStatus(u?._id, 'active')} className="btn bg-[#83b5ff2c]  btn-xs text-[#83B4FF] ">Active User</button>


                                            }</a></li>
                                            <li><a>
                                                {
                                                    u?.role === 'volunteer' ?
                                                        <button className="btn btn-ghost btn-xs ">Already Volunteer</button> :
                                                        <button onClick={() => handleStatus(u?._id, 'volunteer')} className="btn btn-ghost btn-xs bg-[#ff91003f] text-[#FF8F00]">Make Volunteer</button>
                                                }
                                            </a></li>
                                            <li><a>
                                                {
                                                    u?.role === 'admin' ?
                                                        <button className="btn btn-ghost btn-xs ">Already Admin</button> :
                                                        <button onClick={() => handleStatus(u?._id, 'admin')} className="btn btn-ghost btn-xs bg-[#04d0013a] text-[#06D001]">Make Admin</button>
                                                }
                                            </a></li>
                                        </ul>
                                    </details>
                                </td> */}
                            </tr>
                        )}
                    </tbody>
                </table>
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

export default AllUsers;
