import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { motion } from "framer-motion";

const Profile = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: users } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });
    const { districts, upazilas } = useLoaderData();
    const [bloodGroup, setBloodGroup] = useState(users?.bloodGroup, refetch);
    const [district, selectDistrict] = useState(null);
    const [upazila, selectUpazila] = useState(null);
    const [edit, setEdit] = useState(false)

    console.log(users);




    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-4xl mx-auto'>
            <Helmet>
                <title>BloodBridge | Profile</title>
            </Helmet>
            <div className="">
                <motion.div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <img className='w-52 rounded-badge mx-auto mt-4' src={users?.image} alt="" />
                        <h1 className="text-center text-5xl font-bold py-4">User Profile</h1>
                        <button className='btn btn-accent'>Edit</button>
                        <form onSubmit={''} className="card-body grid grid-cols-1 md:grid-cols-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input defaultValue={edit ? user?.email : users?.email} readOnly={!edit} name="email" type="email" placeholder="Enter email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input defaultValue={edit ? users?.name : users?.name} readOnly={!edit} name="name" type="text" placeholder="Enter name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Upload Avatar*</span>
                                </label>
                                <input required type="file" id="fileInput" name="fileInput" className="file-input file-input-bordered w-full max-w-xl" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Blood Group*</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xl"
                                    value={edit ? bloodGroup : users?.bloodGroup}
                                    defaultValue={users?.bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    required
                                    disabled={!edit}
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">District</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xl"
                                    value={edit ? (district || '') : (users?.district || '')}
                                    onChange={(e) => selectDistrict(e.target.value)}
                                    disabled={!edit}
                                >
                                    <option disabled value="">
                                        {users?.district ? users?.district : "No district set"}
                                    </option>
                                    {districts.map(d => (
                                        <option value={d.name} key={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold ">Upazila</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xl"
                                    value={edit ? (upazila || '') : (users?.upazila || '')}
                                    onChange={(e) => selectUpazila(e.target.value)}
                                    disabled={!edit}
                                >
                                    <option disabled value="">
                                        {users?.upazila ? users?.upazila : "No district set"}
                                    </option>

                                    {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>
                            </div>


                            <div className="form-control mt-6 md:col-span-2">
                                <button type="submit" className="btn bg-[#FF6D60] text-white">Create an account</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;