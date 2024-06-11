import  { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';

const useDonationRequest = ({currentPage,itemsPerPage}) => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    

    const { refetch, data: donationRequests = {} } = useQuery({
        queryKey: ['donationRequests', user?.email,currentPage,itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request?page=${currentPage - 1}&size=${itemsPerPage}&email=${user?.email}`)
            return res.data
        }
    })
    return { refetch, donationRequests }
};

export default useDonationRequest;