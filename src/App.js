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
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if(!token) {
      return;
    }

    axios.get(`http://localhost:3000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
      });
    }, []);

    if (authLoading && getToken()) {
      return <div>Checking Authentication...</div>
    }

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
