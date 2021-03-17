import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import PostModal from "../PostModal/PostModal"

function Dashboard(props) {
    return (
      <Layout>
          <p>Dashboard</p>
          <PostModal people={[]} />
          <br />
          <br />
          <a href="/">Logout</a>  
      </Layout>
    );
}

export default Dashboard;