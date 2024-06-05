import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { refetch, data: allUsers = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    console.log(allUsers);

    return (
        <div>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>All Users</h1>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1 bg-[#0d92753c] text-[#0D9276]">Filter</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
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
                            <th>status</th>
                            <th>Block Action</th>
                            <th>Volunteer Action</th>
                            <th>Admin action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            allUsers.map(u =>
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
                                    <td>
                                        {u?.role}
                                    </td>
                                    <td>{u?.IsActive}</td>
                                    <td> <button className="btn btn-ghost btn-xs text-[#FF204E]">Block</button></td>

                                    <td>
                                        <button className="btn btn-ghost btn-xs text-[#40A2E3]">Make Volunteer</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs text-[#0D9276]">Make Admin</button>
                                    </td>
                                </tr>

                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;