import React from "react";
import Layout from "../../Layout";
import axios from "axios";
import parser from "body-parser";
import { postData } from "./Post/test_posts";
import { Posts } from "./Post/Post";
import "./Feed.css";


function Feed(props) {



    return (
        <Layout>
            <div className="feed">
                <Posts />
            </div>
        </Layout>
    );
}

export default Feed;