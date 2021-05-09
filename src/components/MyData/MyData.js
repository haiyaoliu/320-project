import Layout from "../Layout/Layout";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeArray } from "jquery";
import { Row, Col, Container, Image } from "react-bootstrap";
import { TallyList } from "./Tally/Tally"
import "./MyData.css";



function MyData(props) {
    const [userInfo, setUserInfo] = useState({})
    
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length - 1)

        axios.post("write/getCurrentUser", { email: emailString }).then((response) => {
            let timeValue = new Date(response.data.startDate).toUTCString().slice(0,-13);
            let info = {
                email: emailString,
                fullName: response.data.firstName + ' ' + response.data.lastName,
                company: response.data.companyName,
                position: response.data.positionTitle,
                startDate: timeValue
            };
            setUserInfo(info);
        }).catch(error => {
            console.log('Error: '+ error);
        })
    }, [])

    return (
        <Layout>
            <Container fluid>
                <div className="profile-header">
                    <div className="profile-header-cover">
                        <p><span style={{ "color": "blue"}}>Download</span></p>
                    </div>
                    <div className="profile-header-content">
                        <div className="profile-header-avatar">
                            <Image src="Avatar.png" roundedCircle></Image>
                            <p>{userInfo.fullName}</p>
                        </div>
                        <div className="profile-header-info">
                            <p className="profile-position">
                                {userInfo.position} at {userInfo.company}
                            </p>
                            <p className="profile-contact">
                                Contact: {userInfo.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="recognition-tally">
                    <TallyList />
                </div>
            </Container>
        </Layout>
    );
}

export default MyData;