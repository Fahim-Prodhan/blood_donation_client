import React, { useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const Funding = () => {

    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = e =>{
        e.preventDefault();
        const amount = e.target.amount.value;
        navigate(`/give-funding/${amount}`)
    }


    return (
        <div className='mx-12'>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Funding Details</h1>
            <div>
                <div className='text-left'>
                    <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center gap-3'>
                        <label className="input input-bordered flex items-center gap-2 my-4">
                            Amount:
                            <input onChange={(e)=>{setAmount(e.target.value)}} name='amount' type="number" className="grow" placeholder="Funding Amount" />
                        </label>
                      <button disabled={!amount} className="btn bg-[#0d92754f] text-[#0D9276]"><BiDonateHeart className='text-2xl' />Give Funding</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Funding;