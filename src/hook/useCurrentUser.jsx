import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { refetch, data: currentUser } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/currentUsers?email=${user?.email}`);
            return res.data;
        }
    });
    return {refetch, currentUser}
};

export default useCurrentUser;