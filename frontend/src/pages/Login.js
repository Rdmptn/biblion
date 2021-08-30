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
    .then((response) => {if (response.status === 200) {
      if (response.data.name) {
        console.log("Correct email and password!")
        // set cookie to user id
        // redirect to home page or previous page?
      } else {
        // display this error on the page somewhere instead of console.logging
        console.log(response.data.error);
      }
    }})
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
        <form onSubmit={(event) => handleSubmit(event)}>
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
  )
}