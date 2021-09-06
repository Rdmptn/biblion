import {api_url, api_login} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";

export default function Login() {
  // const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({});
  const handleSubmit = function(event) {
    console.log("user", user);
    event.preventDefault();
    axios.post(`${api_url}${api_login}`, user)
    .then((response) => {
      console.log("response.data___+++:::", response.data);
      if (response.data.name) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Correct email and password!");
        // window.location.reload();
        window.location.replace("/");
        // set cookie to user id
        // redirect to home page or previous page?
      } else {
        // display this error on the page somewhere instead of console.logging
        console.log(response.data.error);
      }
    })
    .catch(error => console.log("WTF:", error))
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
          <h1>Login</h1>
      </header>
      <div class="card border-success mb-3 text-white bg-dark login-card">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div class="form-group">
            <label for="exampleInputEmail1"><h5>Email address</h5></label>
            <input type="email" class="form-control non-nav-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeEmail}/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1"><h5>Password</h5></label>
            <input type="password" class="form-control non-nav-input" id="exampleInputPassword1" placeholder="Password" onChange={handleChangePassword}/>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
        
  )
}