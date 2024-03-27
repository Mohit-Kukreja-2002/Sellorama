import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const useGetSidebarProducts = () => {
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/categorisedProducts')
      if (!res?.data?.success) {
        toast.error("Some Error Occured. Please refresh once")
      }
      return [res?.data?.success || false, res?.data?.categorizedProducts || null];
      
    } catch (e) {
      toast.error("Some Error Occured. Please refresh once")
      return [false, null]

    } finally {
      setLoading(false);
    }
  }
  return { loading, getProducts };
}

export default useGetSidebarProducts