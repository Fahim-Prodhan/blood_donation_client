import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllDonationReqPublic = () => {
    const req = useLoaderData();
    const [index, setIndex] = useState(6)

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <h1 className='text-4xl text-center font-bold pb-8 text-[#FF204E]'>All Donation Request</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    req.slice(0, index).map(r =>
                        <div key={r._id} className="card  bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="font-bold text-2xl">Blood Needs For: {r?.bloodGroup}</h2>
                                <hr />
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <p className='md:col-span-2'><span className='font-bold'>Recipient:</span> {r?.recipientName}</p>
                                    <p className='md:col-span-2'><span className='font-bold'>Address:</span> {r?.address}, {r?.upazila}, {r?.district}</p>
                                    <p className=''><span className='font-bold'>Date:</span> {r?.donationDate}</p>
                                    <p className=''><span className='font-bold'>Time:</span> {r?.donationTime}</p>
                                </div>
                                <hr />
                                <div className="card-actions justify-start mt-4">
                                   <Link to={`/donation-requests-details/${r._id}`}> <button className="btn bg-[#FF204E] text-white">View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                req.length >= index &&
                <div className='my-8 text-center'>
                    <button onClick={() => setIndex(index + 6)} className='btn btn-accent text-white'>See More</button>
                </div>
            }
        </div>
    );
};

export default AllDonationReqPublic;