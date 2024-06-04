import  { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';

const useDonationRequest = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)

    const { refetch, data: donationRequests = [] } = useQuery({
        queryKey: ['donationRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request?email=${user?.email}`)
            return res.data
        }
    })
    return { refetch, donationRequests }
};

export default useDonationRequest;