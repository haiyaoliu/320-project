import Layout from "../Layout/Layout";
import "./Rankings.css";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeArray } from "jquery";
import { Container } from "react-bootstrap";


function Rankings(props) {

    const [data, setData] = useState({ employees: []});

    useEffect(() => {
        axios.get("/testing_only/employeeName").then((response) => {
            setData({ employees: response.data})
        });    
    }, [])

    console.log(data);
    /**if(data.employees.length > 2) {
        data.employees[0].push('[gold medal placeholder]')
        data.employees[1].push('[silver medal placeholder]')
        data.employees[2].push('[bronze medal placeholder]')
    } **/
    
    function RandomGen() {
        return "https://randomuser.me/api/portraits/men/" + String(Math.floor(Math.random() * (99 - 3 + 1) + 3)) + ".jpg";
    }

    return (
        <Layout>
            <div id = "wrapper">
            <div className = "header">
                <h1>Our <br /> Rockstars</h1>
            </div>
            <div className = "high-achievers">
                <h2>All-Time <span className = "bold-blue">High</span> Achievers</h2>
                <div className = "number">
                    <div className = "profile-pic">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg"/>
                    </div>
                    { data.employees.slice(0,1).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <img src="gold_medal.svg"/> <br />
                            <span className= "bold-blue">{r}</span>
                            <br /> Recognitions 
                        </div>)) }
                    
                </div>
                <hr />
                <div className = "number">
                    <div className = "profile-pic">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg"/>
                    </div>
                    { data.employees.slice(1,2).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <img src="silver_medal.svg"/> <br />
                            <span className= "bold-blue">{r}</span>
                            <br /> Recognitions 
                        </div>)) }
                </div>
                <hr />
                <div className = "number">
                    <div className = "profile-pic">
                        <img src="https://randomuser.me/api/portraits/men/2.jpg"/>
                    </div>
                    { data.employees.slice(2,3).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <img src="bronze_medal.svg"/> <br />
                            <span className= "bold-blue">{r}</span>
                            <br /> Recognitions 
                        </div>)) }
                </div>
                <hr />
            </div>

            <div className ="achievers">
                <h2>Company All-Stars</h2>
                <ul className = "achievers-list">
                  { data.employees.slice(3).map(([n,r]) => (
                    <li>
                        <div>
                            <img src={RandomGen()} width='100'/>
                        </div>
                        {n} <br />
                        {r} Recognitions
                    </li>)) }
                </ul>
            </div>
            <br />
            </div>
        </Layout>
    );
}

export default Rankings;