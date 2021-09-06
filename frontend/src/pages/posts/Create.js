import { api_url, api_create, categoryArray } from "../../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Create(props) {
  let currentUser = props.currentUser; 
  let post = {};
  post.user_id = currentUser.id;
  post.genre = "drama";

  const handleSubmit = function(event) {
    event.preventDefault();
    axios.post(`${api_url}${api_create}`, post)
    .then((response) => {
      console.log("response.data___+++:::", response.data); 
      window.location.replace(`/Posts/${response.data.rows[0].id}`);
    })
    .catch(error => console.log(error))
  }

  const handleChangeTitle = function(event) {
    post.title = event.target.value;
  }
  
  const handleChangeAuthor = function(event) {
    post.author = event.target.value;
  }
  
  const handleChangeGenre = function(event) {
    post.genre = event.target.value;
  }

  const handleChangeSummary = function(event) {
    post.summary = event.target.value;
  }
  
  const handleChangeOpinion = function(event) {
    post.opinion = event.target.value;
  }
  
  return (
  
      <div class="main-content-container"> 
          <header class="page-header">
              <h1>Create a New Post</h1>
          </header>
          <div class="card border-success mb-3 text-white bg-dark login-card">
            <form onSubmit={(event) => handleSubmit(event)}>
              <div class="form-group">
                <label for="title"><h5>Title</h5></label>
                <input type="text" class="form-control non-nav-input" id="title" aria-describedby="nameHelp" placeholder="Enter Book Title" onChange={handleChangeTitle}/>
              </div>
              <div class="form-group">
                <label for="author"><h5>Author</h5></label>
                <input type="text" class="form-control non-nav-input" id="author" aria-describedby="emailHelp" placeholder="Enter Book Author" onChange={handleChangeAuthor}/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1"><h5>Genre</h5></label>
                <select multiple class="form-control non-nav-input" id="exampleFormControlSelect1">
                  <option value="drama" selected>Drama</option>
                  {categoryArray.map(genre =>
                    <option value={genre}>{genre}</option>
                  )}
                </select>
              </div>
              <div class="form-group">
                <label for="summary"><h5>Summary</h5></label>
                <textarea class="form-control non-nav-input" id="summary" rows="4" placeholder="Enter a brief summary of the book." onChange={handleChangeSummary}></textarea>
              </div>
              <div class="form-group">
                <label for="opinion"><h5>Opinion</h5></label>
                <textarea class="form-control non-nav-input" id="opinion"  rows="2"
                  placeholder="Enter a one or two sentence opinion on what you thought of the book." onChange={handleChangeOpinion}/>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
    
        
  )
}


// <form  onSubmit={(event) => handleSubmit(event)}>
          // <label>
            // Book Title:
            // <input type="text" name="title" onChange={handleChangeTitle}/>
          // </label>
          // <label>
            // Author:
            // <input type="text" name="Author" onChange={handleChangeAuthor}/>
          // </label>
          // <label>
            // Genre:
          // <select id="genre" name="genre" onChange={handleChangeGenre}>
            // <option value="drama">Drama</option>
            // <option value="comedy">Comedy</option>
            // <option value="tragedy">Tragedy</option>
          // </select>
          // </label>
          // <label>
            // Summary:
            // <input type="textarea" name="summary" onChange={handleChangeSummary}/>
          // </label>
          // <label>
            // Opinion:
            // <input type="text" name="opinion" onChange={handleChangeOpinion}/>
          // </label>
          // <input type="submit" value="Submit" />
        // </form>