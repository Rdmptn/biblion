import logo from './logo.svg';
import { useEffect, useState} from "react";
import {api_url, api_register} from "./constants"
import axios from "axios";
import './App.css';
import NavBar from './Components/NavBar';
import useApplicationData from "./hooks/useApplicationData.js";
// import classNames from "classnames";
// import Application from "components/Application";
// import Register from "./pages/Register"
import Test from "./pages/Test"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Create from "./pages/posts/Create"
import UserPosts from './pages/UserPosts';
import SearchResults from './pages/SearchResults';


import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";


const App = () => {

  const { state, dispatch } = useApplicationData();
  const [currentUser, setCurrentUser] = useState({});
  // console.log("state======", state);
  let user_session = localStorage.getItem("user");
  if (user_session) {
    user_session = JSON.parse(user_session);
  }
  // user_session = JSON.parse(user_session);
  // console.log("user@@@@@@@", user_session);
 
  useEffect(() => {
    // axios.get(`${api_url}/user/current`).then((response) => {if (response.status === 200) {
    //   console.log("data", response.data);
      // setCurrentUser(response.data);
    setCurrentUser(user_session);
  }, [])
 

  //useEffect(() => {
    //   axios.get(`${api_url}/user/current`).then((response) => {if (response.status === 200) {
    //     console.log("data", response.data);
    //     setCurrentUser(response.data);
    //   }})
    // }, [])

    // console.log("currentuser", currentUser);
    const user = state.users.find(user => currentUser === user.id);
    // console.log("user", user);
    
  console.log("currentUser ->", currentUser);
  console.log("user ->", user);
    
  return (
    <div>
      <NavBar currentUser={currentUser} user={currentUser}/>
      <Router>
      <div className="App" >
        
          <Route path="/register">
            {!user_session ? <Register /> : <Redirect to="/"/>}
          </Route> 
     
          <Route path="/login">
            {!user_session ? <Login /> : <Redirect to="/"/>}
          </Route> 
          
          <Route path="/create">
            {!user_session ? <Redirect to="/login"/> : <Create currentUser={currentUser}/>}
          </Route> 

          <Route path="/userPosts">
            {!user_session ? <Redirect to="/login"/> : <UserPosts />}
          </Route>
        
          <Route path="/searchResults">
            <SearchResults />
          </Route>
        
      </div >
      </Router>
    </div>
    
  );
};

export default App;
