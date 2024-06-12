import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useLocationApi from '../../hook/useLocationApi';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import useCurrentUser from '../../hook/useCurrentUser';

const UpdateDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    // const { user } = useContext(AuthContext);
    const { id } = useParams();

    const {currentUser} = useCurrentUser()

    const { data: donationReq,refetch } = useQuery({
        queryKey: ['donationById', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            setBloodGroup(data.bloodGroup || '');
            selectDistrict(data.district || '');
            selectUpazila(data.upazila || '');
            setStartDate(new Date(data.donationDate) || new Date());
        }
    });

    const { upazilas, districts } = useLocationApi();
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, selectDistrict] = useState('');
    const [upazila, selectUpazila] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (donationReq) {
            setBloodGroup(donationReq.bloodGroup || '');
            selectDistrict(donationReq.district || '');
            selectUpazila(donationReq.upazila || '');
            setStartDate(new Date(donationReq.donationDate) || new Date());
        }
    }, [donationReq]);


    const date = new Date(startDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
    const year = date.getFullYear();

    // Construct the formatted date string
    const donation_date = `${year}-${month}-${day}`;


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const recipientName = form.recipient_name.value;
        const hospitalName = form.hospital_name.value;
        const donationTime = form.time.value;
        const requestMessage = form.message.value;
        const address = form.address.value;

        const formData = {
            bloodGroup: bloodGroup,
            district: district,
            upazila: upazila,
            recipientName: recipientName,
            hospitalName: hospitalName,
            donationDate: donation_date,
            donationTime: donationTime,
            requestMessage: requestMessage,
            address: address,
        }

        axiosSecure.patch(`/update-donation-request/${id}`, formData)
            .then(res => {
                if (res.data.modifiedCount>0) {
                    Swal.fire({
                        title: "Congratulation!",
                        text: "Donation request is Updated!",
                        icon: "success",
                    });
                    refetch()
                } else {
                    console.log(res);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            })
    };

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto'>
            <Helmet>
                <title>BloodBridge | create donation request</title>
            </Helmet>
            <div className="">
                <motion.div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <h1 className="text-center text-5xl font-bold py-4">Create Donation Request</h1>
                        <form onSubmit={handleFormSubmit} className="card-body grid grid-cols-1 md:grid-cols-2">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input value={currentUser?.name} readOnly name="name" type="text" placeholder="Enter name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input defaultValue={currentUser?.email} readOnly name="email" type="email" placeholder="Enter email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Recipient Name</span>
                                </label>
                                <input defaultValue={donationReq?.recipientName} name="recipient_name" type="text" placeholder="Enter recipient name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Blood Group*</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xl"
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    required
                                >
                                    <option disabled value="">{donationReq?.bloodGroup}</option>
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
                                    value={district}
                                    onChange={(e) => selectDistrict(e.target.value)}
                                >
                                    <option disabled value=''>{donationReq?.district}</option>
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
                                    value={upazila}
                                    onChange={(e) => selectUpazila(e.target.value)}
                                >
                                    <option disabled value="">{donationReq?.upazila}</option>
                                    {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Hospital Name</span>
                                </label>
                                <input defaultValue={donationReq?.hospitalName} name="hospital_name" type="text" placeholder="Enter hospital name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Full address line</span>
                                </label>
                                <input defaultValue={donationReq?.address} name="address" type="text" placeholder="Enter full address" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Donation date</span>
                                </label>
                                <DatePicker className="w-full border py-3 rounded-lg px-4" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Donation time</span>
                                </label>
                                <input defaultValue={donationReq?.donationTime} name="time" type="text" placeholder="Enter donation time" className="input input-bordered" required />
                            </div>
                            <div className="form-control lg:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold">Request message</span>
                                </label>
                                <textarea defaultValue={donationReq?.requestMessage} name="message" type="text" placeholder="Enter request message" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6 md:col-span-2">
                                <button type="submit" className={`btn bg-[#FF6D60] text-white`}>Update</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateDonationRequest;
