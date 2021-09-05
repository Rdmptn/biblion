import {api_url, api_userPosts} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallPost from "../Components/SmallPost";


export default function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_userPosts}/${user.id}`)
    .then(response => setPosts(response.data.posts))
  }, [])

  return (
  
      <div class="main-content-container">
        <header class="page-header">
          <h1>My Posts</h1>
        </header>
        {posts.map(post => 
          SmallPost(post)
        )}
      </div>
    
  )   
  
}
