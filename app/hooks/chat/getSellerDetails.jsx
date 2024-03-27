import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetSellerDetails = () => {
    const [loading, setLoading] = useState(false);
    const getSeller = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/getSellerInfoById', { id });

            if (!response.data?.success) {
                toast.error("Failed to fetch seller details")
                return [false, null];
            }
            return [response.data?.success || false, response.data?.user || null]
        } catch (error) {
            toast.error("Failed to fetch seller details")
            return [false, null];
        } finally {
            setLoading(false)
        }
    }
    return { loading, getSeller }
}
export default useGetSellerDetails