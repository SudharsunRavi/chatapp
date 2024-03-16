import toast from "react-hot-toast";
import useConversation from "../zustand_store/useConversation"
import axios from "axios";

const useSendMessage = () => {
    const {messages, setMessages, selectedConversation}=useConversation();

    const sendMessage=async(message)=>{
        try {
            const data=await axios.post(`http://localhost:5000/api/message/send/${selectedConversation.id}`, message, { withCredentials: true });
            console.log(data);
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {sendMessage, messages}
}

export default useSendMessage