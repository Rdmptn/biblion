import { api_url, api_create, categoryArray } from "../../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Create(props) {
   
  // let post = {};
  const [post, setPost] = useState({genre: "Adventure"});
 
  
  // post.user_id = currentUser.id;
  // post.genre = "Adventure";
  const [errorMessage, setErrorMessage] =  useState(false);
  
   

  const handleSubmit = function(event) {
    event.preventDefault();
    
    if (!post.title) {
      setErrorMessage("Title field cannot be empty.");
    } else if (!post.author) {
      setErrorMessage("Author field cannot be empty.");
    } else if (!post.summary) {
      setErrorMessage("Summary field cannot be empty.");
    } else if (post.summary.length < 100) {
      setErrorMessage(`Post summary must be at least 100 characters in length. Your current summary is only ${post.summary.length} characters.`);
    } else if (post.summary.length > 1000) {
      setErrorMessage(`Post summary must be 1000 or less characters in length. Your current summary is ${post.summary.length} characters.`);
    } else if (!post.opinion) {
      setErrorMessage("Opinion field cannot be empty.");
    } else if (post.opinion.length < 50) {
      setErrorMessage(`Post opinion must be at least 50 characters in length. Your current opinion is only ${post.opinion.length} characters.`);
    } else if (post.opinion.length > 250) {
      setErrorMessage(`Post opinion must be 250 or lesscharacters in length. Your current opinion is ${post.opinion.length} characters.`);
    } else {
      setErrorMessage(false);
      let user_id = props.currentUser.id;
      post.user_id = user_id;
      axios.post(`${api_url}${api_create}`, post)
      .then((response) => {
        console.log("response.data___+++:::", response.data); 
        window.location.replace(`/Posts/${response.data.rows[0].id}`);
      })
      .catch(error => console.log(error))
    }
  }
  
  const handleChangeTitle = function(event) {
    let title = event.target.value;
    setPost((prev) => ({
      ...prev,
      title
    }))
  }
  
  const handleChangeAuthor = function(event) {
    let author = event.target.value;
    setPost((prev) => ({
      ...prev,
      author
    }))
  }
  
  const handleChangeGenre = function(event) {
    let genre = event.target.value;
    setPost((prev) => ({
      ...prev,
      genre
    }))
  }
  
  const handleChangeSummary = function(event) {
    let summary = event.target.value;
    setPost((prev) => ({
      ...prev,
      summary
    }))
  }
  
  const handleChangeOpinion = function(event) {
    let opinion = event.target.value;
    setPost((prev) => ({
      ...prev,
      opinion
    }))
  }

  // const handleChangeTitle = function(event) {
    // post.title = event.target.value;
  // }
  
  // const handleChangeAuthor = function(event) {
    // post.author = event.target.value;
  // }
  
  // const handleChangeGenre = function(event) {
    // post.genre = event.target.value;
  // }

  // const handleChangeSummary = function(event) {
    // post.summary = event.target.value;
  // }
  
  // const handleChangeOpinion = function(event) {
    // post.opinion = event.target.value;
  // }
  
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
                <select multiple class="form-control non-nav-input" id="exampleFormControlSelect1" onChange={handleChangeGenre}>
                  <option value="Adventure" selected>Adventure</option>
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
              {errorMessage ? <div class="error-message">{errorMessage}</div> : ""}
            </form>
          </div>
        </div>
    
        
  )
}
