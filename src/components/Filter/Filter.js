import Layout from "../Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterFeed from "../FilterFeed/FilterFeed"



function Filter(props) {
    
    return (
        <Layout >
            <FilterFeed location={props.location} />
        </Layout>
    );
}

export default Filter;