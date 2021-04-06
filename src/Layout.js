import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Route, Router, Redirect, Switch } from "react-router-dom";
import PostModal from "./components/PostModal/PostModal"

// This component is for if we want add something that is universal to every page, like a header or footer
function Layout(props) {
    const [children, setChildren] = useState();
    useEffect(() => setChildren(props.children));

    const [peers, setPeers] = useState([{}]);
    const [position, setPosition] = useState([{}]);
    const [company, setCompany] = useState([{}]);
    const [employeeID, setEmployeeID] = useState([{}])
    const [writerID, setWriterID] = useState("")
    const [writerName, setWriterName] = useState("")

    useEffect(() => {
      axios.get("/write/getPeerList").then((response) => {
        let name = response.data.map(person => person['firstName'] + ' ' + person['lastName'])
        let position = response.data.map(person => person['positionTitle'])
        let company = response.data.map(person => person['companyName'])
        let employeeID = response.data.map(person => person['employeeId'])
        setPeers(name);
        setPosition(position);
        setCompany(company);
        setEmployeeID(employeeID)
      }).catch(error => {
        console.error('There was an error!', error);
      });
      
      axios.post("write/getCurrentUser", { email: String(props.user) }).then((response) => {
        setWriterID(response.data["employeeId"]);
        setWriterName(response.data["firstName"] + ' ' + response.data["lastName"])
      }).catch(error => {
        console.log('There was an error!', error);
      })
      
    }, [])

    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/dashboard" className="mr-auto">
                  <img
                    src="/ukg.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Logo"
                  />{'   '}
                  UKG
                </Navbar.Brand>
                <Nav>
                    <PostModal peers={peers} positions={position} writerName = {writerName}
                     companies={company} userID={employeeID} writerID={writerID}/>
                </Nav>
                <Nav>
                    <Nav.Link href="/">Log Out</Nav.Link>
                </Nav>
            </Navbar>

            <Container fluid>
              <Row>
                <Col sm={2} style={{position:"fixed"}}>
                  <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
                    <Nav.Link href="#settings">Top Employees</Nav.Link>
                    <Nav.Link>Filter</Nav.Link>
                    <href></href>
                  </Nav>
                </Col>

                <Col lg={{offset: 2}}>
                  {children}
                </Col>
              </Row>
            </Container>
        </div>
    )
}

export default Layout;
