import useGetUsers from "../../hooks/useGetUsers";
import useConversation from "../../zustand_store/useConversation";
import Messages from "./Messages"
import SendMessage from "./SendMessage"

const MessagesContainer = () => {

  //const {loading, conversation}=useGetUsers();
  //console.log(conversation)

  const {selectedConversation, setSelectedConversation}=useConversation();
  console.log(selectedConversation)

  return (
    <>
    {selectedConversation ? (<div className="flex flex-col h-screen relative">
      <div>
        <span>To: </span>
        <span>{selectedConversation.full_name}</span>
      </div>
    
      <div className="mt-6 overflow-auto flex-1 max-h-[calc(100vh-400px)]">
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
      </div>

      <div className="absolute bottom-72 flex-1 w-[270px]">
        <SendMessage />
      </div>
      
    </div>) :
    
    (<div className="flex flex-col h-screen relative">
      <div className="flex-1 max-h-[calc(100vh-400px)]">
        <div className="flex justify-center items-center h-full">
          <span className="text-xl text-slate-300">Select a conversation to start <br/> messaging</span>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default MessagesContainer