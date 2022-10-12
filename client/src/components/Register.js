import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import *as infoServices from '../services/connect'

function Register() {

    const [userDetails, setUserDetails] = useState({
        name : "",
        email : "",
        password : "",
        number : "",
        address : "",
        pincode : "",
        state : ""
    })

    const [message, setMessage] = useState("")

    const fieldData = (e)=>{
        var fieldName = e.target.name;
        var fieldValue = e.target.value;
        
        const prevState = {...userDetails};
        prevState[fieldName]= fieldValue;
        setUserDetails(prevState);
    }

    const registerDetails= async() =>{
        var result = await infoServices.saveDetails(userDetails);
        var reg_user_token = result.data.token
        localStorage.setItem("login_user_token", reg_user_token)
        setMessage(result.data.message)
        if(result.data.status=== 1){
            navigate('/dashboard')
        }
    }
    const navigate = useNavigate()
    const navigateToLogin= ()=>{
        navigate('/')
    }

  return (
    <div>
        <h4>Name : </h4>
        <input type={"text"} name="name" onChange={fieldData}></input>
        <h4>Email : </h4>
        <input type={"email"} name="email" onChange={fieldData}></input>
        <h4>Password : </h4>
        <input type={"password"} name="password" onChange={fieldData}></input>
        <h4>Number : </h4>
        <input type={"number"} name="number" onChange={fieldData}></input>
        <h4>Address : </h4>
        <input type={"text"} name="address" onChange={fieldData}></input>
        <h4>Pincode : </h4>
        <input type={"number"} name="pincode" onChange={fieldData}></input>
        <h4>State : </h4>
        <input type={"text"} name="state" onChange={fieldData}></input><br/>
        <button onClick={registerDetails}>Register</button>
        <p>{message}</p>
        <button onClick={navigateToLogin}>Back</button>
    </div>
  )
}

export default Register