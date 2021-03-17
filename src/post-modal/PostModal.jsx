import * as React from 'react';
//import { readSync, realpathSync } from 'fs';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";
import "./PostModal.css";
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from 'react-bootstrap/Button'
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
import { useState } from 'react';

const PostModal = (props) => (
    <div>
        Test Names:
        {props.people.map(person => (
            <div>
                {person.firstName}
            </div>
        ))}
    <Example />
   </div>
);

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
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

function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
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
                                    Choose a Peer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item eventKey="1" active>
                                John Smith
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Name 2
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" /*active*/>
                                Name 3
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="1">
                                Name 4
                            </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Row>
                        <Col className="bodySmall center">
                            <div className='mt-2'>
                                <Image src="https://randomuser.me/api/portraits/men/79.jpg" rounded />
                            </div>
                        </Col>
                        <Col className="bodyTiny center shifted employeeDetailsContainer">
                                    <div className="fullWidth center">
                                        John Smith
                                    </div>
                                    <div className="fullWidth center">
                                        CEO
                                    </div>
                                    <div className="fullWidth center">
                                        Big Tech
                                    </div>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <Form className="fullHeight">
                        <Form.Group controlId="exampleForm.ControlTextarea1" className="postBoxAlignment">
                                <Row>
                                    <Col>
                                        <h5>Make Your Post</h5>
                                    </Col>
                                    <Col className="text-right">
                                        <Button size="sm">
                                            Recognize!&nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                        </Button>{' '}
                                    </Col>
                                </Row>
                            <div className="mt-2 flexGrow">
                                <div className="fullHeight">
                                    <Form.Control as="textarea" rows={6} className="postTextArea"/>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Col>
              </Row>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }

export default PostModal;