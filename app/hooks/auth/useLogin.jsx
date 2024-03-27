import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const login = async (data) => {
        try {
            setLoading(true)
            const response = await axiosInstance.post('/loginBuyer', data ,{
                withCredentials: true
            });
            if (!response.data?.success) {
                toast.error(response.data?.error);
                return [false, null];
            }

            toast.success("Login Successful");
            return [response.data?.success || false, response.data?.user || null];
        }
        catch (error) {
            toast.error("Some Error Occured. Please refresh once")
            return [false, null];
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin