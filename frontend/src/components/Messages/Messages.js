import useMessages from "../../hooks/useMessages"
import SingleMessage from "./SingleMessage"

const Messages = () => {

  const {messages} = useMessages();
  console.log(messages)

  return (
    <div>
      {messages?.map((message)=>(
          <SingleMessage key={message.id} message={message}/>
      ))}

    </div>
  )
}

export default Messages