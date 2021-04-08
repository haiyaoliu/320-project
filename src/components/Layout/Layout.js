import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Layout.css";
import { Nav, Navbar, Container, Row, Col, Image, Form, FormControl, Button  } from "react-bootstrap";
import { BrowserRouter as Route, Router, Redirect, Switch } from "react-router-dom";
import PostModal from "../PostModal/PostModal"

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
            <Container fluid>
              <Row className="header-content">
                <Col sm={2} className="company-logo" style={{ background: "#EEEEEE" }}>
                  <Navbar variant="dark" sticky="top">
                    <Navbar.Brand href="/dashboard" >
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UKG_%28Ultimate_Kronos_Group%29_logo.svg/1200px-UKG_%28Ultimate_Kronos_Group%29_logo.svg.png"
                        width="88"
                        height="28"
                        className="d-inline-block align-top"
                        alt="Logo"
                      />{'   '}
                    </Navbar.Brand>
                  </Navbar>
                </Col>
                <Col sm={{offset:2}} className="navbar-right">
                  <Navbar variant="dark" sticky="top" >
                    <Nav class="ml-auto" style={{ "margin-right":"10px"}}>
                      <PostModal peers={peers} positions={position} writerName={writerName}
                        companies={company} userID={employeeID} writerID={writerID} />
                    </Nav>
                    <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-primary">Search</Button>
                    </Form>
                  </Navbar>
                </Col>
              </Row>

              <Row style={{ "padding-top": "56px"}}>
                <Col lg={2} style={{position:"fixed"}}>
                  <Nav className="col-md-12 d-none d-md-block sidebar">
                    <Nav.Link href="#settings">Top Employees</Nav.Link>
                    <Nav.Link>Filter</Nav.Link>
                    <Nav.Link href="/">Log Out</Nav.Link>
                    <href></href>
                  </Nav>
                </Col>

                <Col className="body-content" lg={{offset: 2}}>
                  {children}
                </Col>
              </Row>
            </Container>
        </div>
    )
}

export default Layout;
