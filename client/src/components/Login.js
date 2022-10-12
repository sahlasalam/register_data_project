import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import *as infoServices from '../services/connect'


function Login() {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("")
    const[userPassword, setUserPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigateToRegister = () =>{
        navigate('/register')
    }
    const getemail = (e)=>{
        setUserEmail(e.target.value)
    }
    const getPassword= (e) =>{
        setUserPassword(e.target.value)
    }

    const loginUser= async()=>{
        var result = await infoServices.loginData({email : userEmail, password : userPassword})
        if(result.data.status ===1){
            var login_user_token = result.data.token;
            localStorage.setItem("login_user_token", login_user_token)
            navigate('/dashboard')
        }else{
            setMessage(result.data.message)
        }
    }
  return (
    <div className='login_page'>
        <div className='data_field'>
            <h4>Email :</h4>
            <div className='input_field'>
                <input type={"email"} onChange={getemail}></input>
            </div>
        </div>
        <div className='data_field'>
            <h4>Password : </h4>
            <div className='input_field'>
                <input type={"password"} onChange={getPassword}></input><br/>
            </div>
        </div>
        <button onClick={loginUser}>Login</button>
        <p>{message}</p>
        <p>new User ?</p>
        <button onClick={navigateToRegister}>Register</button>
    </div>
  )
}

export default Login