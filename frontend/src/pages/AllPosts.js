import {api_url, api_allPosts} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_allPosts}`)
    .then(response => setPosts(response.data.posts))
  }, [])

  return (
   <div>
          {posts.map(post => 
            <ul>
            <li><img src={post.cover_url}/></li>
            <li>Book Title: {post.title}</li>
            <li>Author: {post.author}</li>
            <li>Genre: {post.topic}</li>
            <li>Summary: {post.summary}</li>
            <li>Opinion: {post.opinion}</li>
          </ul>
          )}
          
      </div> 
  )          
  
}
