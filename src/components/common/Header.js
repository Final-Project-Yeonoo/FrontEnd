import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import styles from './css/Header.module.css'
import {useNavigate} from "react-router-dom";

function Header() {

    let navigate = useNavigate()

    return (

        <>
            <div id={styles.headerArea}>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand onClick={() => {navigate('/')}}>
                            <img src="/logo.png" width="270px"
                                 alt="ERP시스템 로고"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href="/"  className="col-lg-3">Home</Nav.Link>
                                <Nav.Link href="/message" className="col-lg-4">Message</Nav.Link>
                                <NavDropdown title="Setting" id="navbarScrollingDropdown" className="col-lg-4">
                                    <NavDropdown.Item href="#action3" style={{display:"flex"}}>
                                        <span style={{marginRight:"30px"}} >Dark Mode</span>
                                        <SwitchExample/>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Change Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#" className="col-lg-4">
                                    Logout
                                </Nav.Link>
                            </Nav>
                            <Form className="d-flex" style={{marginRight: '40px'}}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

function SwitchExample() {
    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                // label="Check this switch"
            />
        </Form>
    );
}


export default Header;