import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const BlogsPublic = () => {
    const blogs = useLoaderData()
    const [index, setIndex] = useState(6)

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <h1 className='text-4xl text-center font-bold pb-8 text-[#FF204E]'>Blogs</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    blogs.slice(0, index).map(b =>
                        <div key={b?._id} className="card rounded-none glass">
                            <figure><img src={b?.image} alt="car!" /></figure>
                            <p className='my-4 ml-8'>Blog</p>
                            <div className="mx-8 mb-8">
                                <h2 className="card-title">{b?.title}</h2>
                                <div className="card-actions justify-end">
                                    <Link to={`/blogsDetails/${b?._id}`}><button className="btn text-white bg-[#FF204E]">Learn now!</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                blogs.length >= index &&
                <div className='my-8 text-center'>
                    <button onClick={() => setIndex(index + 6)} className='btn btn-accent text-white'>See More</button>
                </div>
            }
        </div>
    );
};

export default BlogsPublic;