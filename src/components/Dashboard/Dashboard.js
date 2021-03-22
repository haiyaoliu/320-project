import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import { Button } from "bootstrap";
import Feed from "../Feed/Feed"

function Dashboard(props) {
    // Add other components to this if we want them to display on the same page
    return (
        <Layout>
            <Feed />
        </Layout>
    );
}

export default Dashboard;