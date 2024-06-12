import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hook/useAxiosPublic';

const Funding = () => {

    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        const amount = e.target.amount.value;
        navigate(`/give-funding/${amount}`)
    }

    const fundings  = useLoaderData()
    console.log(fundings);

    return (
        <div className='mx-12'>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Funding Details</h1>
            <div>
                <div className='text-left'>
                    <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center gap-3'>
                        <label className="input input-bordered flex items-center gap-2 my-4">
                            Amount:
                            <input onChange={(e) => { setAmount(e.target.value) }} name='amount' type="number" className="grow" placeholder="Funding Amount" />
                        </label>
                        <button disabled={!amount} className="btn bg-[#0d92754f] text-[#0D9276]"><BiDonateHeart className='text-2xl' />Give Funding</button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            fundings.map((f,index) =>
                                <tr key={f._id}>
                                    <th>{index + 1}</th>
                                    <td>{f?.name}</td>
                                    <td>${f?.amount}</td>
                                    <td>{f?.date}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;