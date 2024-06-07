import React from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    return (
        <div className='mx-6'>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Content Management</h1>
            <div className='text-right'>
                <Link to='/dashboard/content-management/add-blog'><button className="btn bg-[#0d92754f] text-[#0D9276]"><IoMdAddCircle /> Add Blog</button></Link>
            </div>
        </div>
    );
};

export default ContentManagement;