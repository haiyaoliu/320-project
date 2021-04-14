import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "react-bootstrap";
import { getUser, removeUserSession } from '../../../utils/Common';

function Sidebar(props) {
    const user = getUser();

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
    }

    return (
        <Nav className="col-md-12 d-none d-md-block sidebar">
            <Nav.Link href="#settings">Top Employees</Nav.Link>
            <Nav.Link>Filter</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
            <href></href>
        </Nav>);
}

export default Sidebar;