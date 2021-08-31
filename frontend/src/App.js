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

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";


const App = () => {
  const { state, dispatch } = useApplicationData();
  const [currentUser, setCurrentUser] = useState({})
//  console.log("state======", state);
 let user_session = localStorage.getItem("user");
 if (user_session) {
  user_session = JSON.parse(user_session);
  
 }
//  user_session = JSON.parse(user_session);
 console.log("user@@@@@@@", user_session);
 
  useEffect(() => {
    // axios.get(`${api_url}/user/current`).then((response) => {if (response.status === 200) {
    //   console.log("data", response.data);
      // setCurrentUser(response.data);
      setCurrentUser(user_session);
    //}})
  }, [user_session])

  //useEffect(() => {
    //   axios.get(`${api_url}/user/current`).then((response) => {if (response.status === 200) {
    //     console.log("data", response.data);
    //     setCurrentUser(response.data);
    //   }})
    // }, [])

    const userList = state.users.map((user) => (<li key={user.id} > {user.name} {user.email} </li>
    ));
    console.log("currentuser", currentUser);
    const user = state.users.find(user => currentUser === user.id);
    console.log("user", user);
  return (
    <div>
      <NavBar currentUser={currentUser} user={currentUser}/>
      <Router>
      <div className="App" >
      
        <Route path="/test">
                <Test />
        </Route>
        <Route path="/register">
                <Register />
        </Route>

        <h1> Users </h1>

        <ul> {userList} </ul>
        
        {/* {currentUser? <div><div>{user.email}</div><a></a></div>  : "hi" } */}
        
      </div >
      </Router>
    </div>
    
  );
};






export default App;
