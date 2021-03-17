import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import PostModal from "../PostModal/PostModal"


function Dashboard(props) {
    const [peers, setPeers] = useState([]);
    useEffect(() => {
      axios.get("/write/getPeerList").then((response) => {
        let res = response.data.map(person => person['firstName'] + ' ' + person['lastName'])
        setPeers(res);
      });
    })
  
    return (
      <Layout>
          <p>Dashboard</p>
          <PostModal peers= {peers} />
          <br />
          <br />
          <a href="/">Logout</a>  
      </Layout>
    );
}

export default Dashboard;