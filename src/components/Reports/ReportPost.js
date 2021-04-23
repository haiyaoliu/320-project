import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Card, Container, Col, Row, Nav, ButtonGroup, Button, Badge, Image} from "react-bootstrap";

const Report = ({ writerName, recognizeeName, content, createdAt }) => {
    let timeValue = new Date(createdAt);
    if(!writerName) return <div />;
    return (
        <div>
            <Card className="one-post">
                <Card.Body className="card-padding">
                    <Card.Title><p style={{ color: 'blue', display: 'inline' }}>{recognizeeName}</p> has been recognized by <p style={{ color: 'blue', display: 'inline' }}>{writerName}</p></Card.Title>
                    <Card.Subtitle><small>{timeValue.toUTCString().slice(0,-3)}</small></Card.Subtitle>
                    <Card.Text style={{ "margin-top":"10px"}}>
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export const ReportsList = (props) => {
    const [reportData, setReportData] = useState([]);
    const getReportData = () => {
        axios.get('/reports/displayReports').then(response => {
            const allReports = response.data;
            setReportData(allReports);
        })
        .catch(error => {
            console.log("Error: ", error)
        });
    }

    useEffect(() => {
        getReportData();
    });

    return (
        <div>
            <div className="report-container">
                {reportData.map((data, key) => {
                    return (
                        <div key={key}>
                            <Report 
                                postId={data.postId}
                                writerName={data.writerName}
                                recognizeeName={data.recognizeeName}
                                content={data.content}
                                createdAt={data.createdAt}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}