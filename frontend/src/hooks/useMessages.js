import toast from "react-hot-toast";
import useConversation from "../zustand_store/useConversation";
import axios from "axios";
import { useEffect } from "react";

const useMessages = () => {
  const {selectedConversation, messages, setMessages}=useConversation();
  
  const fetchMessages=async()=>{
    try {
        const data=await axios.get(`http://localhost:5000/api/message/${selectedConversation?.id}`, { withCredentials: true });
        setMessages(data);
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(selectedConversation?.id) fetchMessages();
  }, [selectedConversation?.id, setMessages])

  return {messages, fetchMessages}
}

export default useMessages