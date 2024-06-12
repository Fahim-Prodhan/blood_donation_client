
import React, { useEffect, useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';


const Funding = () => {

    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [fundings, setFundings] = useState([])
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [loading, setLoading] = useState(false)


    const handleSubmit = e => {
        e.preventDefault();
        const amount = e.target.amount.value;
        navigate(`/give-funding/${amount}`)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            axiosSecure.get(`/allFunding?page=${currentPage - 1}&size=${itemsPerPage}`)
                .then(res => {
                    setFundings(res.data.allFunds)
                    setTotalCount(res.data.totalCount)
                    setLoading(false)
                })
        }, 1000);

    }, [axiosSecure, currentPage, itemsPerPage])

    const numberOfPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);


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

    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span></div>
    }

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
                            fundings.map((f, index) =>
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

export default Funding;