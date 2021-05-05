import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getUser, removeUserSession } from '../../../utils/Common';
import { NavLink } from 'react-router-dom'

function Sidebar(props) {
    const user = getUser();

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
    }

    //"My Circle" filter currently not implemented
    //Change Core Values link?

    return (
        <Nav className="col-md-12 d-none d-md-block sidebar">
            <Nav.Link as={NavLink} to="/topemployees">Top Employees</Nav.Link>
            <NavDropdown title= "Filter" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/filter/myrecognitions">My Recognitions</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/filter/coreValues/Mentoring&Collaboration">Core Values</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
            <href></href>
        </Nav>);
}

export default Sidebar;