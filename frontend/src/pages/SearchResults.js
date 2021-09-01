import {api_url, api_search} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function SearchResults(props) {
  const searchTerm = props.searchTerm;
  console.log("SEARCHTERM:", searchTerm);
  const [posts, setPosts] = useState([]);

  axios.post(`${api_url}${api_search}`, searchTerm)
  .then(response => setPosts(response.data))
    return (
      <div>
        <h1> Search Results for "{searchTerm}" </h1>
          {posts ? posts.map(post => <div>{JSON.stringify(post)}</div>) : "No results found"}
      </div>
    )          
  
}