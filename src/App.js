import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

export default function App(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users.json").then((response) => {
      setUsers(response.data);
    });
  });

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Redirect from="/" to="login" />
      </Router>
    </div>
  );
}
