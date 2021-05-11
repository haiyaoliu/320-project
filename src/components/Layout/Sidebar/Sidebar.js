import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getUser, removeUserSession } from '../../../utils/Common';
import { NavLink } from 'react-router-dom'
import "./Sidebar.css"

function Sidebar(props) {
    const user = getUser();

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
    }

    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length - 1)

        axios.post("write/getInfo/getCurrentUser", { email: emailString }).then((response) => {
            let info = {
                isManager: response.data.isManager
            };
            setUserInfo(info);
        }).catch(error => {
            console.log('Error: '+ error);
        })
    }, [])

    // const [expanded, setExpanded] = useState([false, false, false])

    return (
        <Navbar collapseOnSelect className="col-md-12 d-none d-md-block sidebar navbarPadding">
        {/* <Navbar.Brand href="/dashboard" eventKey="/dashboard">React-Bootstrap</Navbar.Brand> */}
            <Nav className="col-md-12 d-none d-md-block sidebar">
                {/* Change stroke to "currentColor" to have icons gray out unless selected */}
                {/* DO NOT PUT THE MENU ITEM NAME ON SEPARATE LINE FOR ONES WITH SVGs */}
                <Nav.Link className="menuItem" as={NavLink} to="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home
                </Nav.Link>
                <Nav.Link className="menuItem" as={NavLink} to="/topemployees">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> Top Employees
                </Nav.Link>
                <Navbar.Brand className="menuItem" as={NavLink} to="/filter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </Navbar.Brand>
                <Nav.Link className="subMenu" as={NavLink} to="/filter/myrecognitions">
                    My Recognitions
                </Nav.Link>
                <Nav.Link className="subMenu" as={NavLink} to="/filter/coreValues/Collaboration">
                    Core Values
                </Nav.Link>
                <Nav.Link className="subMenu" as={NavLink} to="/dashboard/pastday">
                    Date
                </Nav.Link>
                <hr className="dividerPadding"/>
                {userInfo.isManager ? (
                <>
                <Navbar.Brand className="menuItem" as={NavLink} to="/reports">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> Tools
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </Navbar.Brand>
                <Nav.Link className="subMenu" as={NavLink} to="/reports">
                    Reports
                </Nav.Link>
                <Nav.Link className="subMenu" as={NavLink} to="/employeedata">
                    Employee Data
                </Nav.Link>
                <hr className="dividerPadding"/>
                </>) : (<></>)}
                <Navbar.Brand className="menuItem" as={NavLink} to="/mydata"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Manage
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </Navbar.Brand>
                <Nav.Link className="subMenu" as={NavLink} to="/mydata">My Data</Nav.Link>
                <Nav.Link className="subMenu" href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
        </Navbar>);
}

export default Sidebar;
