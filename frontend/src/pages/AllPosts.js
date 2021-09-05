import {api_url, api_allPosts} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallPost from "../Components/SmallPost";


export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_allPosts}`)
    .then(response => setPosts(response.data.posts))
  }, [])
  

  return (
  
      <div class="main-content-container">
        <header class="page-header">
          <h1>All Posts</h1>
        </header>
        {posts.map(post => 
          SmallPost(post)
        )}
      </div>
    
  )          
  
}
