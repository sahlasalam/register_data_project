import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import *as infoServices from '../services/connect'


function Dashboard() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
    
      fetchData();
    
    }, [])
    


    const fetchData = async()=>{
      var userToken= localStorage.getItem("login_user_token")
      // if(!userToken){
      //   return (
      //   navigate('/')
      //   )
      // }
      var result = await infoServices.fetchDetails({token : userToken})
      if(result.data.status=== 0){
        return navigate('/')
      }
        setUserDetails(result.data.tokenData);
    }

    const logout = () =>{
      localStorage.removeItem("login_user_token");
      navigate('/')
    }

  return (
    <div>
        <h3>Name : {userDetails.name}</h3>
        <h3>Address : {userDetails.address}</h3>
        <h3>Number : {userDetails.number}</h3><br/>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard