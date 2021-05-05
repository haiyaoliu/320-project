import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Feed.css";
import { ListGroup, Card, Container, Col, Row, Nav, ButtonGroup, Button, Badge, Image, Modal, Form} from "react-bootstrap";
import { getUser } from "../../../utils/Common";

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
                <ButtonGroup>
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

function onReactionPress(reactionType, postId, forceUpdate) {
    axios.patch(`/feed/addReaction/${reactionType}/${postId}`, {reacterName: getUser()}).then(() => {
        forceUpdate();
    });
}

function ReportButton(props) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        console.log("Hello world!");
        console.log(props.postId);
        axios.patch(`/reports/writeReport/${props.postId}`, { reportReason: content });
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow} bsPrefix="report-button-transparent btn bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Report a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="fullHeight" onSubmit={handleSubmit}>
                <Form.Group controlId="content" className="postBoxAlignment">
                    <Row>
                        <Col>
                            <h5 style={{ marginTop: '5px' }}>Describe your report:</h5>
                        </Col>
                        <Col className="text-right">
                            <Button size="sm" type="submit" onClick={{handleClose}}>
                                Report
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> */}
                            </Button>
                        </Col>
                    </Row>
                    <div className="mt-2 flexGrow">
                        <div className="fullHeight">
                            <Form.Control
                              as="textarea" rows={6} className="postTextArea"
                              type="content"
                              value={content}
                              onChange ={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
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
                    <Card.Title>
                        <div>
                            <p style={{ color: 'blue', display: 'inline' }}>{recognizeeName}</p> has been recognized by <p style={{ color: 'blue', display: 'inline' }}>{writerName}</p>
                            <ReportButton postId={postId} />
                        </div>
                    </Card.Title>
                    <Card.Subtitle><small>{timeValue.toUTCString().slice(0,-3)}</small></Card.Subtitle>
                    <Card.Text style={{ "marginTop":"10px"}}>
                        {content}
                    </Card.Text>
                    <Row className="row-padding">
                        <Col>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("like", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="like.svg" rounded />
                                <Badge className="badge-mods">
                                    {like}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("celebrate", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="celebrate.svg" rounded />
                                <Badge className="badge-mods">
                                    {celebrate}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("support", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="support.svg" rounded />
                                <Badge className="badge-mods">
                                    {support}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("love", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="love.svg" rounded />
                                <Badge className="badge-mods">
                                    {love}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("insightful", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="insightful.svg" rounded />
                                <Badge className="badge-mods">
                                    {insightful}
                                </Badge>
                            </Button>
                            <Button bsPrefix="reaction-button" onClick={() => onReactionPress("curious", postId, reactionUpdate)}>
                                <Image className="emoji-padding" src="curious.svg" rounded />
                                <Badge className="badge-mods">
                                    {curious}
                                </Badge>
                            </Button>
                        </Col>
                        <Col>{ coreValue.map((data, key) => {
                                return (
                                    <div className="post-tags">
                                        <Badge pill bsPrefix="reaction-tags" key={key}>
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
        axios.get('/feed/displayRecognitions')
            .then(response => {
                //console.log(response);
                const allPosts = response.data;
                setPostData(allPosts);
            })
            .catch(error => console.log("Error: ", error));
    }

    useEffect(() => {
        getPostData();
    }, [props.forceUpdateValue, reactionUpdateValue]);

    return (
        <div>
            <FeedHeader />
            <div className="post-container">
                {postData.map((data, key) => {
                    // console.log(data)
                    return (
                        <div key={key}>
                            <Post
                                like={data.likeCount || 0}
                                celebrate={data.celebrateCount || 0}
                                support={data.supportCount || 0}
                                love={data.loveCount || 0}
                                insightful={data.insightfulCount || 0}
                                curious={data.curiousCount || 0}
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

