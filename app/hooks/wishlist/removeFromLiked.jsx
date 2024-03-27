import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const useRemoveLikedProducts = () => {
  const [loading, setLoading] = useState(false);
  const removeLikedProduct = async(id) => {
    try {
        setLoading(true);
        const response = await axiosInstance.post('/removeFromWishlist', {id}, {
            withCredentials: true
        });

        if (!response.data?.success){
            toast.error("Failed to remove from favorites");
            return false;
        }

        return response.data?.success || false
    } 
    catch (error) {
        toast.error("Failed to remove from favorites");
        return false
    }
    finally{
        setLoading(false)
    }
  }
  return {loading, removeLikedProduct};
}

export default useRemoveLikedProducts