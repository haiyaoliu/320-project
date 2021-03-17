import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";

function Dashboard(props) {
    return (
      <Layout>
          <p>dashboard</p>
          <a href="/">logout</a>
      </Layout>
    );
}

export default Dashboard;