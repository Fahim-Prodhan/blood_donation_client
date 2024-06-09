import React, { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2'
import useGetSingleBlog from '../../hook/useGetSingleBlog';
import { useParams } from 'react-router-dom';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateBlogs = ({ placeholder }) => { 
    const {id} = useParams()
    const {blog, refetch} = useGetSingleBlog({id:id})
    const editor = useRef(null);
    const [content, setContent] = useState(blog?.content);
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        setContent(blog?.content)
    },[blog?.content])


    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const fileInput = form.fileInput;
        const file = fileInput.files[0];


        if(!file){
            const formData = {
                title:title,
                content:content,
            }

            axiosSecure.patch(`/update-blog/${id}`,formData)
            .then(res=>{
                if(res.data.modifiedCount>0){
                    Swal.fire({
                        title: "Congratulation!",
                        text: "Blog is Updated!",
                        icon: "success",
                      });
                      refetch()
                }
            })
        }else{
            const res = await axiosSecure.post(image_hosting_api, { image: file }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const imgURL = res.data.data.display_url
    
    
            if (res.data.success) {
                const formData = {
                    title: title,
                    image: imgURL,
                    content: content,
                }
    
                axiosSecure.patch(`/update-blog/${id}`, formData)
                    .then(res => {
                        if(res.data.modifiedCount>0){
                            Swal.fire({
                                title: "Congratulation!",
                                text: "Blog is Updated!",
                                icon: "success",
                              });
                              refetch()
                        }
                    })
            }
        }

       
    }


    return (
        <div>
            <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto ">
                <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Update Blogs</h1>
                <form onSubmit={handleUpdateSubmit} className="card-body grid grid-cols-2">
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold">Title</span>
                            </div>
                            <input defaultValue={blog.title} name='title' type="text" placeholder="Type here blog title" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold">Upload Picture</span>
                            </div>
                            <input type="file" id="fileInput" name="fileInput" className="file-input file-input-bordered w-full" />
                        </label>
                    </div>
                    <div className='col-span-2'>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold">Content</span>
                            </div>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onChange={newContent => setContent(newContent)}
                            />
                        </label>

                    </div>
                    <div className='text-center my-4 col-span-2'>
                        <button className="btn bg-[#3abcf929] text-[#3ABEF9]">Update</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default UpdateBlogs;