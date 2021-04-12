import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "react-bootstrap";

function Sidebar(props) {
    return (
        <Nav className="col-md-12 d-none d-md-block sidebar">
            <Nav.Link href="#settings">Top Employees</Nav.Link>
            <Nav.Link>Filter</Nav.Link>
            <Nav.Link href="/">Log Out</Nav.Link>
            <href></href>
        </Nav>);
}

export default Sidebar;