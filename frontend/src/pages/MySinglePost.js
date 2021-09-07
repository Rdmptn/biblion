import {api_url, api_singlePost, api_mySinglePost, api_deleteMyPost, api_singlePostComments, api_singlePostLikes, api_createComment, api_createLike} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  
  const {id} = useParams()

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [commentUser, setCommentUser] = useState({});
  const [summaryOpinionUser, setSummaryOpinionUser] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [confirm, setConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchPostData = function() {
    
    axios.get(`${api_url}${api_singlePost}/${id}`)
    .then(response => setPost(response.data.post))
  
  }
  

  useEffect( () => {
    
    fetchPostData();
  }, [])

  const handleEditSubmit = function(event) {
    event.preventDefault();
    
    if (!summaryOpinionUser.summary) { 
      setErrorMessage('Please modify your summary or cancel.');
    } else if (summaryOpinionUser.summary.length < 100) {
      setErrorMessage(`Post summary must be at least 100 characters in length. Your current summary is only ${post.summary.length} characters.`);
    } else if (summaryOpinionUser.summary.length > 1000) {
      setErrorMessage(`Post summary must be 1000 or less characters in length. Your current summary is ${post.summary.length} characters.`);
    } else if (!summaryOpinionUser.opinion) {
      setErrorMessage("Please modify your opinion or cancel.");
    } else if (summaryOpinionUser.opinion.length < 50) {
      setErrorMessage(`Post opinion must be at least 50 characters in length. Your current opinion is only ${post.opinion.length} characters.`);
    } else if (summaryOpinionUser.opinion.length > 250) {
      setErrorMessage(`Post opinion must be 250 or lesscharacters in length. Your current opinion is ${post.opinion.length} characters.`);
    } else {

    summaryOpinionUser.id = id;
    summaryOpinionUser.user = user;
    console.log("++++==", summaryOpinionUser);
    // console.log("&&&&&", summaryOpinionUser);
    

    axios.post(`${api_url}${api_mySinglePost}`, summaryOpinionUser)
    .then((response) => {
      // console.log("response.data___+++:::", response.data);
      
      // fetchPostData();
      // if (response.status === 200) {
        
       
      // window.location.reload();
      // window.history.back();
      cancel();
    
  })
    .catch(error => console.log(error))
    }
  }
  
   const handleChangeSummary = function(event) {
    let summary = event.target.value;
    setSummaryOpinionUser((prev) => ({
      ...prev,
      summary
    }))
    setPost((prev) => ({
      ...prev,
      summary
    }))
  } 
  
  const handleChangeOpinion = function(event) {
    let opinion = event.target.value;
    setSummaryOpinionUser((prev) => ({
      ...prev,
      opinion
    }))
    setPost((prev) => ({
      ...prev,
      opinion
    }))
  }


   // const handleChangeOpinion = function(event) {
    // let opinionValue = event.target.value;
    // let summaryObject = {...summaryOpinionUser};
    // summaryObject = {};
    // summaryObject[event.target.name] = event.target.value;
    // let summaryOpinionUser = {id, opinionValue, user};
    
    // setSummaryOpinionUser({...summaryObject})
    // setSummaryOpinionUser((prev) => ({
      // ...prev,
      // summaryObject
    // }))
   // }

   const deleteMyPost = function(event) {
     console.log("hi delete post");
     event.preventDefault();
          let postId = {id};
          axios.post(`${api_url}${api_deleteMyPost}`, postId)
          .then((response) => {
            console.log("response.data___+++:::", response.data);
            setIsDeleted(true);
            // window.location.replace("/")
            // fetchPostData();
            if (response.status === 200) {
              
            
            // window.location.reload();
            // window.history.back();
          }
        })
          .catch(error => console.log(error))
   }
   
   const cancel = function() {
    let baseUrl = window.location.origin + "/Posts/";
    let postUrl = `${baseUrl}${post.id}`;
     window.location.replace(postUrl)
   }
   
   // if (user.id !== post.user_id) {
      // window.location.replace("/");
   // }
   
   
  {if (isDeleted) {window.location.replace("/userPosts")}}

  return (
    
       <div class="main-content-container"> 
          <header class="page-header">
           <h1>Edit {post.title}</h1>
           <h3>Posted By: <img src={post.image} width="36px"/> {post.name} </h3>
          </header>
          
        <button class="btn btn-danger edit-delete-button" onClick={() => setConfirm(true)}>Delete This Post</button> 
          {confirm ? 
            <div class="confirm-buttons">
              <p>Are you sure?</p> 
              <button class="btn btn-success" onClick={deleteMyPost}>Yes</button>
              <button class="btn btn-secondary" onClick={() => setConfirm(false)}>Cancel</button>
            </div>
            : 
            "" 
            }
          
        <div class="card border-success mb-3 text-white bg-dark login-card">
        <form  onSubmit={(event) => handleEditSubmit(event)}>
        <div class="form-group">
                <label for="summary"><h5>Edit Summary</h5></label>
                <textarea class="form-control non-nav-input" id="summary" rows="4" value={post.summary} onChange={handleChangeSummary}></textarea>
              </div>
              <div class="form-group">
                <label for="opinion"><h5>Edit Opinion</h5></label>
                <textarea class="form-control non-nav-input" id="opinion" rows="2" value={post.opinion} onChange={handleChangeOpinion}/>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
              <button class="btn btn-secondary" onClick={cancel}>Cancel</button>
              {errorMessage ? <div class="error-message">{errorMessage}</div> : ""}
        </form>
       </div>
    </div>
    
  )
          
}