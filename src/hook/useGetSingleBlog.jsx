import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetSingleBlog = ({id}) => {
    const axiosSecure = useAxiosSecure()

    const {refetch, data: blog = [] } = useQuery({
        queryKey: ['singleBlog'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${id}`)
            return res.data
        }
    })
    return {blog, refetch}
};

export default useGetSingleBlog;