import axios from "axios";
import { useEffect, useState } from "react"

const useGetUsers = () => {
    const [loading, setLoading]=useState(false);
    const [conversation, setConversation]=useState([]);

    useEffect(()=>{
        const fetchUsers=async()=>{
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/user/', { withCredentials: true });
                setConversation(response.data);
            } catch (error) {
                console.error("Server Error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [])

  return {loading, conversation} 
}

export default useGetUsers