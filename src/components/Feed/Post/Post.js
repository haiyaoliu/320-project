import React, { useState, useEffect } from "react";
import axios from "axios";
// import { postData } from "./test_posts" // CHANGE THIS
import { ListGroup, Card, Container, Col, Row } from "react-bootstrap";

// HEADER
const FeedHeader = () => {
    return (
        <header className="recognition-header">
            <h2>Recognitions</h2>
        </header>
    );
};

/*  POST COMPONENT
    Notes: can easily sub things in { } for stuff like matchNameToID(writerID)
    Spacing is done in the <div> style
*/
const Post = ({ writerID, recognizeeID, content, coreValue, createdAt }) => {
    if(!writerID) return <div />;
    return ( 
        <div>
            <Card className="one-post">
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
                            <ListGroup.Item className="post-tags">
                                {data}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card>
        </div>
    );
}

export const Posts = () => {
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
        getPostData()
    }, []);

    return (
        <div>
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
        </div>
    );
};