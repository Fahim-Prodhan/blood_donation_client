import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import useLocationApi from '../../hook/useLocationApi';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useCurrentUser from '../../hook/useCurrentUser';



const CreateDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    console.log(user);

    const {currentUser} = useCurrentUser()



    const { upazilas, districts } = useLocationApi()
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, selectDistrict] = useState('');
    const [upazila, selectUpazila] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const date = new Date(startDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because January is 0
    const year = date.getFullYear();

    // Construct the formatted date string
    const donation_date = `${year}-${month}-${day}`;

    // console.log(users);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const recipientName = form.recipient_name.value;
        const hospitalName = form.hospital_name.value;
        const donationTime = form.time.value;
        const requestMessage = form.message.value;
        const address = form.address.value;

        if(currentUser.IsActive === 'blocked'){
            Swal.fire({
                icon: "error",
                title: "Your can't create donation request",
                text: "Your account is blocked!",
              });
              form.reset()
            return
        }

        const formData = {
            name: name,
            email: email,
            bloodGroup: bloodGroup,
            district: district,
            upazila: upazila,
            recipientName: recipientName,
            hospitalName:hospitalName,
            donationDate:donation_date,
            donationTime:donationTime,
            requestMessage:requestMessage,
            address:address,
            status:'pending'
        }

        axiosSecure.post(`/create-donation-request`, formData)
        .then(res=>{
            if (res.data.insertedId) {
                Swal.fire({
                  title: "Congratulation!",
                  text: "New donation request is created!",
                  icon: "success",
                });
  
                form.reset();
              } else {
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
                        <h1 className="text-center text-3xl lg:text-5xl font-bold py-4">Create Donation Request</h1>
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
                                <input name="recipient_name" type="text" placeholder="Enter recipient name" className="input input-bordered" required />
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
                                    <option disabled selected value="">Select blood group</option>
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
                                    <option disabled selected value="">Select recipient  districts</option>
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
                                    <option disabled selected value="">Select recipient  upazila</option>
                                    {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Hospital Name</span>
                                </label>
                                <input name="hospital_name" type="text" placeholder="Enter hospital name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Full address line</span>
                                </label>
                                <input name="address" type="text" placeholder="Enter full address" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Donation date</span>
                                </label>
                                <DatePicker className="w-full border py-3 rounded-lg px-4" selected={startDate} onChange={(date) => setStartDate(date)} > </DatePicker>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Donation time</span>
                                </label>
                                <input name="time" type="text" placeholder="Enter donation time" className="input input-bordered" required />
                            </div>
                            <div className="form-control lg:col-span-2">
                                <label className="label">
                                    <span className="label-text font-bold">Request message</span>
                                </label>
                                <textarea name="message" type="text" placeholder="Enter  request message" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6 md:col-span-2">
                                <button type="submit" className={`btn bg-[#FF6D60] text-white`}>Request</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateDonationRequests;