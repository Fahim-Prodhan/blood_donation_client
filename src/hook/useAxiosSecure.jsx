import axios from "axios";
import mainUrl from "../services/helper";

const axiosSecure = axios.create({
    baseURL: mainUrl
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;