import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const useAddToLiked = () => {
  const [loading, setLoading] = useState(false);
  const likeProduct = async(id) => {
    try {
        setLoading(true);
        const response = await axiosInstance.post('/addToWishlist', {id}, {
            withCredentials: true
        });
        console.log(response)
        if (!response.data?.success){
            toast.error("Failed to add to favorites");
            return false;
        }

        return response.data?.success || false
    } 
    catch (error) {
        toast.error("Failed to add to favorites");
        return false
    }
    finally{
        setLoading(false)
    }
  }
  return {loading, likeProduct};
}

export default useAddToLiked