// const [currentUser, setCurrentUser] = useState(props.currentUser);
// const [currentUser, setCurrentUser] = useState(props.currentUser);
// import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import axios from "axios";
import { api_url, api_search } from "../constants";

export const NavBar = (props) => {
  
  let searchTerm = "";
 
  const logout = function() {
    localStorage.setItem("user", null)
    window.location.reload();
  }
  
  const handleSubmit = function(event) {
    console.log("REDIRECT");
    event.preventDefault();
    window.location.replace("/searchResults");
  }
  
  const handleChangeSearch = function(event) {
    searchTerm = event.target.value;
    localStorage.setItem("searchTerm", searchTerm);
  }
  
  return <div>
          {props.currentUser ? 
          <div>
            <div>
              <form onSubmit={(event) => handleSubmit(event)}>
                <input type="text" onChange={handleChangeSearch}/>
                <input type="submit" value="Search" />
              </form>
              <a href='/create'><button>New Post</button></a>
              <a href='/userPosts'><button>See All Your Posts</button></a>
              {props.currentUser.email}
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div> 
          : 
          <div>
            <a href='/register'>
              <button>
                Register
              </button>
            </a>
            <a href='/login'>
              <button>
                Login
              </button>
            </a>
          </div>
          }
        </div>
}
export default NavBar;
