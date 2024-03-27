import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/categories')
      if (!res?.data?.success) {
        toast.error("Some Error Occured. Please refresh once")
      }
      setLoading(false)
      return [res?.data?.success || false, res?.data?.result || null];
    } catch (e) {
      toast.error("Some Error Occured. Please refresh once")
      return [false, null];
    } finally {
      setLoading(false);
    }
  }
  return { loading, getCategories };
}

export default useGetCategories