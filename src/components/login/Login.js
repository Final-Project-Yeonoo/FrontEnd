import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import styles from './css/Login.module.css';

const Login = () => {
    const [companyCode, setCompanyCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 유효성 검사를 수행하고 필요한 경우 경고 메시지를 표시합니다.
        if (!companyCode || !email || !password) {
            alert('모든 값을 입력해주세요.');
            return;
        }

        // 로그인 처리 로직을 추가하세요
        // API 호출이나 다른 필요한 로직을 수행할 수 있습니다.
        console.log('로그인 처리 로직 실행');
    };

    return (
        <>
            <div className={styles.backGround}>
                <Container className="col-sm-8 col-md-6 col-lg-4">
                    <Form className={styles.loginBox} onSubmit={handleSubmit} >
                        <div className= {styles.imgContainer} >
                            <img src="/logo.png" alt="ERP시스템 로고"  className={styles.imgSize}/>
                        </div>
                        <Form.Group controlId="formBasicCompanyCode">
                            <Form.Label></Form.Label>
                            <Form.Control
                                style={{ marginLeft: '0' }}
                                type="text"
                                placeholder="Company Code"
                                value={companyCode}
                                onChange={(e) => setCompanyCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                style={{marginLeft:'0'}}
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                style={{marginLeft:'0'}}
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
