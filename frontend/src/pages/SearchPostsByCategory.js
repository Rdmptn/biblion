import {api_url, api_searchPostsByCategory, categoryArray} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallPost from "../Components/SmallPost";


export default function SearchPostsByCategory() {

  const [posts, setPosts] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const [topic, setTopic] = useState("Adventure");
  const [selectedTopic, setSelectedTopic] = useState("");
  const handleSubmit = function(event) {
    console.log("topc++==", topic);
    console.log('string', `${api_url}${api_searchPostsByCategory}/${topic}`);
    event.preventDefault();
    axios.get(`${api_url}${api_searchPostsByCategory}/${topic}`)
    .then(response => {
      console.log("response-category++", response);
      setPosts(response.data.posts);
      setCategorySelected(true);
      setSelectedTopic(Topic);
    })
    
  }
  
  const handleChangeGenre = function(event) {
    setTopic(event.target.value);
  }
  
  const Topic = topic.charAt(0).toUpperCase() + topic.slice(1);

    return (

          <div class="main-content-container">
            <header class="page-header">
              <h1>Posts for Genre: {selectedTopic}</h1>
            </header>
            <form class="genre-form" onSubmit={(event) => handleSubmit(event)}>
              <label>
                <select class="form-select non-nav-input" id="exampleFormControlSelect1" onChange={handleChangeGenre}>
                <option value="Adventure" selected>Adventure</option>
                {categoryArray.map(genre =>
                  <option value={genre}>{genre}</option>
                )}
                </select>
              </label>
              <input class="btn btn-success genre-search-button"type="submit" value="Submit" />
            </form>
            
            {posts.map(post => 
              SmallPost(post)
            )}
          </div>

    )

}
