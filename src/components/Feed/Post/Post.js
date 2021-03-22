import React from "react";
import { postData } from "./test_posts"
import { ListGroup, Card, Container, Col, Row } from "react-bootstrap";

// HEADER
const FeedHeader = () => {
    return (
        <header className="header">
            <h2>Recognitions</h2>
        </header>
    );
};

//POST COMPONENT
const Post = ({ writerID, recognizeeID, content, coreValue, createdAt }) => {
    if(!writerID) return <div />;
    return ( // can easily sub things in { } for stuff like matchNameToID(writerID)
        <div>
            <Card style={{width:'60rem'}}>
                <Card.Body>
                    <Card.Title>{writerID} recognized {recognizeeID}</Card.Title>
                    <Card.Subtitle>{createdAt}</Card.Subtitle>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
                <ListGroup horizontal>
                        { coreValue.map((data, key) => {
                            return (
                                <ListGroup.Item>{data}</ListGroup.Item>
                            );
                        })}
                </ListGroup>
            </Card>
        </div>
    );
}

export const Posts = () => {
    return (
        <>
            <FeedHeader />
            <div className="post-container">
                {postData.map((data, key) => {
                    return (
                        <div key={key}>
                            <Post 
                                key={key}
                                writerID={data.writerID}
                                recognizeeID={data.recognizeeID}
                                content={data.content}
                                coreValue={data.coreValue}
                                createdAt={data.createdAt}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};