import Layout from "../Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { TallyList } from "./Tally/Tally"
import "./MyData.css";



function EmployeeData(props) {
    const [userInfo, setUserInfo] = useState({})
    
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length - 1)

        axios.post("/write/getInfo/getCurrentUser", { email: emailString }).then((response) => {
            let timeValue = new Date(response.data.startDate).toUTCString().slice(0,-13);
            let info = {
                email: emailString,
                fullName: response.data.firstName + ' ' + response.data.lastName,
                company: response.data.companyName,
                position: response.data.positionTitle,
                startDate: timeValue,
                isManager: response.data.isManager,
                avatarUrl: response.data.legoCharacterUrl
            };
            setUserInfo(info);
        }).catch(error => {
            console.log('Error: '+ error);
        })
    }, [])

    const [employeeData, setEmployeeData] = useState([])
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length-1)
        axios.post("/feed/displayRecognitions/myRecognition", { userEmail : emailString }).then((response) => {
            setMyData(response.data);
        }).catch(error=> {
            console.log("Error: "+error);
        });
        axios.get("/feed/displayRecognitions/").then((response) => {
            setEmployeeData(response.data);
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }, []);

    const download_data = (text, filename) => {
        const a = document.createElement('a');
        const type = filename.split(".").pop();
        a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
        a.download = filename;
        a.click();
    }

    if(userInfo.isManager == false) {
        console.log("Error: not authorized!");
        window.location.href = '/';
    }



    return (
        <Layout>
            <Container fluid style={{position:"relative", height:`${window.innerHeight}px`}}>
                <div className="profile-header">
                    <div className="profile-header-cover">
                        <Button 
                            variant="link"
                            onClick={() => download_data(JSON.stringify(myData), `${userInfo.fullName}-data.json`)}
                        >
                            Download My Data
                        </Button>
                        {(userInfo.isManager ? (<><Button 
                            variant="link"
                            onClick={() => download_data(JSON.stringify(employeeData), `${userInfo.company}-data.json`)}
                        >
                            Download All Data
                        </Button></>) : (< ></>))}
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
                <div>
                    <TallyList />
                </div>
            </Container>
        </Layout>
    );
}

export default EmployeeData;