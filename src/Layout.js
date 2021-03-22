import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Route, Router, Redirect, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

// This component is for if we want add something that is universal to every page, like a header or footer
function Layout(props) {
    const [children, setChildren] = useState();
    useEffect(() => setChildren(props.children));

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/dashboard">UKG</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/">Log Out</Nav.Link>
                </Nav>
            </Navbar>
            {children}
        </div>
    )
}

export default Layout;
