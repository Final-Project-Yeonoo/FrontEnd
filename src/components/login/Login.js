import React, {useState, useNavigate} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import './css/Login.module.css';
import {API_BASE_URL, FINDALL} from '../../config/host-cofig'
import { setLoginUserInfo, isLogin } from '../../util/login-util';


const Login = () => {

    // const redirection = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');



    const REQUEST_URL = API_BASE_URL + FINDALL + '/signin';

    // 서버에 AJAX요청
    const fetchLogin = async() => {
  
      // 아이디, 비밀번호 입력 태그 얻어오기
      const $Id = document.getElementById('empId');
      const $password = document.getElementById('empPassword');
  
      const res = await fetch(REQUEST_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          empId: $Id.value,
          empPassword: $password.value
        })
      });
  
      console.log();

      if (res.status === 400) { // 가입이 안되어있거나, 비번틀린 경우
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
  console.log(userInfo);
  
      // 홈으로 리다이렉트
    //   redirection('/login');
  
    };

  
  
    // 로그인 요청 핸들러
    // const loginHandler = e => {
    //   e.preventDefault();
  
     
  
    // };





    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        // 서버에 로그인 요청 전송
      fetchLogin();
    }




    return (
        <>
            <div className="loginBackground">
                <Container className="col-sm-8 col-md-6 col-lg-4" id="loginBox">
                    <div className="logoSize">
                        <img src="/logo.png" width="100%" alt="ERP시스템 로고"/>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Company Code"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            /> */}
                        {/* </Form.Group> */}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control
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
