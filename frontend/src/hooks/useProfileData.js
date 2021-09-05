import React, {
    useEffect,
    useState
} from 'react';

import {api_url, api_profile, api_update_badge} from "../constants"

import axios from 'axios';

const useProfileData = () => {
  const [profile, setProfile] = useState([]);
  
  useEffect( () => {
      
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        axios.get(`${api_url}${api_profile}/${user.id}`)
        .then(response => setProfile(response.data.profile))
      
      }
    }, [])
    
    return profile;
  
};

export default useProfileData;
