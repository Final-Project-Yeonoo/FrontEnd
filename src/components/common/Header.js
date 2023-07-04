import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useState} from "react";
import styles from './css/Header.module.css'
import {useNavigate} from "react-router-dom";
import { isLogin } from '../../yougeunWorking/login-util';
function Header() {

    let navigate = useNavigate()

    const [isDarkMode, setIsDarkMode] = useState(false);
    const darkModeClass = isDarkMode ? 'dark-mode' : '';

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };
        // handleLogout 함수 정의
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        // 로그아웃 상태로 변경하는 로직 추가
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleMypage = ()=> {
        navigate('/mypage');
    }

    const handleMessage = () => {
        navigate('/message');
    }

    const handleHome = () => {
        navigate('/');
    }
    return (

        <>
            <div id={styles.headerArea}>
                <Navbar bg="light " expand="lg">
                    <Container fluid  style={{backgroundColor : '#98B4D4', color : '#ffffff'}}>
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
                                <Nav.Link  onClick={() => handleHome()} className="col-lg-3">Home</Nav.Link>
                                <Nav.Link  onClick={() => handleMessage()} className="col-lg-4">Message</Nav.Link>
                                <NavDropdown title="Setting" id="navbarScrollingDropdown" className="col-lg-4">
                                    <NavDropdown.Item href="#action3" style={{display:"flex"}}>
                                        <span style={{marginRight:"30px"}} >Dark Mode</span>
                                        <SwitchExample isDarkMode={isDarkMode} setIsDarkMode={handleDarkModeToggle} />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleMypage()}>
                                        Change Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </NavDropdown>
                               { isLogin ? 
                                <Nav.Link  className="col-lg-4" onClick={() => handleLogout()}>
                                    Logout
                                </Nav.Link> :
                                <Nav.Link  className="col-lg-4" onClick={() => handleLogin()}>
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