import ConversationSidebar from "../components/ConversationSidebar"
import MessagesContainer from "../components/Messages/MessagesContainer"

const Landing = () => {
  return (
    <div className="flex justify-center sm:h-[450px] md:h-[550px] overflow-hidden mt-[8%]">

       <div className="flex flex-col items-center justify-center border border-slate-600 rounded-l-lg px-6 py-8">
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Search"/>
                    </div>
                </div>
                <button className="btn join-item">Search</button>
            </div>

            <div className="divider px-3"></div>

            <ConversationSidebar/>
            <ConversationSidebar/>
            <ConversationSidebar/>
            <ConversationSidebar/>
            <ConversationSidebar/>
        </div>

        <div className="border border-slate-600 rounded-r-lg px-6 py-8">
            <MessagesContainer/>
        </div>

    </div>
  )
}

export default Landing