import React, { useState, useEffect } from "react";
import axios from "axios";
// import { postData } from "./test_posts" // CHANGE THIS
import { ListGroup, Card, Container, Col, Row, Nav, ButtonGroup, Button, Badge, Image} from "react-bootstrap";
import { NavLink } from "react-router-dom";

// HEADER
const FeedHeader = () => {
    return (
        <header className="recognition-header">
            <Nav as="ul">
                <Nav.Item as="li">
                    <Nav.Link active as={NavLink} to="/dashboard">All Recognitions</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={NavLink} to="/filter/myrecognitions">My Recognitions</Nav.Link>
                </Nav.Item>
                <ButtonGroup as="ButtonGroup">
                    <Button onClick={event => window.location.href="/dashboard/pastday"}>
                        Past Day
                    </Button>
                    <Button onClick={event => window.location.href="/dashboard/pastweek"}>
                        Past Week
                    </Button>
                    <Button onClick={event => window.location.href="/dashboard/pastmonth"}>
                        Past Month
                    </Button>
                    <Button onClick={event => window.location.href="/dashboard/pastyear"}>
                        Past Year
                    </Button>
                    <Button onClick={event => window.location.href="/dashboard/alltime"}>
                        All Time
                    </Button>
                </ButtonGroup>
            </Nav>
        </header>
    );
};

function onReactionPress(reactionType, postId, forceUpdate) {
    axios.patch(`/feed/addReaction/${reactionType}/${postId}`).then(() => {
        forceUpdate();
    });
}

/*  POST COMPONENT
    Notes: can easily sub things in { } for stuff like matchNameToID(writerID)
    Spacing is done in the <div> style
*/
const Post = ({ like, celebrate, support, love, insightful, curious, postId, writerName, recognizeeName, content, coreValue, createdAt, reactionUpdate }) => {
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
                    <Row className="row-padding">
                        <Col>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("like", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/like.svg" rounded />
                                <Badge className="badge-mods">
                                    {like}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("celebrate", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/celebrate.svg" rounded />
                                <Badge className="badge-mods">
                                    {celebrate}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("support", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/support.svg" rounded />
                                <Badge className="badge-mods">
                                    {support}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("love", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/love.svg" rounded />
                                <Badge className="badge-mods">
                                    {love}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("insightful", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/insightful.svg" rounded />
                                <Badge className="badge-mods">
                                    {insightful}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("curious", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="/curious.svg" rounded />
                                <Badge className="badge-mods">
                                    {curious}
                                </Badge>
                            </Button>
                        </Col>
                        <Col>{ coreValue.map((data, key) => {
                                return (
                                    <div className="post-tags">
                                        <Badge pill bsPrefix="reaction-tags">
                                            {data}
                                        </Badge>
                                    </div>
                                );
                              })}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export const Posts = (props) => {
    const [postData, setPostData] = useState([]);
    const [reactionUpdateValue, setReactionUpdateValue] = useState(0);
    const reactionUpdate = () => setReactionUpdateValue(reactionUpdateValue+1);

    const getPostData = () => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length-1)
        console.log(emailString)
        axios.post('/feed/displayRecognitions/dashboardFilter', { values : props.filterValue.pathname.split('/').slice(-1)[0], userEmail : emailString })
            .then(response => {
                //console.log(response);
                const allPosts = response.data;
                setPostData(allPosts);
            })
            .catch(error => console.log("Error: ", error));
    }

    useEffect(() => {
        let path = props.filterValue.pathname
        getPostData();
    }, [props.forceUpdateValue, reactionUpdateValue]);

    return (
        <div>
            <FeedHeader />
            <div className="post-container">
                {postData.map((data, key) => {
                    return (
                        <div key={key}>
                            <Post
                                like={data.like || 0}
                                celebrate={data.celebrate || 0}
                                support={data.support || 0}
                                love={data.love || 0}
                                insightful={data.insightful || 0}
                                curious={data.curious || 0}
                                postId={data._id}
                                key={key}
                                writerName={data.writerName}
                                recognizeeName={data.recognizeeName}
                                content={data.content}
                                coreValue={data.coreValue}
                                createdAt={data.createdAt}
                                reactionUpdate={reactionUpdate}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
