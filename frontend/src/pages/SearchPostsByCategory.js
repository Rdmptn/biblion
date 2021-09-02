import {api_url, api_searchPostsByCategory} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


// export default function UserPosts() {
//   const [posts, setPosts] = useState([]);

//   useEffect( () => {
    
//     const user =JSON.parse(localStorage.getItem("user"));
//     axios.get(`${api_url}${api_userPosts}/${user.id}`)
//     .then(response => setPosts(response.data.posts))
//   }, [])

//   return (
//     <div>
//       {posts.map(post => <div>{JSON.stringify(post)}</div>)}
//     </div>
//   )          
  
// }


export default function SearchPostsByCategory() {
  // let currentUser = props.currentUser; 
  // let post = {};
  // post.user_id = currentUser.id;
  // post.genre = "drama";
  const [posts, setPosts] = useState([]);
  // let topic = "";
  // let categorySelected = false;
  const [categorySelected, setCategorySelected] = useState(false);
  const [topic, setTopic] = useState("drama");
  const handleSubmit = function(event) {
    console.log("topc++==", topic);
    console.log('string', `${api_url}${api_searchPostsByCategory}/${topic}`);
    event.preventDefault();
    axios.get(`${api_url}${api_searchPostsByCategory}/${topic}`)
    .then(response => {
      console.log("response-category++", response);
      setPosts(response.data.posts);
      setCategorySelected(true);
    })
    
  }
  
  const handleChangeGenre = function(event) {
    setTopic(event.target.value);
  }
  
  if (categorySelected) {
    return (
      <div>
          {posts.map(post => 
            <ul>
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

  return (
    <form  onSubmit={(event) => handleSubmit(event)}>
      <label>
        Genre:
      <select id="genre" name="genre" onChange={handleChangeGenre}>
        <option value="drama">Drama</option>
        <option value="comedy">Comedy</option>
        <option value="tragedy">Tragedy</option>
      </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
)

  
}
