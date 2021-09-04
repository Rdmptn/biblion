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
  
  const register = function() {
    window.location.replace("/register");
  }
  
  const login = function() {
    window.location.replace("/login");
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
        
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <div class="container-fluid">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                  <a class="navbar-brand" href="/">Biblion</a>
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
                          <button class="btn btn-outline-success" type="submit">Search</button>
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
                              <a class="nav-link" href="/create">New Post</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/userPosts">My Posts</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="/profile">Profile</a>
                          </li>
                          <li class="nav-item">
                              <button class="btn btn-outline-success" onClick={() => logout()}>Logout</button>
                          </li>
                      </ul>
                  </div>
                :
                   <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                      <ul class="navbar-nav ms-auto">
                          <li class="nav-item">
                              <button class="btn btn-outline-success" onClick={() => register()}>Register</button>
                          </li>
                          <li class="nav-item">
                              <button class="btn btn-outline-success" onClick={() => login()}>Login</button>
                          </li>
                      </ul>
                  </div>
              }
              
          </div>
      </nav>
        
        )
}
export default NavBar;



  // <div>
  // {props.currentUser ? 
          // <div>
            // <div>
              // <form onSubmit={(event) => handleSubmit(event)}>
                // <input type="text" placeholder="Search Book Title or Author:" onChange={handleChangeSearch}/>
                // <input type="submit" value="Search" />
              // </form>
              // <a href='/profile'><button>Profile</button></a>
              // <a href='/create'><button>New Post</button></a>
              // <a href='/userPosts'><button>See All Your Posts</button></a>
              // <a href='/searchPostsByCategory'><button>Search Posts By Genre</button></a>
              // <a href='/allPosts'><button>See All Posts</button></a>
              // {props.currentUser.email}
              // <button onClick={() => logout()}>Logout</button>
            // </div>
          // </div> 
          // : 
          // <div>
            // <form onSubmit={(event) => handleSubmit(event)}>
                // <input type="text" placeholder="Search Book Title or Author:" onChange={handleChangeSearch}/>
                // <input type="submit" value="Search" />
            // </form>
            // <a href='/searchPostsByCategory'><button>Search Posts By Genre</button></a>
            // <a href='/allPosts'><button>See All Posts</button></a>
            // <a href='/register'>
              // <button>
                // Register
              // </button>
            // </a>
            // <a href='/login'>
              // <button>
                // Login
              // </button>
            // </a>
          // </div>
          // }
        // </div>
        
        
        // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          // <a class="navbar-brand" href="/">Biblion</a>
          // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            // <span class="navbar-toggler-icon"></span>
          // </button>

            // {props.currentUser ? 
            // <div class="collapse navbar-collapse" id="navbarSupportedContent">
              // <ul class="navbar-nav mr-auto">
                // <li class="nav-item">
                  // <a class="nav-link" href="/allPosts">All Posts<span class="sr-only"></span></a>
                // </li>
                // <li class="nav-item">
                  // <a class="nav-link" href="/searchPostsByCategory">Posts By Category</a>
                // </li>
              // </ul>
              // <form class="navbar-form" onSubmit={(event) => handleSubmit(event)}>
                // <input class="form-control mr-sm-2" type="search" placeholder="Search Book Title or Author:" aria-label="Search" onChange={handleChangeSearch}/>
                // <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              // </form>
              // <ul class="nav navbar-nav navbar-right me-auto">
                // <li class="nav-item">
                  // <a class="nav-link" href="/create">New Post<span class="sr-only"></span></a>
                // </li>
                // <li class="nav-item">
                  // <a class="nav-link" href="/userPosts">My Posts</a>
                // </li>
                // <li class="nav-item">
                  // <a class="nav-link" href="/profile">Profile</a>
                // </li>
                // <li class="nav-item">
                  // <button type="button" class="btn btn-outline-primary" onClick={() => logout()}>Logout</button>
                // </li>
              // </ul>
            // </div>
           
            // :
            
            // <div class="collapse navbar-collapse" id="navbarSupportedContent">
               // <ul class="navbar-nav mr-auto">
                // <li class="nav-item">
                  // <a class="nav-link" href="/allPosts">All Posts<span class="sr-only"></span></a>
                // </li>
                // <li class="nav-item">
                  // <a class="nav-link" href="/searchPostsByCategory">Posts By Category</a>
                // </li>
              // </ul>
             
              // <ul class="navbar-nav mr-auto">
                // <li class="nav-item">
                  // <button type="button" class="btn btn-outline-primary"><a href="/register">Register</a></button>
                // </li>
                // <li class="nav-item">
                  // <button type="button" class="btn btn-outline-primary"><a href="/login">Login</a></button>
                // </li>
              // </ul>
            // </div>
              

          // }

        // </nav>
     
