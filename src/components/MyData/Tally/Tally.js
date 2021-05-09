import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Col } from "react-bootstrap";

const Tally = ({recognitionCount}) => {
    console.log(recognitionCount);

    

    return(
        <Container fluid>
            <Col>
                <p>placeholder</p>
            </Col>
        </Container>
    );
}

export const TallyList = (props) => {
    const [recognitionData, setRecognitionData] = useState({ recognitionCount: [] });

    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length-1)
        axios.post("/feed/myData", { userEmail : emailString }).then((response) => {
            setRecognitionData({ recognitionCount: response.data});
        }).catch(error=> {
            console.log("Error: "+error);
        });
        
    }, []);

    return (
        <div>
            <div className="tally-container">
                <Tally recognitionData={recognitionData.recognitionCount} />
            </div>
        </div>
    );
}