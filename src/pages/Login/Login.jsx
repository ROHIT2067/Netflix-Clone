import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import {login,signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from "react-toastify";

function Login() {
  const [signState, setSignState] = useState("Sign-in");
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)

  const userAuth=async (e)=>{
    e.preventDefault()

    const trimmedName=name.trim()
    const trimmedEmail=email.trim()
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(signState==='Sign-up' && trimmedName.length<2){
      toast.error('Please enter a valid name')
      return
    }

    if(!emailPattern.test(trimmedEmail)){
      toast.error('Please enter a valid email address')
      return
    }

    if(password.length<6){
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    if(signState==='Sign-in'){
      await login(trimmedEmail,password)
    }else{
      await signup(trimmedName,trimmedEmail,password)
    }
    setLoading(false)
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign-up" ? (
            <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          ) : (
            <></>
          )}

          <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Enter your Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={userAuth} type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign-in" ? (
            <p>
              New to Netflix? <span onClick={()=>{setSignState('Sign-up')}}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={()=>{setSignState('Sign-in')}}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
