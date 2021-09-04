import {api_url, api_search} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function SearchResults(props) {
  const searchTerm = props.searchTerm;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.post(`${api_url}${api_search}`, searchTerm)
    .then((response) => { 
      if (!response.data.message && !response.data.error) {
        setPosts(response.data)
      }
    })
  }, [])

  
  
    return (
      <div class="post_back">
        {/* <h1> Search Results for "{searchTerm}" </h1>
          {posts.length > 0 
            ? 
          posts.map(post => 
          <ul>
            <li><img src={post.cover_url}/></li>
            <li>Book Title: {post.title}</li>
            <li>Author: {post.author}</li>
            <li>Genre: {post.topic}</li>
            <li>Summary: {post.summary}</li>
            <li>Opinion: {post.opinion}</li>
          </ul> */}
         
         <table class="table">
            <thead>
                <tr>
                    <th ><h1> Search Results for "{searchTerm}" </h1></th>
                </tr>
            </thead>
            <tbody>
              {posts.map(post => 
                <tr>
                 <td class="tdata">
                  <ul>
                    {/* <li>Post id: {post.id}</li> */}
                    {/* <li>Poster's Name: {post.name}</li> */}
                    <li><img src={post.cover_url}/></li>
                    <li>Book Title: {post.title}</li>
                    <li>Author: {post.author}</li>
                    <li>Genre: {post.topic}</li>
                    <li>Summary: {post.summary}</li>
                    <li>Opinion: {post.opinion}</li>
                    <li><Link to={`/Posts/${post.id}`}>View Post Details</Link></li>
                
                   </ul>
                 </td>

                </tr>
                      )}
                  </tbody>
          </table>
          
         
      </div>
    )  
   
}
