import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import PostModal from "../PostModal/PostModal"
import { Button } from "bootstrap";
import Feed from "../Feed/Feed"

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value++);
}

function Dashboard(props) {
      const [forceUpdateValue, setForceUpdateValue] = useState(0);
    const forceUpdate = () => setForceUpdateValue(forceUpdateValue + 1);

    return (
      <Layout {...props} forceUpdate={forceUpdate}>
        <Feed forceUpdateValue={forceUpdateValue} location={props.location}/>
      </Layout>
    );
}

export default Dashboard;
