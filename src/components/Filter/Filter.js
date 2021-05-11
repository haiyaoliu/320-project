import Layout from "../Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterFeed from "../FilterFeed/FilterFeed"



function Filter(props) {
    const [forceUpdateValue, setForceUpdateValue] = useState(0);
    const forceUpdate = () => setForceUpdateValue(forceUpdateValue + 1);
    
    return (
        <Layout {...props} forceUpdate={forceUpdate}>
            <FilterFeed forceUpdateValue={forceUpdateValue} location={props.location} />
        </Layout>
    );
}

export default Filter;