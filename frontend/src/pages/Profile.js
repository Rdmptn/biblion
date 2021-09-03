import {api_url, api_profile} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_profile}/${user.id}`)
    .then(response => setProfile(response.data.profile))
  }, [])
  
  const profileValues = JSON.stringify(profile);

  return (
    <div>
      {/* {<div>{JSON.stringify(profile)}</div>} */}
      <ul>
        <li>Profile id: {profile.id}</li>
        <li>Name: {profile.name}</li>
        <li>Email: {profile.email}</li>
      </ul>
    </div>
  )          
  
}
