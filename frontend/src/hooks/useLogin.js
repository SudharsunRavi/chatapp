import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast"
import { useAuthContext } from "../context/authContext";

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthContext();

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response=await axios.post('http://localhost:5000/api/auth/login', 
                {username, password}, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            //console.log(response)
            const jwtToken = response.data.token;
            console.log(jwtToken)
        } catch (error) {
            toast.error(`Server error! ${error}. Please try again.`)
        } finally {
            setLoading(false)
        }
    }
  return {login, loading}
}

export default useLogin