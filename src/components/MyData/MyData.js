import Layout from "../Layout/Layout";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeArray } from "jquery";
import { Container } from "react-bootstrap";


function MyData(props) {

    const [data, setData] = useState({ recognitionCount: [] });

    useEffect(() => {
        let email = localStorage.getItem('user')
        let emailString = email.slice(1, email.length-1)
        axios.post("/feed/myData", { userEmail : emailString }).then((response) => {
            console.log(response)
            setData({ recognitionCount: response.data})
        });    
        
        
    }, [])     

    console.log(data.recognitionCount)

    return (
        <Layout>
            
        </Layout>
    );
}

export default MyData;