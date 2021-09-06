import {api_url, api_singlePost, api_singlePostComments, api_singlePostLikes, api_createComment, api_createLike} from "../constants"
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const fetchPostData = function() {
    
    axios.get(`${api_url}${api_singlePost}/${id}`)
    .then(response => setPost(response.data.post))

  }

  const fetchCommentsData = function() {

    axios.get(`${api_url}${api_singlePostComments}/${id}`)
    .then(response => setComments(response.data.comments))
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
    <div class="post_back">
      {/* <article>
        {id}
      </article> */}
      <table class="table">
        <tr>
          <td class="tdata">
              <ul>
                {/* <li>Post id: {post.id}</li> */}
                <li><img src={post.cover_url}/></li>
                <li>Book Title: {post.title}</li>
                <li>Author: {post.author}</li>
                <li>Genre: {post.topic}</li>
                <li>Summary: {post.summary}</li>
                <li>Opinion: {post.opinion}</li>
              </ul>
          </td>
        </tr>
      </table>
      {/* <ul>
        <li>Post id: {post.id}</li>
        <li><img src={post.cover_url}/></li>
        <li>Book Title: {post.title}</li>
        <li>Author: {post.author}</li>
        <li>Genre: {post.topic}</li>
        <li>Summary: {post.summary}</li>
        <li>Opinion: {post.opinion}</li>
      </ul> */}
      <div>
      <a href="#" onClick={() => {amazonRedirect(post)}}>
        <img src="https://wplov.in/wp-content/uploads/download-300x101-1.png" alt="Buy now on amazon" width="200px"/>
      </a>
      </div>
      <div>
        {likesCount}Likes
      </div>
      <div>
        <button onClick={addLike}>Like</button>
      </div>
      {/* <div>
        {comments.map(comment => 
          <ul>
            <li>Comment id: {comment.id}</li>
            <li>Comment Message: {comment.message}</li>
          </ul>
        )}   
      </div>  */}
      <div>
        <table class="table">
         <div>
        <form  onSubmit={(event) => handleSubmit(event)}>
          <label>
            Enter Your Comment:
            <input type="text" name="comment" onChange={handleChangeComment}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
                  <thead>
                      <tr>
                          <th ><h2>The Comments For This Post</h2></th>
                      </tr>
                  </thead>
                  <tbody>
                  {comments.map(comment => 
            <tr>
              <td class="tdata">
                  <ul>
                    <li><img src={comment.image} width="24"/> {comment.name}</li>
                    <li>Comment id: {comment.id}</li>
                    <li>Comment Message: {comment.message}</li>
                  
                  </ul>
                </td>

              </tr>
                      )}
                  </tbody>
          </table>
      </div>
     
    </div>
    
  )
          
}