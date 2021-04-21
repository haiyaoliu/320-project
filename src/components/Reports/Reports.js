
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./Reports.css";
import { Posts } from "../Feed/Post/Post";
import { Container, Image } from "react-bootstrap";
import axios from "axios";



function Reports(props) {

    return (
        <Layout>
            <Container fluid>
                <div className="profile-header">
                    <div className="profile-header-cover">
                        {/* #TODO HERE */}
                    </div>
                    <div className="profile-header-content">
                        <div className="profile-header-avatar">
                            <Image src="Avatar.png" roundedCircle></Image>
                        </div>
                        <div className="profile-header-info">
                            <p className="profile-position">
                                Senior Software Engineer at GreenLife Consulting
                            </p>
                            <p className="profile-contact">
                                Contact: Arron_Garcia@greenlifeconsulting.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="profile-content">
                    <Posts></Posts> {/*Replace this later */}
                </div>
            </Container>
        </Layout>
    )
}

export default Reports;