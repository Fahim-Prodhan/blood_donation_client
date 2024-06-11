import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hook/useAxiosPublic';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const BlogsDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get(`/posts/${id}`).then(res => {
            setBlog(res.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching blog post:", error);
            setLoading(false);
        });
    }, [axiosPublic, id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            {blog.image && <img className='mx-auto mt-4' src={blog.image} alt={blog.title} />}
            <h1 className='text-4xl text-center font-bold py-8 text-[#FF204E]'>{blog.title}</h1>
            {blog.content ? <p>{parse(blog.content)}</p> : <p>No content available.</p>}
        </div>
    );
};

export default BlogsDetails;
