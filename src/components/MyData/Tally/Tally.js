import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Col, Row } from "react-bootstrap";


export const TallyList = (props) => {
    const [recognitionData, setRecognitionData] = useState({ recognitionCount: [] });
    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length-1)
        axios.post("/feed/myData", { userEmail : emailString }).then((response) => {
            setRecognitionData(response.data);
        }).catch(error=> {
            console.log("Error: "+error);
        });
    }, []);

    const matchColor = (val) => {
        let c = Math.floor(val / 100) % 5;
        switch(c) {
            case 0:
                return `rgb(7, 78, 232)`;   // Blue
            case 1:
                return `rgb(7, 232, 56)`;   // Green
            case 2:
                return `rgb(232, 232, 7)`;  // Yellow
            case 3:
                return `rgb(232, 7, 7)`;    // Red
            case 4:
                return `rgb(232, 7, 187)`;  // Purple
        }
    }

    return (
        <div className="tally-container">
            <Container fluid>
                <Row className="justify-content-md-center">
                    {Object.keys(recognitionData).map(function(key, index) {
                        return(
                            <Col md={{span:3, offset:1}}>
                                <CircularProgressbarWithChildren 
                                    className="tally-counter"
                                    value={index % 100}
                                    styles={{
                                        path: {
                                            stroke: `${matchColor(index)}`
                                        }
                                    }}>
                                    <p style={{fontSize:`1.5vw`}}>{key}</p>
                                    <p style={{fontSize:`1.5vw`}}>{index}</p>
                                </CircularProgressbarWithChildren>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}