import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { useAuthContext } from "../context/authContext"

const handleInput = ({ full_name, username, password, confirmPassword, gender }) => {
  if (!full_name || !username || !password || !confirmPassword || !gender) {
    toast.error('All fields are required!')
    return false
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match!')
    return false
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters!')
    return false
  }

  if (username.length < 6) {
    toast.error('Username must be at least 6 characters!')
    return false
  }

  return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthContext();
  
    const signup = async ({ full_name, username, password, confirmPassword, gender }) => {
        try {
            const success = handleInput({ full_name, username, password, confirmPassword, gender });
            if (!success) return;

            setLoading(true);

            const response = await axios.post('http://localhost:5000/api/auth/register', {
                full_name,
                username,
                password,
                confirmPassword,
                gender,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            //console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);

        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Server Error:", error.response.data.error);
                toast.error(error.response.data.error);
            } else {
                console.error("Error:", error.message); 
            }
        } finally {
            setLoading(false);
        }
        
    };

    return { loading, signup };
};

export default useSignup;


  
