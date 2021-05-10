import * as React from 'react';
//import { readSync, realpathSync } from 'fs';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PostModal.css";
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Dropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState, useRef, Fragment } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
);

const PostModal = (props) => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const [recognizee, setRecognizee] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [coreValue, setCoreValue] = useState([]);
    const [coreSelections, setCoreSelections] = useState([]);

    const handleClose = () => { setShow(false); }
    const handleShow = () => {
      axios.post("write/getInfo/getCoreValue", { company: String(props.companies[0]) })
        .then(response => {
          setCoreValue(response.data["values"]);
        })
      setRecognizee(String(props.peers[1])); setShow(true);
      setEmployeeID(props.userID[1])
    }
    function handleSubmit(event) {
      console.log(content);
      const sendRecognition = {
        writerID: props.writerID,
        writerName: props.writerName,
        recognizeeID: employeeID,
        recognizeeName: recognizee,
        content: content,
        coreValue: coreSelections,
        createdAt: new Date()
      }
      axios.post('/write/writeRecognition', sendRecognition)
        .then(response => {
          console.log("RESPONSE", response);
          props.forceUpdate();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      event.preventDefault();
    }

    function peerChange(name) {
      let listPeer = props.peers;
      let i = 0;
      for (i = 0; i < listPeer.length; i++) {
        if (listPeer[i] === name)
          break;
      }
      setEmployeeID(props.userID[i])
      document.getElementById("peerPosition").innerHTML = props.positions[i];
      document.getElementById("peerCompany").innerHTML = props.companies[i];
      document.getElementById("peerAvatar").src = props.avatar[i];

      axios.post("write/getInfo/getCoreValue", { company: String(props.companies[i]) })
        .then(response => {
          setCoreValue(response.data["values"]);
        })
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Write a Post
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
        >
          <Modal.Header closeButton>
                <Image className="postCompanyLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UKG_%28Ultimate_Kronos_Group%29_logo.svg/1200px-UKG_%28Ultimate_Kronos_Group%29_logo.svg.png" fluid />
          </Modal.Header>
          <Modal.Body>
              <Row>
                <Col xs={12} md={4}>
                    <div class="bodySmall">
                        <h5>Recognize a Peer</h5>
                    </div>
                    <div className='mt-2'></div>
                    <div class="bodySmall curveSearch">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <span className="bodyTiny chooseEmployeePadding">
                                    Choose a Peer&nbsp;&nbsp;
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {props.peers.map(peer => (
                                  <Dropdown.Item onClick={(e) => {
                                    setRecognizee(String(e.target.innerHTML))
                                    peerChange(e.target.innerHTML)
                                  }}>
                                     {peer}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Row>
                        <Col className="bodySmall center">
                            <div className='mt-2'>
                                <Image src={props.avatar[0]} width="128" height="128"id="peerAvatar" rounded />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                      <Col className="bodyTiny center shifted employeeDetailsContainer">
                        <div className="fullWidth center">
                          {recognizee}
                        </div>
                        <div className="fullWidth center" id="peerPosition">
                          {props.positions[1]}
                        </div>
                        <div className="fullWidth center" id="peerCompany">
                          {props.companies[1]}
                        </div>
                      </Col>
                    </Row>
                </Col>

                <Col>
                    <Form className="fullHeight" onSubmit={handleSubmit}>
                        <Form.Group controlId="content" className="postBoxAlignment">
                                <Row>
                                    <Col>
                                        <h5 style={{ marginTop: '5px' }}>Make Your Post</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <Button size="sm" type="submit" onClick={handleClose}>
                                            Recognize!&nbsp;&nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="mt-2 flexGrow">
                                    <div className="fullHeight">
                                        <Form.Control
                                          as="textarea" rows={6} className="postTextArea"
                                          type="content"
                                          value={content}
                                          onChange ={(e) => setContent(e.target.value)}
                                        />
                                        <Typeahead
                                          style={{ marginTop: '10px' }}
                                          id="basic-typeahead-multiple"
                                          labelKey="name"
                                          multiple
                                          onChange={setCoreSelections}
                                          options={coreValue}
                                          placeholder="Choose core values"
                                          selected={coreSelections}
                                        />
                                    </div>
                                </div>
                        </Form.Group>
                    </Form>
                </Col>
              </Row>
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default PostModal;
