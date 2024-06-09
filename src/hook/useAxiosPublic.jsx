import axios from "axios";
import mainUrl from "../services/helper";

const axiosPublic = axios.create({
    baseURL: mainUrl
})

const  useAxiosPublic= () =>{
    return axiosPublic
}
export default useAxiosPublic