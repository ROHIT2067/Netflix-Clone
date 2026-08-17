import React, { useEffect } from "react"
import Home from './pages/Home/Home'
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const navigate=useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log("Logged in")
        navigate('/', { replace: true })
      }else{
        console.log("Logged out")
        navigate('/login', { replace: true })
      }
    })
  },[])

  return(
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/player/:id" element={<Player/>}></Route>
      </Routes>
    </div>
  )
}

export default App
