
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useGetBlogs = ({status}) => {

    const axiosPublic = useAxiosPublic()
    console.log(status);

    const {refetch, data: blogs = [] } = useQuery({
        queryKey: ['blogs',status],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?status=${status}`)
            return res.data
        }
    })
    return {blogs, refetch}
};

export default useGetBlogs;