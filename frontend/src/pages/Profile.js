import {api_url, api_profile, api_update_badge} from "../constants"
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
  
  const handleChangeBadge = function(event) {
    profile.set_badge = event.target.value;
    console.log(profile.set_badge);
  }
  
   const handleSubmit = function(event) {
    event.preventDefault();
    axios.post(`${api_url}${api_update_badge}`, profile)
    .then((response) => {
      window.location.reload();
    })
    .catch(error => console.log(error))
  }

  console.log("BADGES:", profile.unlocked_badges)

  return (
    <div>
      <h1>Profile</h1>
      {/* {<div>{JSON.stringify(profile)}</div>} */}
      <ul>
        <li><img src={profile.image} alt="Active Badge" /></li>
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
       <form onSubmit={(event) => handleSubmit(event)}>
        {profile.unlocked_badges ? 

          profile.unlocked_badges.map(badge => 
          <div key={badge.id}>
            <div>
              <div>
                <img src={badge.image} alt={badge.description}/>
              </div>
              <label>{badge.name}</label>
            </div>
            <span>
              <input type="radio" name="badge" value={badge.badge_id} onChange={handleChangeBadge}/>
            </span>
          </div>
          
          ) 
          
        : ""} 

        <input type="submit" value="Update Active Badge" />
      </form>
    </div>
  )          
  
}

// <input type="radio" name="season" value="season">Yo</input>


  