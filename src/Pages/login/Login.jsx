/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import auth from "../../firebase/firebase.config";
import logo from '../../assets/images/logo.png'
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";


const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()

    const [eye, setEye] = useState(false)

    const togglePassword = () => {
        setEye(!eye)
    }




    const handleSingInUser = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email');
        const password = form.get('password');

        signInUser(email, password)
            .then(() => {
                // console.log(res.user);
                toast.success("Login Successful", {
                    position: "top-right",
                    duration: 5000,
                    style: { width: '250px', height: '70px' },
                });
                    navigate(location.state ? `${location.state}` : '/')     
            })
            .catch(error => {
                toast.error("Something is went wrong", {
                    position: "top-right",
                    duration: 5000,
                    style: { width: '250px', height: '70px' },
                });
                console.log(error);
            })
    }


    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <Helmet>
                <title>BloodBridge | Login</title>
            </Helmet>
            <div className="relative md:top-10 md:min-h-[580px]">
                <div className="grid md:grid-cols-2 gap-7">
                    <motion.div initial={{opacity:.7, scale:0.7, x:-200}} whileInView={{opacity:1, scale:1, x:0}} transition={{duration: 0.6}} viewport={{once:true}} className="lg:py-0 py-4 ">
                        <div className='flex justify-center lg:justify-start my-6'>
                            <img className='lg:w-[40%] w-1/2' src={logo} alt="" />
                        </div>
                        <div >
                            <h1 className='font-bold text-xl md:text-3xl lg:text-4xl text-center lg:text-left'>Login your BloodBridge account</h1>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Give blood, give life. Your donation can be someone's salvation</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Your blood is precious: Donate, save a life, make a difference.</p>
                            <p className='flex items-center gap-1 my-4 lg:text-xl'><span className='text-2xl text-[#68D2E8]'><TiTick /></span>Donate blood, save lives. Be a hero today!</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{opacity:.7, scale:0.7, x:200}} whileInView={{opacity:1, scale:1, x:0}} transition={{duration: 0.6}} viewport={{once:true}} className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSingInUser} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2 label">
                                    <input name="password" type={eye ? "text" : "password"} className="grow" placeholder="Password" />
                                    <span onClick={togglePassword} className="text-xl -ml-10 md:-ml-0">{eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}</span>
                                </label>
                                <label className="label">
                                    <p className="pt-2 text-sm">Don't Have any account? <span className="text-blue-400"><Link to='/register'>Register</Link></span></p>
                                </label>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn bg-[#FF6D60] text-white">Login</button>
                                </div>
                            </div>

                        </form>
                    </motion.div>
                </div>
            </div>
        </div >
    );
};

export default Login;