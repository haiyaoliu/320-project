import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "../../Layout";
import "./Login.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        axios.post('/login', sendLogin)
            .then(response => {
                console.log("RESPONSE", response);
                //check if valid response
                //if yes:
                if(response.status == 200 && response.data.token){
                    console.log("LOGIN SUCCESS")
                    props.history.push("/dashboard")
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        /*if(email==='admin@admin' && password==='password'){
           console.log("Admin access: logging in");
           props.history.push("/dashboard")
        }*/
        event.preventDefault();
    }
    return (
        <div>
            <br />
            <section className="text-center">
                <div className="container">
                    <img src="logo-recognition.svg" />
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
                </div>
            </section>
        </div>
    )
}
export default Login;