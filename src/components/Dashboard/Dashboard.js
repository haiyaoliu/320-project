import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import PostModal from "../PostModal/PostModal"
import { Button } from "bootstrap";
import Feed from "../Feed/Feed"


function Dashboard(props) {
  
    return (
      <Layout {...props}>
          <Feed />
      </Layout>
    );
}

export default Dashboard;