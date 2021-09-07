import {api_url, api_register} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Register() {
  const [isRegistered, setIsRegistered] = useState();
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] =  useState(false);
  
  const handleSubmit = function(event) {
    event.preventDefault();
    
    if (!user.name) {
      setErrorMessage("Name field cannot be empty.");
    } else if (user.name.length < 3) {
      setErrorMessage("Name must be at least 3 characters.");
    } else if (!user.email) {
      setErrorMessage("Email field cannot be empty.");
    } else if (!user.password) {
      setErrorMessage("Password field cannot be empty.");
    } else if (user.password.length < 3) {
      setErrorMessage("Password must be at least 3 characters.");
    } else {
      setErrorMessage(false);
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
  
    <div class="main-content-container"> 
      <header class="page-header">
          <h1>Register</h1>
      </header>
      <div class="card border-success mb-3 text-white bg-dark login-card">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div class="form-group">
            <label for="exampleInputName"><h5>Name</h5></label>
            <input type="text" class="form-control non-nav-input" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name" onChange={handleChangeName}/>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1"><h5>Email address</h5></label>
            <input type="email" class="form-control non-nav-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeEmail}/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1"><h5>Password</h5></label>
            <input type="password" class="form-control non-nav-input" id="exampleInputPassword1" placeholder="Password" onChange={handleChangePassword}/>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
          {errorMessage ? <div class="error-message">{errorMessage}</div> : ""}
        </form>
      </div>
    </div>
  

        
  )
}
