const ConversationSidebar = () => {
  return (
    <div className="flex w-72">
        <div>
            <img src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png' 
                    alt="user"
                    className="h-16 rounded-full"
            />
        </div>

        <div className="flex gap-24 mt-5">
            <h1 className="text-lg">Sudharsun</h1>
            <span className="text-xl">🔥</span>
        </div>
    </div>
  )
}

export default ConversationSidebar