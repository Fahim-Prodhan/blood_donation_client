import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { useParams } from 'react-router-dom';
import { BiDonateHeart } from 'react-icons/bi';
import Swal from 'sweetalert2';

const DonationReqDetails = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [singleDonation, setSingleDonation] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axiosSecure.get(`/my-donation-request/${id}`)
                .then(res => {
                    setSingleDonation(res.data)
                    setLoading(false)
                })
        }, 1000);
    }, [axiosSecure, id])

    // const { data: singleDonation, refetch } = useQuery({
    //     queryKey: ['donationSingle', id],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/my-donation-request/${id}`);
    //         return res.data;
    //     },
    // });

    const handleDonate = (e) => {
        e.preventDefault()
        const form = e.target
        const donorName = form.donor_name.value;
        const donorEmail = form.donor_email.value;

        const formData = {
            donorName: donorName,
            donorEmail: donorEmail,
            status: 'inprogress'
        }

        axiosSecure.patch(`/update-donation-request-done/${id}`, { formData })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    document.getElementById('my_modal_3').close()
                    setTimeout(() => {
                    }, 100);
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Thanks for become a donor",
                        showConfirmButton: false,
                        timer: 1500
                    })

                } else {
                    console.log(res.data);
                }
            })

        console.log(formData);
    }
    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span></div>
    }
    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto mt-4 lg:mt-12'>
            <div className="bg-base-100 shadow-xl">
                <div className="card-body justify-center">

                    <h1 className=' text-2xl md:text-4xl text-center text-[#FF204E] font-bold'> < BiDonateHeart className='text-7xl mx-auto' /> Donation Requests Details</h1>
                    <div className='grid md:grid-cols-2 items-center mt-12 gap-4'>
                        <p className='md:text-xl'><span className='font-bold'>Requester Name:</span> {singleDonation?.name}</p>
                        <p className='md:text-xl'><span className='font-bold'>Requester email:</span> {singleDonation?.email}</p>
                        <p className='md:text-xl'><span className='font-bold'>Recipient Name:</span> {singleDonation?.recipientName}</p>
                        <p className='md:text-xl'><span className='font-bold'>Blood Group:</span> {singleDonation?.bloodGroup}</p>
                        <p className='md:text-xl'><span className='font-bold'>District:</span> {singleDonation?.district}</p>
                        <p className='md:text-xl'><span className='font-bold'>Upazila:</span> {singleDonation?.upazila}</p>
                        <p className='md:text-xl'><span className='font-bold'>Full Address:</span> {singleDonation?.address}</p>
                        <p className='md:text-xl'><span className='font-bold'>Hospital Name:</span> {singleDonation?.hospitalName}</p>
                        <p className='md:text-xl'><span className='font-bold'>Donation date:</span> {singleDonation?.donationDate}</p>
                        <p className='md:text-xl'><span className='font-bold'>Donation time:</span> {singleDonation?.donationTime}</p>
                        <p className='md:text-xl'><span className='font-bold'>Request Message:</span> {singleDonation?.requestMessage}</p>
                        <p className='md:text-xl'><span className='font-bold'>Status:</span> {singleDonation?.status}</p>
                    </div>
                    <div className='text-center mt-12'>
                        <button disabled={singleDonation?.status !== 'pending'} onClick={() => document.getElementById('my_modal_3').showModal()} className="btn  bg-[#ff204d41] text-[#FF204E]">Donate</button>
                    </div>
                </div>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg text-center">Donor Information</h3>
                    <form onSubmit={handleDonate} className='mt-4 space-y-3'>
                        <label className="input input-bordered flex items-center gap-2">
                            Donor Name:
                            <input name='donor_name' value={user?.displayName} type="text" className="grow" placeholder="" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Donor Email:
                            <input name='donor_email' value={user?.email} type="email" className="grow" placeholder="" />
                        </label>
                        <div className='text-center'>
                            <button type='submit' className="btn text-[#40A2E3] bg-[#40a2e33a]">Confirm</button>

                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationReqDetails;