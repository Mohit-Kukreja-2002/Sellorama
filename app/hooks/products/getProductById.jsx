import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const useGetProductById = () => {
    const [loading, setLoading] = useState(false);
    const getProduct = async(id) => {
        try{
            setLoading(true);

            const response = await axiosInstance.get(`/product/${id}`);

            if(!response?.data?.success){
                toast.error(response.data.error);
                return [false, null]
            }

            return [response?.data?.success || false, response?.data?.product || null]
    
        }catch(e){
            toast.error("Error fetching the product with id: ",id)
            return [false, null]
            
        }finally{
            setLoading(false);
        }
    }
    return {loading,getProduct}
}

export default useGetProductById