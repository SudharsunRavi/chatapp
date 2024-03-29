import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {loading, login}=useLogin()

    const handleSubmit =async (e) => {
        e.preventDefault()
        await login(username, password)
    }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="border border-slate-500 px-14 py-20 rounded-xl ">
            <div>
                <h1 className="text-3xl mb-8 font-semibold">Login</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </label><br/>

                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </label>

                    {loading
                     ?
                        (<span className="loading loading-spinner"></span>) 
                     : 
                        (<button className="btn btn-primary w-full mt-4" disabled={loading}>Login</button>)
                    }
                    
                </form>
            </div>

            <div className="mt-2">
                <Link to="/signup" className="text-primary cursor-pointer text-sm">New user? Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Login