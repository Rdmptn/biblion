// const [currentUser, setCurrentUser] = useState(props.currentUser);
// const [currentUser, setCurrentUser] = useState(props.currentUser);
// import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_url, api_search } from "../constants";

// const logout = function() {
  // localStorage.setItem("user", null)
  // window.location.reload();
// }

// const handleSearch = function(event) {
    // event.preventDefault();
    // axios.post(`${api_url}${api_create}`, post)
    // .then((response) => {
      // console.log("response.data___+++:::", response.data); 
    // })
    // .catch(error => console.log(error))
  // }

export const NavBar = (props) => {
  
  const logout = function() {
    localStorage.setItem("user", null)
    window.location.reload();
  }

  // const handleSearch = function(event) {
    // event.preventDefault();
    // axios.get(`${api_url}${api_search}`)
    // .then((response) => {
      // console.log("response.data___+++:::", response.data); 
      
    // })
    // .catch(error => console.log(error))
  // }
  
  // const [currentUser, setCurrentUser] = useState(props.currentUser);
  // console.log("++++++++====", props);
  // return <div>HiHIHIHIHIHIHI</div>
  return <div>
          {props.currentUser ? 
          <div>
            <div>
            <form method="POST" action="searchResults">
              <input type="text" name="searchterms"/>
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
