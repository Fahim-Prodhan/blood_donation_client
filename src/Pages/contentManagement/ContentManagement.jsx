

import { FaEdit } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useGetBlogs from '../../hook/useGetBlogs';
import parse from 'html-react-parser';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ContentManagement = () => {

    const {blogs, refetch} = useGetBlogs();
    const axiosSecure = useAxiosSecure();

    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/posts/${id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          refetch()
                    }
                })   
            }
          });
    }


    return (
        <div className='mx-6'>
            <h1 className='text-4xl text-center text-[#FF204E] font-bold py-12'>Content Management</h1>
            <div className='grid grid-cols-2'>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1 bg-[#0d92753c] text-[#0D9276]">Filter</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                <div className='text-right'>
                    <Link to='/dashboard/content-management/add-blog'><button className="btn bg-[#0d92754f] text-[#0D9276]"><IoMdAddCircle /> Add Blog</button></Link>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Tile</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                           {
                            blogs.map(b =>  <tr key={b?._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={b?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td><p className='font-bold'>{b?.title}</p> </td>
                                <td> <p>{parse(b?.content.slice(0,70))}...</p></td>
                                <td>
                                  <button className="btn-sm btn text-[#FC4100] bg-[#fc3f0034]">{b?.status}</button>
                                </td>
                                <td className='space-x-2'><Link to={`/dashboard/content-management/update/${b?._id}`}><button className='text-[#615EFC] text-2xl'><FaEdit /></button> </Link> <button onClick={() => handleDelete(b?._id)} className='text-[#FF204E] text-2xl'><MdDelete /></button></td>
                            </tr>)
                           }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;