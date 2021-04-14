import React, { useState, useEffect } from "react";
import axios from "axios";
// import { postData } from "./test_posts" // CHANGE THIS
import { ListGroup, Card, Container, Col, Row, Nav, ButtonGroup, Button } from "react-bootstrap";

// HEADER
const FeedHeader = () => {
    return (
        <header className="recognition-header">
            <Nav as="ul">
                <Nav.Item as="li">
                    <Nav.Link active>All Recognitions</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link>My Recognitions</Nav.Link>
                </Nav.Item>
                <ButtonGroup as="ButtonGroup">
                    <Button>Past Day</Button>
                    <Button>Past Week</Button>
                    <Button>Past Month</Button>
                    <Button>Past Year</Button>
                    <Button active>All Time</Button>
                </ButtonGroup>
            </Nav>
        </header>
    );
};

/*  POST COMPONENT
    Notes: can easily sub things in { } for stuff like matchNameToID(writerID)
    Spacing is done in the <div> style
*/
const Post = ({ writerName, recognizeeName, content, coreValue, createdAt }) => {
    let timeValue = new Date(createdAt);
    if(!writerName) return <div />;
    return (
        <div>
            <Card className="one-post">
                <Card.Body>
                    <Card.Title><p style={{ color: 'blue', display: 'inline' }}>{recognizeeName}</p> has been recognized by <p style={{ color: 'blue', display: 'inline' }}>{writerName}</p></Card.Title>
                    <Card.Subtitle><small>{timeValue.toUTCString().slice(0,-3)}</small></Card.Subtitle>
                    <Card.Text style={{ "margin-top":"10px"}}>
                        {content}
                    </Card.Text>
                    <Row>
                        <Col>{ coreValue.map((data, key) => {
                        return (
                            <div className="post-tags">
                                <h4><span style={{ float: "left", "marginRight": "8px" }} class="badge badge-pill badge-primary">{data}</span></h4>
                            </div>
                        );
                    })}</Col>
                        <Col>{ coreValue.map((data, key) => {
                        return (
                            <div className="post-tags">
                                <h4><span style={{ float: "right", "marginRight": "8px" }} class="badge badge-pill badge-primary">{data}</span></h4>
                            </div>
                        );
                    })}</Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export const Posts = (props) => {
    const [postData, setPostData] = useState([]);

    const getPostData = () => {
        axios.get('/feed/displayRecognitions')
            .then(response => {
                const allPosts = response.data;
                setPostData(allPosts);
            })
            .catch(error => console.log("Error: ", error));
    }

    useEffect(() => {
        getPostData();
        console.log(props.forceUpdateValue);
    }, [props.forceUpdateValue]);

    return (
        <div>
            <FeedHeader />
            <div className="post-container">
                {postData.map((data, key) => {
                    return (
                        <div key={key}>
                            <Post
                                key={key}
                                writerName={data.writerName}
                                recognizeeName={data.recognizeeName}
                                content={data.content}
                                coreValue={data.coreValue}
                                createdAt={data.createdAt}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
