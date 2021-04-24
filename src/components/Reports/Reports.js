
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./Reports.css";
import { ReportsList } from "./ReportPost";
import { Posts } from "../Feed/Post/Post";
import { Container, Image } from "react-bootstrap";
import axios from "axios";

function Reports(props) {
    const [userInfo, setUserInfo] = useState({})
    
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length - 1)

        axios.post("write/getCurrentUser", { email: emailString }).then((response) => {    
            let info = {
                email: emailString,
                fullName: response.data.firstName + ' ' + response.data.lastName,
                company: response.data.companyName,
                position: response.data.positionTitle
            };
            setUserInfo(info);
            
        }).catch(error => {
            console.log('There was an error!', error);
        })

    
    }, [])
    
    
    
    return (
        <Layout>
            <Container fluid>
                <div className="profile-header">
                    <div className="profile-header-cover">
                        <p>Access: <span style={{ "color": "red"}}>Manager</span></p>
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
                <div className="profile-content">
                    <ReportsList forceUpdateValue={props.forceUpdateValue} />
                </div>
            </Container>
        </Layout>
    )
}

export default Reports;