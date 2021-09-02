import {api_url, api_search} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


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
      <div>
        <h1> Search Results for "{searchTerm}" </h1>
          {posts.length > 1 
            ? 
          posts.map(post => 
          <ul>
            <li>Book Title: {post.title}</li>
            <li>Author: {post.author}</li>
            <li>Genre: {post.topic}</li>
            <li>Summary: {post.summary}</li>
            <li>Opinion: {post.opinion}</li>
          </ul>
          )
          : 
          "No results found"}
      </div>
    )  
   
}
