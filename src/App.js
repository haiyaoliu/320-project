import React, { useState, useEffect } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import Feed from "./components/Feed/Feed"
import Reports from "./components/Reports/Reports"
import Rankings from "./components/Rankings/Rankings";
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import MyData from "./components/MyData/MyData";
import EmployeeData from "./components/MyData/EmployeeData";

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
          <PrivateRoute path="/topemployees" component={Rankings} />
          <PrivateRoute path="/mydata" component={MyData} />
          <PrivateRoute path="/employeedata" component={EmployeeData} />
          <PrivateRoute path="/reports" component={Reports} />
        </Switch>
        <Redirect from="/" to="login" />
      </Router>
    </div>
  );
}
