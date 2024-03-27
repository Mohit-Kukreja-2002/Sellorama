import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetLikedProducts = () => {
    const [loading, setLoading] = useState(false)
    const getProducts = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get('/likedProducts', {
                withCredentials: true,
            })

            if (!response.data?.success) {
                toast.error("Failed to fetch your liked products");
                return [false, null];
            }

            return [response?.data?.success || false , response?.data?.likedProducts || null];

        } catch (error) {
            toast.error("Failed to fetch your liked products");
            return [false, null];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getProducts };
}

export default useGetLikedProducts