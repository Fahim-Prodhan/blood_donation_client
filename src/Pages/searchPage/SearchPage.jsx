import React, { useState } from 'react';
import useLocationApi from '../../hook/useLocationApi';
import useAxiosPublic from '../../hook/useAxiosPublic';
// import { Link } from 'react-router-dom';

const SearchPage = () => {
    const { upazilas, districts } = useLocationApi()
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, selectDistrict] = useState('');
    const [upazila, selectUpazila] = useState('');
    const axiosPublic = useAxiosPublic();
    const [donor, setDonor] = useState([])
    const [search, setSearch] = useState(false)

    console.log(donor);

    const handleSearch = e => {
        e.preventDefault();
        console.log(bloodGroup, district, upazila);

        // Encode the query parameters
        const encodedBloodGroup = encodeURIComponent(bloodGroup);
        const encodedDistrict = encodeURIComponent(district);
        const encodedUpazila = encodeURIComponent(upazila);

        axiosPublic.get(`/search?bloodGroup=${encodedBloodGroup}&district=${encodedDistrict}&upazila=${encodedUpazila}`)
            .then(res => {
                setDonor(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
        setSearch(true)
    }

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold pb-6'>Search Donor</h1>
            <div>
                <form onSubmit={handleSearch} className='grid md:grid-cols-3'>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text font-bold ">Blood Group*</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                        >
                            <option disabled selected value=''>Select your Blood Group</option>
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
                            <span className="label-text font-bold ">District(select option)</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={district}
                            onChange={(e) => selectDistrict(e.target.value)}
                            required
                        >
                            <option disabled selected value="">Select your District</option>
                            {districts.map(d => <option value={d?.name} key={d?.id}>{d?.name}</option>)}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold ">Upazila(select option)</span>
                        </label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            value={upazila}
                            onChange={(e) => selectUpazila(e.target.value)}
                            required
                        >
                            <option disabled selected value="">Select your Upazila</option>

                            {upazilas?.map(u => <option value={u?.name} key={u?.id}>{u?.name}</option>)}
                        </select>
                    </div>
                    <div className='md:col-span-3 text-center mt-6'>
                        <button className="btn btn-success text-white">Search</button>
                    </div>
                </form>
            </div>

            {
                search &&
                <div className='pb-8'>
                    {donor.length > 0 ?
                        <div className='my-12'>
                            <h1 className='text-2xl md:text-4xl text-center font-bold pb-8 text-[#FF204E]'>Search Result</h1>
                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                                {
                                    donor.map(r =>
                                        <div key={r._id} className="card  bg-base-100 shadow-xl">
                                            <img className='w-24 mx-auto rounded-md' src={r?.image} alt="" />
                                            <div className="card-body">
                                                <h2 className="font-bold text-2xl text-center -mt-4">Blood Group: {r?.bloodGroup}</h2>
                                                <hr />
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <p className='md:col-span-2'><span className='font-bold'>Donor name:</span> {r?.name}</p>
                                                    <p className='md:col-span-2'><span className='font-bold'>Address: </span>{r?.upazila}, {r?.district}</p>
                                                </div>
                                                <hr />
                                                {/* <div className="card-actions justify-start mt-4">
                                                    <Link to={`/donation-requests-details/${r._id}`}> <button className="btn bg-[#FF204E] text-white">View Details</button></Link>
                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div> :
                        <div>
                            <h1 className='text-2xl md:text-4xl text-center font-bold pb-8 text-[#FF204E] mt-12'>No Data Available</h1>

                        </div>
                    }

                </div>
            }
        </div>
    );
};

export default SearchPage;