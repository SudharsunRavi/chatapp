import useConversation from "../zustand_store/useConversation"

const ConversationSidebar = ({conversation}) => {
  //console.log(conversation)
  const {selectedConversation, setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?.id===conversation.id;

  return (
    <div className={`flex w-72 h-[60px] pt-[6px] pl-1 ${isSelected ? "bg-primary" : ""} `} onClick={()=>setSelectedConversation(conversation)}>
        <div>
            <img src={conversation.profile_pic} 
                    alt="user"
                    className="h-12 rounded-full"
            /><br/>
        </div>

        <div className="flex items-stretch justify-between mt-2 ml-2">
            <h1 className="text-lg">{conversation.full_name}</h1>
        </div>
    </div>
  )
}

export default ConversationSidebar