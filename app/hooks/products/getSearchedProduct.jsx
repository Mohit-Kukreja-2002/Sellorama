import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const useGetSearchedProducts = () => {
    const [loading, setLoading] = useState(false);
    const getProducts = async (search,page) => {
        try {
            setLoading(true);

            const response = await axiosInstance.get(`/search/${search}/${page}`);

            if(!response?.data?.success){
                return [false, []];
            }
            return [response.data?.success || false, response.data?.products || []];
        } catch (error) {
            return [false, []];
        }finally{
            setLoading(false);
        }
    }
    return {loading, getProducts}
}
export default useGetSearchedProducts