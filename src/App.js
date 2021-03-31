import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Feed from "./components/Feed/Feed";

export default function App(props) {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" render={(props) => (
            <Login {...props} setUser={setUsers} isAuthed={true} />
          )} />
          <Route exact path="/dashboard" render={(props) => (
            <Dashboard {...props} user={users} isAuthed={true} />
          )} />
        </Switch>
        <Redirect from="/" to="login" />
      </Router>
    </div>
  );
}
