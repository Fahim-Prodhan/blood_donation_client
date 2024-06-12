import axios from "axios";
import mainUrl from "../services/helper";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: mainUrl
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const {logout} = useContext(AuthContext);


    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config
    },function (error) {
        return Promise.reject(error)
    })

axiosSecure.interceptors.response.use(
    function (response){
        return response
    }, async (error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error)
    }
)


    return axiosSecure;
};

export default useAxiosSecure;