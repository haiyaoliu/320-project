import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Feed from "./components/Feed/Feed";
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './utils/Common';

export default function App(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    if(loginUser) {
      try {
         const foundUser = JSON.parse(loginUser);
         setUsers(foundUser);
      } catch (error) {
         console.error(error);
      }
    }
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Login {...props} setUser={setUsers} isAuthed={true} />
          )} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
        <Redirect from="/" to="login" />
      </Router>
    </div>
  );
}
