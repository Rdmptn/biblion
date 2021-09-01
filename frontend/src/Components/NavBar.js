// const [currentUser, setCurrentUser] = useState(props.currentUser);
// const [currentUser, setCurrentUser] = useState(props.currentUser);
// import React, { useEffect, useState } from "react";

const logout = function() {
  localStorage.setItem("user", null)
  window.location.reload();
}

export const NavBar = (props) => {
  
  
  // const [currentUser, setCurrentUser] = useState(props.currentUser);
  // console.log("++++++++====", props);
  // return <div>HiHIHIHIHIHIHI</div>
  return <div>
          {props.currentUser ? 
          <div>
            <div>
            <a href='/profile'><button>Profile</button></a>
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
