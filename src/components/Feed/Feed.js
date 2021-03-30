import React from "react";
import Layout from "../../Layout";
import axios from "axios";
import parser from "body-parser";
import { postData } from "./Post/test_posts";
import { Posts } from "./Post/Post";
import "./Feed.css";
import { Container } from "react-bootstrap";


function Feed(props) {

    return (
        <div >
            <Container fluid style={{width:'60%'}}>
                <Posts />
            </Container>
            
        </div>
    );
}

export default Feed;