import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import { Button } from "bootstrap";

function Dashboard(props) {

    function pageSwap() {
      axios.get('/feed');
    }
    return (
      <Layout>
        <p>dashboard</p>
        <a href="/">logout</a>
      </Layout>
    );
}

export default Dashboard;