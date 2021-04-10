import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import PostModal from "../PostModal/PostModal"
import { Button } from "bootstrap";
import Feed from "../Feed/Feed"

function useForceUpdate() {
    const [value, setValue] = useState(0);
    console.log("I've forced an update!");
    return () => setValue(value => value++);
}

function Dashboard(props) {
  const [peers, setPeers] = useState([{}]);
  const [position, setPosition] = useState([{}]);
  const [company, setCompany] = useState([{}]);
  const [employeeID, setEmployeeID] = useState([{}])
  const [writerID, setWriterID] = useState("")
  const [writerName, setWriterName] = useState("")
  const [forceUpdateValue, setForceUpdateValue] = useState(0);
  // const forceUpdate = useForceUpdate();
  const forceUpdate = () => setForceUpdateValue(forceUpdateValue+1);

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
      setWriterID(response.data["employeeId"]);
      setWriterName(response.data["firstName"] + ' ' + response.data["lastName"])
    }).catch(error => {
      console.log('There was an error!', error);
    })

  }, [])

    return (
      <Layout>
          <PostModal peers={peers} positions={position} writerName = {writerName}
                     companies={company} userID={employeeID} writerID={writerID}
                     forceUpdate={forceUpdate} />
          <Feed forceUpdateValue={forceUpdateValue} />
      </Layout>
    );
}

export default Dashboard;
