import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import PostModal from "../PostModal/PostModal"


function Dashboard(props) {
  const [peers, setPeers] = useState([{}]);
  const [position, setPosition] = useState([{}]);
  const [company, setCompany] = useState([{}]);
  const [employeeID, setEmployeeID] = useState([{}])
  const [writerID, setWriterID] = useState("")

  
  useEffect(() => {
    axios.get("/write/getPeerList").then((response) => {
      let name = response.data.map(person => person['firstName'] + ' ' + person['lastName'])
      let position = response.data.map(person => person['positionTitle'])
      let company = response.data.map(person => person['companyName'])
      let employeeID = response.data.map(person => person['employeeId'])
      setPeers(name);
      setPosition(position);
      setCompany(company);
      setEmployeeID(employeeID)
    }).catch(error => {
      console.error('There was an error!', error);
    });
    
    axios.post("write/getCurrentUser", { email: String(props.user) }).then((response) => {
      console.log(response.data)
      setWriterID(response.data["employeeId"]);
    }).catch(error => {
      console.log('There was an error!', error);
    })
    
  }, [])
  
    return (
      <Layout>
          <p>Dashboard</p>
          <PostModal peers={peers} positions={position} 
                     companies={company} userID={employeeID} writerID={writerID}/>
          <br />
          <br />
          <a href="/">Logout</a>  
      </Layout>
    );
}

export default Dashboard;