import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useLocationApi = () => {

    const axiosPublic = useAxiosPublic();

    const {refetch, data: upazilas = [] } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazilas')
            return res.data
        }
    })
    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts')
            return res.data
        }
    })

    return {refetch, upazilas, districts}
};

export default useLocationApi;