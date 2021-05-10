import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportPost.css";
import { ListGroup, Card, Container, Col, Row, Nav, ButtonGroup, Button, Badge, Image} from "react-bootstrap";

const Report = ({ postId, writerName, recognizeeName, content, createdAt, coreValue, reportReason }) => {
    let timeValue = new Date(createdAt);
    if(!writerName) return <div />;

    const approveReport = () => {
        axios.delete(`/reports/approveReport/${postId}`)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }
    const denyReport = () => {
        axios.patch(`reports/denyReport/${postId}`)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log("Error: ", error);
        })
    }

    return (
        <div>
            <Card className="one-report">
                <Card.Body className="report-card-padding">
                    <Card.Title><p style={{ color: 'blue', display: 'inline' }}>{recognizeeName}</p> has been recognized by <p style={{ color: 'blue', display: 'inline' }}>{writerName}</p></Card.Title>
                    <Card.Subtitle><small>{timeValue.toUTCString().slice(0,-3)}</small></Card.Subtitle>
                    <Card.Text>
                        {content}
                    </Card.Text>
                    <Col>{ coreValue.map((data, key) => {
                            return (
                                <div className="post-tags" key={key}>
                                    <Badge pill bsPrefix="report-reaction-tags">
                                        {data}
                                    </Badge>
                                </div>
                            );
                        })}
                    </Col>
                    <div className="report-reason" >
                        <Image src="info.svg"></Image>
                        <p style={{ color:'#074EE8', display:'inline', "paddingLeft":"5px"}}>Report Info:&nbsp;</p>
                        <Container className="reportInfoBox">{reportReason.map((data, key) => {
                            return (
                                <Row>
                                    - {data}
                                </Row>
                            );
                        })}
                        </Container>
                    </div>
                    <div className="report-button-container">
                        <Button className="report-button" variant="outline-danger" onClick={() => approveReport(postId)}>
                            Approve Report
                        </Button>
                        <Button className="report-button" variant="outline-primary" onClick={() => denyReport(postId)}>
                            Deny Report
                        </Button>
                    </div>
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
                                postId={data._id}
                                writerName={data.writerName}
                                recognizeeName={data.recognizeeName}
                                content={data.content}
                                createdAt={data.createdAt}
                                coreValue={data.coreValue}
                                reportReason={data.reportReason}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}