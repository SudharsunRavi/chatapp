import useGetUsers from "../../hooks/useGetUsers";
import Messages from "./Messages"
import SendMessage from "./SendMessage"

const MessagesContainer = () => {

  const {loading, conversation}=useGetUsers();
  console.log(conversation)

  return (
    <div className="flex flex-col h-screen">
      <div>
        <span>To: </span>
        <span>Sudharsun</span>
      </div>
    
      <div className="mt-6 overflow-auto flex-1 max-h-[calc(100vh-400px)]">
        <Messages />
        <Messages /><Messages /><Messages /><Messages /><Messages /><Messages /><Messages /><Messages /><Messages />
      </div>

      <div className="fixed bottom-[110px] w-[270px]">
        <SendMessage />
      </div>
      
    </div>
  );
};

export default MessagesContainer