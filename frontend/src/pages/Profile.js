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
        <li><img src={profile.image} /></li>
        <li>Name: {profile.name}</li>
        <li>Email: {profile.email}</li>
      </ul>
      <ul>
        <h4>Stats</h4>
        <li>Books Read: {profile.post_count}</li>
        <li>Pages Read: {profile.page_count}</li>
        <li>Comments: {profile.comment_count}</li>
      </ul>
      <h4>Unlocked Badges</h4>
      {profile.unlocked_badges ? profile.unlocked_badges.map(badge => 
        <ul>
          <li><img src={badge.image}/></li>
          <li>{badge.name}</li>
        </ul>
      ) : ""} 
      
    </div>
  )          
  
}


 