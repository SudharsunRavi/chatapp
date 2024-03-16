import { useEffect } from "react";
import ConversationSidebar from "../components/ConversationSidebar"
import MessagesContainer from "../components/Messages/MessagesContainer"
import LogoutBtn from "../components/Messages/LogoutBtn";
import toast from "react-hot-toast";
import useGetUsers from "../hooks/useGetUsers";

const Landing = () => {

    const {loading, conversation}=useGetUsers();

    useEffect(()=>{
        toast.success('Logged in successfully');
    },[])

  return (

    <div className="flex justify-center sm:h-[450px] md:h-[550px] overflow-hidden mt-[8%]">
        
       <div className="flex flex-col items-center justify-stretch border border-slate-600 rounded-l-lg px-6 py-8 relative">
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Search"/>
                    </div>
                </div>
                <button className="btn join-item">Search</button>
            </div>

            <div className="divider px-3"></div>

            <div className="overflow-y-scroll">
                {conversation.map((user)=>(
                    <ConversationSidebar key={user.id} conversation={user}/>
                ))}
            </div>

            <div className="absolute bottom-8">
                <LogoutBtn/>
            </div>
        </div>

        <div className="border border-slate-600 rounded-r-lg px-6 py-8">
            <MessagesContainer/>
            
            
        </div>
    </div>
  )
}

export default Landing