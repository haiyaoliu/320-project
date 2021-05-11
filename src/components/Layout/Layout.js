import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Layout.css";
import { Nav, Navbar, Container, Row, Col, Image, Form, FormControl, InputGroup } from "react-bootstrap";
import { BrowserRouter as Route, Router, Redirect, Switch } from "react-router-dom";
import PostModal from "../PostModal/PostModal";
import Sidebar from "./Sidebar/Sidebar";

// This component is for if we want add something that is universal to every page, like a header or footer
function Layout(props) {
    const [children, setChildren] = useState();
    useEffect(() => setChildren(props.children));

    const [peers, setPeers] = useState([{}]);
    const [positions, setPosition] = useState([{}]);
    const [companies, setCompany] = useState([{}]);
    const [employeeID, setEmployeeID] = useState([{}])
    const [writerID, setWriterID] = useState("")
    const [writerName, setWriterName] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
      axios.get("/write/getInfo/getPeerList").then((response) => {
        let name = response.data.map(person => person.firstName + ' ' + person.lastName);
        let position = response.data.map(person => person.positionTitle);
        let company = response.data.map(person => person.companyName);
        let employeeID = response.data.map(person => person.employeeId);
        let avatarUrl = response.data.map(person => person.legoCharacterUrl);
        setPeers(name);
        setPosition(position);
        setCompany(company);
        setEmployeeID(employeeID);
        setAvatar(avatarUrl);
      }).catch(error => {
        console.error('There was an error!', error);
      });

      let email = localStorage.getItem('user')
      let emailString = email.slice(1, email.length-1)

      axios.post("/write/getInfo/getCurrentUser", { email: emailString }).then((response) => {
        setWriterID(response.data.employeeId);
        setWriterName(response.data.firstName + ' ' + response.data.lastName)
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
                    <Nav class="ml-auto" style={{ "marginRight":"15px"}}>
                      <PostModal peers={peers} positions={positions} writerName={writerName} avatar={avatar}
                    companies={companies} userID={employeeID} writerID={writerID} forceUpdate={props.forceUpdate} />
                    </Nav>
                    <Form inline>
                      <InputGroup>
                        <FormControl type="text" placeholder="Search" className="search-box" />
                        <InputGroup.Append>
                          <InputGroup.Text className="search-icon">
                            <Image
                              src="/search.svg"
                            />
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form>
                      <Image
                        src="/bell.svg"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                        style = {{ marginLeft : "15px"}}
                      />
                  </Navbar>
                </Col>
              </Row>

              <Row style={{ "paddingTop": "56px"}}>
                <Col sm={2} style={{position:"fixed"}}>
                  <Sidebar />
                </Col>

                <Col className="body-content" sm={{offset: 2}}>
                  {children}
                </Col>
              </Row>
            </Container>
        </div>
    )
}

export default Layout;
