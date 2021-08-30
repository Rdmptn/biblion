import logo from './logo.svg';
import './App.css';
import useApplicationData from "./hooks/useApplicationData.js";
// import classNames from "classnames";
// import Application from "components/Application";
// import Register from "./pages/Register"
import Test from "./pages/Test"
import Register from "./pages/Register"
import Login from "./pages/Login"

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";


const App = () => {
  const {
    state
  } = useApplicationData();
    // const userList = state.users.map((user) => (<li key={user.id} > {user.name} {user.email} </li>
    // ));
  return (
  <Router>
  <div className="App" >
   
    <Route path="/test">
            <Test />
    </Route>
    <Route path="/register">
            <Register />
    </Route>
    <Route path="/login">
            <Login />
    </Route>
 
  </div >
  </Router>
  );
};

   // <h1> Users </h1>

    // <ul> {userList} </ul>


export default App;
