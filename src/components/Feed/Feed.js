import React from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import parser from "body-parser";
import { postData } from "./Post/test_posts";
import { Posts } from "./Post/Post";
import "./Feed.css";
import { Container } from "react-bootstrap";


function Feed(props) {

    return (
        <div >
            <Container fluid>
                <Posts filterValue={props.location}/>
            </Container>
        </div>
    );
}

export default Feed;
