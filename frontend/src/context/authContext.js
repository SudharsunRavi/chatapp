import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

const AuthContextProvider=({children})=>{

    const [user, setUser]=useState(JSON.parse(localStorage.getItem('user')) || null);

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext=()=>{
    return useContext(AuthContext);
}

export {AuthContext,AuthContextProvider, useAuthContext}