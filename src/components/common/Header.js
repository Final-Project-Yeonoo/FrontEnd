import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useState} from "react";
import styles from './css/Header.module.css'
import {useNavigate} from "react-router-dom";
import {isLogin} from '../../yougeunWorking/login-util';

function Header() {

    let navigate = useNavigate()

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        localStorage.clear();
        // 로그아웃 상태로 변경하는 로직 추가
    }

    const headerClass = isDarkMode ? styles['dark-mode'] : '';
    console.log(styles);

    return (

        <>
            <div id={styles.headerArea}>
                <Navbar className={headerClass} bg={isDarkMode ? 'dark' : 'light'} expand="lg">
                    <Container fluid>
                        <Navbar.Brand onClick={() => {
                            navigate('/')
                        }}>
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
                                <Nav.Link href="/" className="col-lg-3" style={{color: 'white'}}>Home</Nav.Link>
                                <Nav.Link href="/message" className="col-lg-4"
                                          style={{color: 'white'}}>Message</Nav.Link>
                                <NavDropdown title={
                                    <span style={{color: '#ffffff'}} className=" my-auto">Setting</span>
                                }

                                             id="navbarScrollingDropdown" className="col-lg-4">
                                    <NavDropdown.Item href="#action3" style={{display: "flex"}}>
                                        <span style={{marginRight: "30px"}}>Dark Mode</span>
                                        <SwitchExample onClick={toggleDarkMode} isDarkMode={isDarkMode}/>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='/mypage'>
                                        Change Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </NavDropdown>
                                {isLogin ?
                                    <Nav.Link href="/login" className="col-lg-4" onClick={() => handleLogout()}
                                              style={{color: 'white'}}>
                                        Logout
                                    </Nav.Link> :
                                    <Nav.Link href="/login" className="col-lg-4">
                                        Login
                                    </Nav.Link>
                                }
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

function SwitchExample({onClick, isDarkMode}) {
    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                checked={isDarkMode}
                onChange={onClick}
            />
        </Form>
    );
}


export default Header;