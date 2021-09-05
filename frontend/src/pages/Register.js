import {api_url, api_register} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Register() {
  const [isRegistered, setIsRegistered] = useState();
  const [user, setUser] = useState({});
  const handleSubmit = function(event) {
    event.preventDefault();
    axios.post(`${api_url}${api_register}`, user)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (response.status === 200) {
        
      setIsRegistered(true);
      window.location.replace("/");
    }
  })
    .catch(error => console.log(error))
  }

  const handleChangeName = function(event) {
    let name = event.target.value;
    setUser((prev) => ({
      ...prev,
      name
    }))
  }
  
  const handleChangeEmail = function(event) {
    let email = event.target.value;
    setUser((prev) => ({
      ...prev,
      email
    }))
  }

  const handleChangePassword = function(event) {
    let password = event.target.value;
    setUser((prev) => ({
      ...prev,
      password
    }))
  }
  return (
    <div>
        <form  onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleChangeName}/>
          </label>
          <label>
            email:
            <input type="email" name="email" onChange={handleChangeEmail}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChangePassword}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div>
        
  )
}
