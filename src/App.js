import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Feed from "./components/Feed/Feed";

export default function App(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users.json").then((response) => {
      setUsers(response.data);
    });
  })

  return (
    <div>
      <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/feed" component={Feed} />
            </Switch>
            <Redirect from="/" to="login" />
      </Router>
      <ul className="users">
        {users.map((user) => (
          <li className="user">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
