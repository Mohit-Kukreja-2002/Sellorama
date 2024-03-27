import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/features/authSlice";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/logoutBuyer' ,{
                withCredentials: true
            });

            if (!response.data?.success) {
                toast.error(response.data?.error);
                return false;
            }

            toast.success("Logout Successful");
            dispatch(setLogout())
            return response.data?.success || false;
        }
        catch (error) {
            toast.error("Some Error Occured. Please refresh once")
            return false;
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout
