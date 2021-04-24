import Layout from "../Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterFeed from "../FilterFeed/FilterFeed"



function Filter(props) {
    
    return (
        <Layout >
            <FilterFeed  filterValue={props.location.pathname.split("/").slice(-1)[0]} />
        </Layout>
    );
}

export default Filter;