import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const useGetProductGrid = () => {
    const [loading, setLoading] = useState(false);
    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/featuredProducts');

            if (!res?.data?.success) {
                toast.error("Some Error Occured. Please refresh once")
            }

            return [res?.data?.success || false, res?.data?.products || null]

        } catch (error) {
            toast.error("Some Error Occured. Please refresh once");
            return [false, null]

        } finally {
            setLoading(false);
        }
    }
    return {loading, getProducts};
}

export default useGetProductGrid