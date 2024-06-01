/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdDriveFolderUpload, MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { TiTick } from "react-icons/ti";
import logo from '../../assets/images/logo.png';
import { motion } from "framer-motion";
import useAxiosPublic from "../../hook/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const { createUser, setReload } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { districts, upazilas } = useLoaderData();
    const [eye, setEye] = useState(false);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [district, selectDistrict] = useState(null);
    const [upazila, selectUpazila] = useState(null);

    const togglePassword = () => {
        setEye(!eye);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const fileInput = form.fileInput;
        const file = fileInput.files[0];

        const res = await axiosPublic.post(image_hosting_api, { image: file }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const imgURL = res.data.data.display_url

        if (res.data.success) {
            // Add your user creation logic here
            await createUser(email, password)
                .then(res => {
                    // update the profile with current name and photoUrl
                    updateProfile(res.user, {
                        displayName: name, photoURL: imgURL
                    })
                        .then(() => {
                            setReload(true)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    toast.success("Registration Successful", {
                        position: "top-right",
                        duration: 5000,
                        style: { width: '250px', height: '70px' },
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 1600);
                    // console.log(res.user);
                })
                .catch(error => {
                    toast.error("Something went wrong!", {
                        position: "top-right",
                        duration: 5000,
                        style: { width: '250px', height: '70px' },
                    });
                    console.log(error);
                });
        }


    };

    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <Helmet>
                <title>BloodBridge | Register</title>
            </Helmet>
            <div className="">
                <div className="grid lg:grid-cols-2 gap-7">
                    <motion.div initial={{ opacity: 0.7, scale: 0.7, x: -200 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:py-0 py-4 ">
                        <div className='flex justify-center lg:justify-start my-6'>
                            <img className='lg:w-[40%] w-1/2' src={logo} alt="Logo" />
                        </div>
                        <div>
                            <h1 className='font-bold text-xl md:text-3xl lg:text-4xl text-center lg:text-left'>Create your BloodBridge account</h1>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Give blood, give life. Your donation can be someone's salvation</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Your blood is precious: Donate, save a life, make a difference.</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Donate blood, save lives. Be a hero today!</p>
                        </div>

                    </motion.div>
                    <motion.div initial={{ opacity: 0.7, scale: 0.7, x: 200 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <h1 className="text-center text-5xl font-bold py-4">Register</h1>
                        <form onSubmit={handleRegister} className="card-body grid grid-cols-1 md:grid-cols-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Enter name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Upload Avatar*</span>
                                </label>
                                <input required type="file" id="fileInput" name="fileInput" className="file-input file-input-bordered w-full max-w-xs" />
                            </div>
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
                                    <option disabled selected>Select your Blood Group</option>
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
                                >
                                    <option disabled selected>Select your District</option>
                                    {districts.map(d => <option value={d.name} key={d.id}>{d.name}</option>)}
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
                                >
                                    <option disabled selected>Select your Upazila</option>

                                    {upazilas.map(u => <option value={u.name} key={u.id}>{u.name}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="password" type={eye ? "text" : "password"} className="grow" placeholder="Password" />
                                    <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Confirm Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="confirm_password" type="password" className="grow" placeholder="Password" />
                                </label>
                            </div>
                            <div>
                                <label className="label">
                                    <p className="pt-2 text-sm">Already have an account? <span className="text-blue-400"><Link to='/login'>Login</Link></span></p>
                                </label>
                            </div>
                            <div className="form-control mt-6 md:col-span-2">
                                <button type="submit" className="btn bg-[#FF6D60] text-white">Create an account</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
