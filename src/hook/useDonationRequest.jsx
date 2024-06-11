import  { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';

const useDonationRequest = ({currentPage,itemsPerPage,status}) => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    

    const { refetch, data: donationRequests = {} } = useQuery({
        queryKey: ['donationRequests', user?.email,currentPage,itemsPerPage,status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request?page=${currentPage - 1}&size=${itemsPerPage}&email=${user?.email}&status=${status}`)
            return res.data
        }
    })
    return { refetch, donationRequests }
};

export default useDonationRequest;