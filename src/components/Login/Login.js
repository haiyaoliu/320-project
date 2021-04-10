import axios from "axios";
import { Alert } from "bootstrap";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "../../Layout";
import "./Login.css";
import { setUserSession } from "../../utils/Common";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function handleSubmit(event) {
        console.log("username:", email)
        console.log("password", password);
        const sendLogin = {
            email: email,
            password: password
        }
        axios.post('/login', sendLogin).then(response => {
            console.log("RESPONSE", response);
            //check if valid response
            //if yes:
            if(response.status == 200 && response.data.token) {
                setUserSession(response.data.token, email);
                console.log("LOGIN SUCCESS")
                props.history.push("/dashboard")
            }
            else{
                setError(true);
                localStorage.removeItem('token')
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        event.preventDefault();
    }
    let isError = error;
    function handleError(isError) {
        if(isError){
            return <div className="text-center">
                        <p className="displayError">
                            Invalid Username or Password
                        </p>
                    </div>;
        }
        else{
            return
        }
    }
    return (
        <Layout>
            <br />
            <section className="text-center">
                <div className="container">
                    <img src="logo-recognition.svg" />
                </div>
                <span className="block-example border border-dark">
                <div>
                    <img src="profile.jpg" />
                </div>
                <div className="text-left Login">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button  block variant="dark" size="lg" type="submit" disabled={!validateForm()}>
                            Login
                        </Button>
                    </Form>
                    {handleError(isError)}
                </div>
                </span>
                <div className="container">
                    <img src="ukg1.jpg" />
                </div>
            </section>
        </Layout>
    );
}

export default Login;