import { useState } from "react"
import { Link } from "react-router-dom"
import useSignup from "../hooks/useSignup"

const SignUp = () => {

    const [input, setInput]=useState({
        full_name:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:""
    })

    const {loading, signup}=useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input);
        //console.log(input);
      };

    return (
      <div className="flex flex-col justify-center items-center h-screen">
          <div className="border border-slate-500 px-20 py-20 rounded-xl ">
              <div>
                  <h1 className="text-3xl mb-8 font-semibold">Register</h1>
              </div>
  
              <div>
                  <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Fullname" value={input.full_name} onChange={(e)=>setInput({...input, full_name:e.target.value})} />
                    </label><br/>

                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" value={input.username} onChange={(e)=>setInput({...input, username:e.target.value})}/>
                    </label><br/>

                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Password" value={input.password} onChange={(e)=>setInput({...input, password:e.target.value})}/> 
                    </label><br/>

                    <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Confirm Password" value={input.confirmPassword} onChange={(e)=>setInput({...input, confirmPassword:e.target.value})}/> 
                    </label><br/>

                    <div className="join">
                        <input className="join-item btn" type="radio" name="gender" aria-label="Male" value="male" onChange={(e)=>setInput({...input, gender:e.target.value})} />
                        <input className="join-item btn" type="radio" name="gender" aria-label="Female" value="female" onChange={(e)=>setInput({...input, gender:e.target.value})} />
                    </div>

                    {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <button className="btn btn-primary w-full mt-6" disabled={loading}>Sign Up</button>
                        )
                    }
                  </form>
                </div>
  
              <div className="mt-2">
                <Link to="/login" className="text-primary cursor-pointer text-sm">Already a user? Sign In</Link>
              </div>
        </div>
      </div>
    )
  }
  
  export default SignUp