
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./Reports.css";
import { ReportsList } from "./ReportPost/ReportPost";
import { Posts } from "../Feed/Post/Post";
import { Row, Col, Container, Image } from "react-bootstrap";
import axios from "axios";

function Reports(props) {
    const [userInfo, setUserInfo] = useState({})
    
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length - 1)

        axios.post("write/getInfo/getCurrentUser", { email: emailString }).then((response) => {    
            let info = {
                email: emailString,
                fullName: response.data.firstName + ' ' + response.data.lastName,
                company: response.data.companyName,
                position: response.data.positionTitle,
                isManager: response.data.isManager,
                avatarUrl: response.data.legoCharacterUrl
            };
            setUserInfo(info);
        }).catch(error => {
            console.log('There was an error!', error);
        })

    
    }, [])
    
    if(userInfo.isManager == false) {
        console.log("Error: not authorized!");
        window.location.href = '/';
    }
    
    return (
        <Layout>
            <Container fluid>
                <div className="profile-header">
                    <div className="profile-header-cover">
                        <p>Access: <span style={{ "color": "red"}}>Manager</span></p>
                    </div>
                    <div className="profile-header-content">
                        <div className="profile-header-avatar">
                            <Image src={userInfo.avatarUrl} roundedCircle></Image>
                            <p>{userInfo.fullName}</p>
                        </div>
                        <div className="profile-header-info">
                            <Container className="description-bar-style">
                                <Row className = "full-width">
                                    <Col className = "title-style">
                                        {userInfo.position} at {userInfo.company}
                                    </Col>
                                    <Col className = "contact-style">
                                        Contact: {userInfo.email}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
                <div className="profile-content">
                    <ReportsList forceUpdateValue={props.forceUpdateValue} />
                </div>
            </Container>
        </Layout>
    )
}

export default Reports;