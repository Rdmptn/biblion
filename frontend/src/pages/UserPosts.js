import {api_url, api_userPosts} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";




export default function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    
    const user =JSON.parse(localStorage.getItem("user"));
    axios.get(`${api_url}${api_userPosts}/${user.id}`)
    .then(response => setPosts(response.data.posts))
  }, [])

  return (
      <div>
          {/* {posts.map(post => 
            <ul>
              <li>Post id: {post.id}</li>
              <li>Poster's Name: {post.name}</li>
              <li><img src={post.cover_url}/></li>
              <li>Book Title: {post.title}</li>
              <li>Author: {post.author}</li>
              <li>Genre: {post.topic}</li>
              <li>Summary: {post.summary}</li>
              <li>Opinion: {post.opinion}</li>
              <li><Link to={`/Posts/${post.id}`}>View Post Details</Link></li>
            </ul>
          )} */}

         <table class="table">
                <thead>
                     <tr>
                        <th ><h2>All Your Posts</h2></th>
                    </tr>
                </thead>
                <tbody>
                {posts.map(post => 
                    <tr>
                        <td class="tdata"><ul>
              <li>Post id: {post.id}</li>
              <li>Poster's Name: {post.name}</li>
              <li><img src={post.cover_url}/></li>
              <li>Book Title: {post.title}</li>
              <li>Author: {post.author}</li>
              <li>Genre: {post.topic}</li>
              <li>Summary: {post.summary}</li>
              <li>Opinion: {post.opinion}</li>
              <li><Link to={`/Posts/${post.id}`}>View Post Details</Link></li>
              
            </ul></td>

                    </tr>
                    )}
                </tbody>
          </table>
          
      </div>  
  )          
  
}
