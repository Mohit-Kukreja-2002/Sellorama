import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const useActivate = () => {
    const [loading, setLoading] = useState(false);
    const activate = async (data) => {
        try {
            setLoading(true)

            const response = await axiosInstance.post('/activateBuyer', data, {
                withCredentials: true
            });

            if (!response.data?.success) {
                toast.error(response.data.error);
                return [false, null];
            }

            toast.success("Account Created Successfully");
            return [response?.data?.success || false, response.data?.user || null];

        } catch (error) {
            toast.error("Some Error Occured. Please refresh once")
            return [false, null];
        } finally {
            setLoading(false)
        }
    }
    return {loading, activate};
}

export default useActivate