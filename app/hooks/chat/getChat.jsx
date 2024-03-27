import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetChat = () => {
    const [loading, setLoading] = useState(false);
    async function getConversations(id, page=1) {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/getMessagesBuyer', {id, page} ,{
                withCredentials: true,
            })

            if (!response.data?.success) {
                console.log(response)
                toast.error("Unable to fetch chats! Please refresh once")
                return [false, []];
            }

            return [response.data?.success || false, response.data?.messages || []]
        } catch (error) {
            toast.error("Some Error Occurred! Please refresh once")
            return [false, []];

        } finally {
            setLoading(false);
        }
    }
    return { loading, getConversations }
}

export default useGetChat