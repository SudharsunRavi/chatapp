import { useState } from "react"
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const useLogout = () => {

    const [loading, setLoading]=useState(false);
    const {setUser}=useAuthContext();

    const logout=async()=>{
        setLoading(true);
        try {
            const response=await axios.post('http://localhost:5000/api/auth/logout');
            localStorage.removeItem('user');
            setUser(null);
            toast.success('Logged out successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to logout');
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout}
}

export default useLogout