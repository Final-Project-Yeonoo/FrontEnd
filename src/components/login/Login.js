import React, {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import styles from './css/Login.module.css';
import { setLoginUserInfo } from '../../yougeunWorking/login-util';
import { Link, useNavigate } from 'react-router-dom';
import {API_BASE_URL,FINDALL} from '../../config/host-cofig';
const Login = () => {

    const API_LOGIN_URL = API_BASE_URL + FINDALL +'/signin'

    const redirection = useNavigate();
    const [companyCode, setCompanyCode] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 유효성 검사를 수행하고 필요한 경우 경고 메시지를 표시합니다.
        if (!companyCode || !id || !password) {
            alert('모든 값을 입력해주세요.');
            return;
        }

        // 로그인 처리 로직을 추가하세요
        // API 호출이나 다른 필요한 로직을 수행할 수 있습니다.
        console.log('로그인 처리 로직 실행');

        fetchLogin();

    };

    // 서버에 AJAX요청
  const fetchLogin = async() => {

 

    const res = await fetch(API_LOGIN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        empId : id, 
        empPassword : password
      })
    });

    if (res.status === 400 || res.status === 500) { // 가입이 안되어있거나, 비번틀린 경우
      const text = await res.text(); // 서버에서 온 문자열 읽기
      alert(text);
      return;
    }

    const userInfo = await res.json(); // 서버에서 온 json 읽기
    // alert(json.userName);

    // json에 담긴 인증정보를 클라이언트에 보관
    // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨
    // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐
    setLoginUserInfo(userInfo);

   
    // 홈으로 리다이렉트
    redirection('/');

  };

  
  
    // 로그인 요청 핸들러
    // const loginHandler = e => {
    //   e.preventDefault();
    // };



    // const handleSubmit = (e) => {
    //     e.preventDefault(); 
        
    //     // 서버에 로그인 요청 전송
    //   fetchLogin();
    // }




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
                                id="empId"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            <Form.Control
                                style={{marginLeft:'0'}}
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                id="empPassword"
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
