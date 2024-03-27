import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetChattedSellers = () => {
    const [loading, setLoading] = useState(false);
    async function getSidebarSellers() {
        try {
            setLoading(true);

            const response = await axiosInstance.get('/getChattedSellers', {
                withCredentials: true,
            })

            if (!response.data?.success) {
                toast.error(response.data?.error || "Unable to fetch chats! Please refresh once")
                return [false, null, null];
            }

            return [response.data?.success || false, response.data?.sellers || null , response.data?.messages || null]
        } catch (error) {
            toast.error("Some Error Occurred! Please refresh once")
            return [false, null, null];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getSidebarSellers }
}

export default useGetChattedSellers