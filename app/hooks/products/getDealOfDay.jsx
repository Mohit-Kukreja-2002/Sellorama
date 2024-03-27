import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const useGetDealOfDay = () => {
    const [loading, setLoading] = useState(false);
    async function getProducts() {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/dealOfDay');

            if (!res?.data?.success) {
                toast.error("Some Error Occured. Please refresh once")
            }

            return [res?.data?.success || false, res?.data?.products || null, res?.data?.timeLeft || 86399]

        } catch (error) {
            toast.error("Some Error Occured. Please refresh once");
            return [false, null, 86399];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getProducts };
}

export default useGetDealOfDay