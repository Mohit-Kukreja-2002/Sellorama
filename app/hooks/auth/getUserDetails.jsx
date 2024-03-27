"use client"
import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance";

const useGetUser = () => {
    const [loading, setLoading] = useState(false);
    const getUser = async () => {
        try{
            setLoading(true);

            const response = await axiosInstance.get('/buyerInfo',{
                withCredentials: true,
            });
            
            if (!response.data?.success) {
                return [false, null];
            }
            return [true, response?.data];

        }catch(error){
            // toast.error()
            console.log("User Info not fetched: ", error);
            return [false, null];

        }finally{
            setLoading(false);
        }
    }
    return {loading,getUser};
}

export default useGetUser