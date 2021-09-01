import {api_url, api_userPosts} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_userPosts}/${user.id}`)
    .then(response => setPosts(response.data.posts))
  }, [])

  return (
    <div>
      {posts.map(post => <div>{JSON.stringify(post)}</div>)}
    </div>
  )          
  
}
