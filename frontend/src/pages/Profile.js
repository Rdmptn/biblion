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
      <div class="main-content-container"> 
        <header class="page-header">
          <h1>Profile</h1>
        </header>
        
        <div class="card border-success mb-3 text-white bg-dark small-post-card">
          <div class="card-body">
            <h4 class="card-title">{profile.email}</h4>
            <h6 class="card-title">Name: {profile.name} </h6>
            <h6 class="card-title">Current Badge: </h6>
            <img src={profile.image} alt="Active Badge" />
            
          </div>
        </div>
        
        <div class="card border-success mb-3 text-white bg-dark small-post-card">
          <div class="card-body">
            <h4 class="card-title">Stats</h4>
            <li>Books Read: {profile.post_count}</li>
            <li>Pages Read: {profile.page_count}</li>
            <li>Comments: {profile.comment_count}</li>
          </div>
        </div>
        
        <div class="card border-success mb-3 text-white bg-dark small-post-card">
          <div class="card-body">
            <h4 class="card-title">Unlocked Badges</h4>
            
              <form onSubmit={(event) => handleSubmit(event)}>
              <div class="row g-0">
                {profile.unlocked_badges ? 
                
                  profile.unlocked_badges.map(badge => 
                    <div class="col-md-3 profile-badge-display">
                      <div key={badge.id}>
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
                </div>
                <input class="btn btn-success" type="submit" value="Update Active Badge" />
                
              </form>

          
        </div>
      </div>
    </div>
  )          
  
}
