import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react"
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    async function sendMessage(message, id) {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/sendMessageBuyer',
                { message, id },
                { withCredentials: true, }
            )

            if (!response.data?.success) {
                toast.error("Unable to send Message! Please refresh once")
                return false
            }

            return response.data?.success || false
        } catch (error) {
            toast.error("Some Error Occurred! Please refresh once")
            return false

        } finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage }
}

export default useSendMessage