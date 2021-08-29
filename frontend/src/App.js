import logo from './logo.svg';
import './App.css';
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
  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.name} {user.email} </li>
    ));
  return (
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
  </div >
  </Router>
  );
};




export default App;
