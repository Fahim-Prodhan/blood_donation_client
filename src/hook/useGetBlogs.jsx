

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useGetBlogs = ({status}) => {

    const axiosSecure = useAxiosSecure()
    console.log(status);

    const {refetch, data: blogs = [] } = useQuery({
        queryKey: ['blogs',status],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?status=${status}`)
            return res.data
        }
    })
    return {blogs, refetch}
};

export default useGetBlogs;