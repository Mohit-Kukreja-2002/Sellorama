import { useState } from 'react';
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    async function signUp (formData){
        try {
            setLoading(true); // Set loading to true when signup process starts
            const response = await axiosInstance.post('/registerBuyer', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (!response?.data?.success) {
                console.log(response.data)
                toast.error(response.data?.error);
                return "";
            }

            toast.success(response.data?.message);
            return response.data.activationToken;

        } catch (e) {
            toast.error("Some Error Occured. Please refresh once")
            return "";
        } finally {
            setLoading(false);
        }
    }
    return { loading, signUp }
}
export default useSignUp