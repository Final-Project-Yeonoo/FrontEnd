import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import './scss/login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 로그인 처리 로직을 추가하세요
    };

    return (
        <>
            <div>
                <Container className="col-sm-8 col-md-6 col-lg-4" id="loginBox">
                    <div className="logoSize">
                        <img src="/logo.png" width="100%" alt="ERP시스템 로고"/>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Company Code"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 mt-4" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="자동 로그인"/>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" style={{letterSpacing: '5px', marginTop: '30px'}}>
                                LOGIN
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default Login;
