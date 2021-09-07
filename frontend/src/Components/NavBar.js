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
  
  console.log("PROPS:", props);
 
  const logout = function() {
    localStorage.setItem("user", null)
    window.location.replace("/home");
  }
  
  const handleSubmit = function(event) {
    event.preventDefault();
    window.location.replace("/searchResults");
  }
  
  const handleChangeSearch = function(event) {
    searchTerm = event.target.value;
    localStorage.setItem("searchTerm", searchTerm);
  }
  
  return (
        
        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
          <div class="container-fluid">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                  <a class="navbar-brand" href="/home">Biblion</a>
                  <ul class="navbar-nav me-auto">
                      <li class="nav-item active">
                          <a class="nav-link" href="/allPosts">All Posts</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/searchPostsByCategory">Posts By Genre</a>
                      </li>
                  </ul>
              </div>
              <div class="mx-auto order-0">
                  <form class="input-group inline-form" onSubmit={(event) => handleSubmit(event)}>
                      <input type="search" class="form-control" placeholder="Search Book Title or Author:" aria-label="Search" size="150" onChange={handleChangeSearch}/>
                      <span class="input-group-btn">
                          <button class="btn btn-success nav-search-button" type="submit">Search</button>
                      </span>
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".dual-collapse2">
                          <span class="navbar-toggler-icon"></span>
                      </button>
                  </form> 
              </div>
              {props.currentUser ? 
              
                  <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                      <ul class="navbar-nav ms-auto">
                          <li class="nav-item">
                              <span class="logged-in-name">{props.profile.name}</span>
                              <span><img class="logged-in-badge" src={props.profile.image}  width="40px"/></span>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/create">New Post</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/userPosts">My Posts</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/profile">Profile</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#" onClick={() => logout()}>Logout</a>
                          </li>
                      </ul>
                  </div>
                :
                   <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                      <ul class="navbar-nav ms-auto">
                          <li class="nav-item">
                               <a class="nav-link" href="/register">Register</a>
                              
                          </li>
                          <li class="nav-item">
                               <a class="nav-link" href="/login">Login</a>
                             
                          </li>
                      </ul>
                  </div>
              }
              
          </div>
      </nav>
        
        )
}

export default NavBar;
