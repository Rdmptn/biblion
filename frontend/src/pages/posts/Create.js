import {api_url, api_create} from "../../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Create(props) {
  let currentUser = props.currentUser; 
  let post = {};
  post.user_id = currentUser.id;

  const handleSubmit = function(event) {
    event.preventDefault();
    axios.post(`${api_url}${api_create}`, post)
    .then((response) => {
      console.log("response.data___+++:::", response.data); 
    })
    .catch(error => console.log(error))
  }

  const handleChangeTitle = function(event) {
    post.title = event.target.value;
  }
  
  const handleChangeAuthor = function(event) {
    post.author = event.target.value;
  }

  const handleChangeSummary = function(event) {
    post.summary = event.target.value;
  }
  
  const handleChangeOpinion = function(event) {
    post.opinion = event.target.value;
  }
    
  return (
        <form  onSubmit={(event) => handleSubmit(event)}>
          <label>
            Book Title:
            <input type="text" name="title" onChange={handleChangeTitle}/>
          </label>
          <label>
            Author:
            <input type="text" name="Author" onChange={handleChangeAuthor}/>
          </label>
          <label>
            Summary:
            <input type="textarea" name="summary" onChange={handleChangeSummary}/>
          </label>
          <label>
            Opinion:
            <input type="text" name="opinion" onChange={handleChangeOpinion}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
  )
}
