import { useAuthContext } from "../../context/authContext"
import useConversation from "../../zustand_store/useConversation";

const SingleMessage = () => {

    const {user}=useAuthContext();
    const {selectedConversation} = useConversation();

  return (
    <div>
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>

            <div className="chat-header">
                Sudharsun
                <time className="text-xs opacity-50">12:45</time>
            </div>

            <div className="chat-bubble">You were the Chosen One!</div>
    
        </div>

        <div className="chat chat-end mt-3">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            
            <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">
                Seen at 12:46
            </div>
        </div>
    </div>
  )
}

export default SingleMessage