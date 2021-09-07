import {api_url, api_search} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallPost from "../Components/SmallPost";


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
  
      <div class="main-content-container">
        <header class="page-header">
          <h1>Search Results for "{searchTerm}"</h1>
        </header>
       {posts.length > 0
          ? 
        posts.map(post => 
          SmallPost(post)
        )
        :
       <h4>No results found</h4>}
      </div>
    

  )  

   
}
