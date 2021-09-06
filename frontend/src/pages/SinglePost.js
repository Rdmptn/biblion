import {api_url, api_singlePost, api_singlePostComments, api_singlePostLikes, api_createComment, api_createLike} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format, render, cancel, register } from '../../node_modules/timeago.js/dist/timeago.min';

export default function SinglePost() {
  
  const {id} = useParams()

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [commentUser, setCommentUser] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const fetchPostData = function() {
    
    axios.get(`${api_url}${api_singlePost}/${id}`)
    .then(response => setPost(response.data.post))

  }

  const fetchCommentsData = function() {

    axios.get(`${api_url}${api_singlePostComments}/${id}`)
    .then(response => setComments(response.data.comments))
    document.getElementById('comment-input').value = "";
    let commentValue = null;
    let commentUser = {id, commentValue, user}
    setCommentUser((prev) => ({
      ...prev,
      commentUser
    }))
  }

  const fetchLikesData = function() {
    
    axios.get(`${api_url}${api_singlePostLikes}/${id}`)
    .then(response => {
      console.log("hiiiiii");
      console.log(response.data);
      setLikesCount(response.data.likesCount.count);
    })
  }

  useEffect( () => {
    
    fetchPostData();
  }, [])

  useEffect( () => {
    
   fetchCommentsData();
    
  }, [])

  useEffect( () => {
    
    fetchLikesData();
    
  }, [])

  


  const handleSubmit = function(event) {
    
    event.preventDefault();
    
    axios.post(`${api_url}${api_createComment}`, commentUser)
    .then((response) => {
      console.log("response.data___+++:::", response.data);
      
      fetchCommentsData();
      if (response.status === 200) {
        
       
      // window.location.reload();
      // window.history.back();
    }
  })
    .catch(error => console.log(error))
  }

  const handleChangeComment = function(event) {
    // console.log(event.target.value);
    // const user =JSON.parse(localStorage.getItem("user"));
    let commentValue = event.target.value;
    let commentUser = {id, commentValue, user}
    setCommentUser((prev) => ({
      ...prev,
      commentUser
    }))
  }

  const addLike = function(event) {
    event.preventDefault();

    let postIdUser = {id, user};

    axios.post(`${api_url}${api_createLike}`, postIdUser)
    .then((response) => {
      console.log("response.data___+++:::", response.data);
      
      fetchLikesData();
      
      if (response.status === 200) {
        
      
      // window.location.reload();
      // window.history.back();
      }
    })
    .catch(error => console.log(error))
  }
  
  const amazonRedirect = function(post) {
    const url = "https://www.amazon.ca/s?k=" + post.title + "&i=stripbooks";
    window.open(url)
  }

  return (

        

    <div class="main-content-container">
      <header class="page-header">
        <h1>Review for {post.title} by {post.author}</h1>
        <h3>Posted By: <img src={post.image} width="24px"/> {post.name} — {format(post.created_at)} in <i>{post.topic}</i></h3>
      </header>

      <div class="card border-success mb-3 text-white bg-dark small-post-card">
        <div class="card-body full-post">
          <img src={post.cover_url}/>
          <p class="card-text full-summary">{post.summary}</p>
          <p class="card-text full-opinion">{post.opinion}</p>
          {likesCount === 1 ? <p>{likesCount} Like </p> : <p class="likes-counter">{likesCount} Likes</p>}
          <button class="btn-success icon-play" onClick={addLike}></button>
        </div>
      </div>

      <a class="amazon-button" href="#" onClick={() => {amazonRedirect(post)}}>
        <img src="https://i.imgur.com/BmmY1mX.png" alt="Buy now on amazon" width="200px"/>
      </a>

      <header class="page-header comment-header">
        <h2>Comments</h2>
      </header>

      <div class="card border-success mb-3 text-white bg-dark login-card comment-card">
        <form  onSubmit={(event) => handleSubmit(event)}>
         <div class="form-group">
            <label for="comment-input"><h5>Leave a Comment</h5></label>
            <textarea class="form-control non-nav-input" id="comment-input" name="comment" rows="2" onChange={handleChangeComment}/>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>

      {comments.map(comment => 
        <div class="card border-success mb-3 text-white bg-dark small-post-card">
          <div class="card-body">
            <p class="card-text"><img src={comment.image} width="24px"/> {comment.name} — {format(comment.created_at)}</p>
            <p class="card-text">{comment.message}</p>
            </div>
          </div>
        )}
     
    </div>
    
  )
          
}



// <ul>
          // <li><img src={post.cover_url}/></li>
          // <li>Book Title: {post.title}</li>
          // <li>Author: {post.author}</li>
          // <li>Genre: {post.topic}</li>
          // <li>Summary: {post.summary}</li>
          // <li>Opinion: {post.opinion}</li>
          // <li>Posted By: <img src={post.image} width="24px"/> {post.name} — {format(post.created_at)}</li>
        // </ul>