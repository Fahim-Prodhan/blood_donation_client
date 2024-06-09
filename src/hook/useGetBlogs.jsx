import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useGetBlogs = () => {

    const axiosPublic = useAxiosPublic()

    const {refetch, data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts')
            return res.data
        }
    })
    return {blogs, refetch}
};

export default useGetBlogs;