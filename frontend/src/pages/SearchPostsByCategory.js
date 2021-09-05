import {api_url, api_searchPostsByCategory} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallPost from "../Components/SmallPost";



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
        <html>
          <body class="back_post">
              <div class="post_back">
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
              </div>
          </body>
        
        {categorySelected 
            ?
          <div class="main-content-container">
            <header class="page-header">
              <h1>Posts for Genre: {selectedTopic}</h1>
            </header>
            {posts.map(post => 
              SmallPost(post)
            )}
          </div>
          :
        ""}
        </html>
    )

}
