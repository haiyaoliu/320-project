import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Layout from "../../Layout";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Layout>
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
        </Layout>
    )
}

export default Login;