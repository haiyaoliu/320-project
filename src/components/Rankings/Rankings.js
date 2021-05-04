import Layout from "../Layout/Layout";
import "./Rankings.css";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";


function Rankings(props) {

    const [data, setData] = useState({ employees: [] });
    const [avatar, setAvatar] = useState({})

    useEffect(() => {
        axios.get("/ranking/employeeName").then((response) => {
            setData({ employees: response.data})
        });
        axios.get("ranking/getAvatar").then((response) => {
            let info = response.data;
            let avatarMap = new Map();
            for (let i = 0; i < info.length; i++) {
                avatarMap.set(info[i].firstName + ' ' + info[i].lastName, info[i].legoCharacterUrl)
            }
            setAvatar(avatarMap);
        });
    }, [])

    /**if(data.employees.length > 2) {
        data.employees[0].push('[gold medal placeholder]')
        data.employees[1].push('[silver medal placeholder]')
        data.employees[2].push('[bronze medal placeholder]')
    } **/
    
    function getAvatar(name) {
        if (avatar.size > 0) {
            return avatar.get(name);
        }
        return ""
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
                    {data.employees.slice(0, 1).map(([n, r]) => (
                        <div className = "profile-pic">
                            <Image src={ getAvatar(n) }/>
                        </div>))}
                    { data.employees.slice(0,1).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <Image src="gold_medal.svg"/> <br />
                            <span className= "bold-blue">{r}</span>
                            <br /> Recognitions 
                        </div>)) }
                    
                </div>
                <hr />
                <div className = "number">
                    {data.employees.slice(1, 2).map(([n, r]) => (
                        <div className = "profile-pic">
                            <Image src={ getAvatar(n) }/>
                        </div>))}
                    { data.employees.slice(1,2).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <Image src="silver_medal.svg"/> <br />
                            <span className= "bold-blue">{r}</span>
                            <br /> Recognitions 
                        </div>)) }
                </div>
                <hr />
                <div className = "number">
                    {data.employees.slice(2, 3).map(([n, r]) => (
                        <div className = "profile-pic">
                            <Image src={ getAvatar(n) }/>
                        </div>))}
                    { data.employees.slice(2,3).map(([n,r]) => (
                        <div className = "achiever-details">
                            <div className = "achiever-name">{n} </div>
                            <Image src="bronze_medal.svg"/> <br />
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
                            <Image src={ getAvatar(n)} width='100'/>
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