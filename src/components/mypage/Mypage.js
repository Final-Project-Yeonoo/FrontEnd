import styles from "./css/Mypage.module.css";
import { useEffect, useState, useRef } from "react";
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Form, Row,FormGroup,Label,Input,Col,Button  } from 'reactstrap';
import { Checkbox, Divider, Grid } from '@mui/material';
import ImgUpload from "./ImgUpload";
import { getLoginUserInfo } from "../../yougeunWorking/login-util";
import { json } from "react-router-dom";
import { setLoginUserInfo } from "../../yougeunWorking/login-util";







function Mypage({ employeeId }) {
  const [employeeInfo, setEmployeeInfo] = useState({
    empId: "12345",
    empName: "John Doe",
    deptName: "HR",
    posName: "Manager",
    empExtension: "123",
    empPassword: "",
    empPhone: "010-111-222",
    empAddress: "서울시 강남구"
  });


  useEffect(() => {
    // 백엔드에서 사원 정보를 FETCH하는 함수
    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8888/ynfinal/employee/mypage/`+ localStorage.getItem('EMP_NO'));
       
        const data = await response.json();
        console.log(data);
        setEmployeeInfo(data);
      } catch (error) {
        console.error("사원 정보를 가져오는 중에 오류가 발생했습니다:", error);
      }
    };

    fetchEmployeeInfo();
  }, [employeeId]);

  const handleMyInfoChange = async () => {
    // console.log(newPassword, newAddr, newPhoneNumber);
    console.log({...employeeInfo});

    try {
      await fetch(`http://localhost:8888/ynfinal/employee/mypage`, {
        method: "PATCH",
        body: JSON.stringify({...employeeInfo}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      // 비밀번호 변경 성공한 경우, 성공 처리를 진행하세요 (예: 알림 메시지, 리다이렉트 등)
    } catch (error) {
      console.error("비밀번호 변경 중에 오류가 발생했습니다:", error);
      // 오류 처리를 진행하세요 (예: 알림 메시지, 오류 상태 표시 등)
    }
  };


  const [token, setToken] = useState(getLoginUserInfo().token);


  
  const fetchSignUpPost = async () => {

    // 요청 헤더 설정
    const requestHeader = {
      'Authorization': 'Bearer ' + token
    };

      console.log(token);


    const userFormData = new FormData();
    userFormData.append('profileImg', $fileTag.current.files[0]);

    const res = await fetch('http://localhost:8888/ynfinal/employee/image', {
      method: 'POST',
      headers: requestHeader,
      body: userFormData
    });
    if (res.status === 200) {
      alert('사진 업로드 성공');
      const json = await res.json();
      setLoginUserInfo(json);
      setToken(json.token);
      
    } else {
      alert('서버와의 통신이 원활하지 않습니다.');
    }

    
  };



  const $fileTag = useRef();

  // 이미지 파일 상태변수
  const [imgFile, setImgFile] = useState(null);

  // 이미지파일을 선택했을 때 썸네일 뿌리기
  const showThumbnailHandler = e => {

    // 첨부된 파일 정보
    const file = $fileTag.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    }
  };


  return (
    <>

<Nav variant="tabs" defaultActiveKey="0">
                <Nav.Item>
                    <Nav.Link eventKey="0">My Page</Nav.Link>
                </Nav.Item>
            </Nav>

 


    
      <div className={styles.usercontainer}>
        <div className={styles.profileImgcontainer}>
          <div className={styles.profileImg}>
              <div>
              <Grid item xs={12}>
                  <div className="thumbnail-box" style={{width:'100px', height:'100px', overflow:'hidden'}} onClick={() => $fileTag.current.click()}>
                      <img
                        style={{width:'100%', height:'100%'}}
                        src={imgFile  || require('./img/122.png')}
                        alt="profile"
                        
                      />
                  </div>
                  <label className='signup-img-label' htmlFor='profile-img' >프로필 이미지 추가</label>
                  <input
                      id='profile-img'
                      type='file'
                      style={{display: 'none'}}
                      accept='image/*'
                      ref={$fileTag}
                      onChange={showThumbnailHandler}
                  />
                </Grid>
                <button onClick={fetchSignUpPost}>사진 적용</button>

                {/* <ImgUpload /> */}
              </div>
              {/* <span>클릭해서 사진을 변경하세요</span> */}
          </div>
        </div> 
        <Form className={styles.form}>
          <Row className={styles.row}>
            <Col md={5}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empName">이름</Label>
                </div>
                <Input
                  id="empName"
                  name="empName"
                  type="text"
                  value={employeeInfo.empName}
                  disabled
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empId">사원ID</Label>
                </div>
                <Input
                  id="empId"
                  name="empId"
                  placeholder="사원ID"
                  type="text"
                  value={employeeInfo.empId}
                  disabled
                  readOnly
                />
              </FormGroup>
            </Col>
            </Row>
            <Divider variant="middle" />
            <Row className={styles.row}>
                <Col md={5}>
                <FormGroup className={styles.formGroup}>
                  <div className={styles.tag}>
                    <Label for="deptCode">부서명</Label>
                  </div>
                  <Input
                    id="deptCode"
                    name="deptCode"
                    disabled
                    value={employeeInfo.deptName}
                    readOnly
                  />
                </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup className={styles.formGroup}>
                    <div className={styles.tag}>
                      {" "}
                      <Label for="posCode">직급명</Label>
                    </div>
                    <Input id="posCode" name="posCode" 
                    value={employeeInfo.posName}
                    
                    disabled
                    />
                  </FormGroup>
                </Col>
             </Row>
            <Divider variant="middle" />
            <Row className={styles.row}>
              <Col md={5}>
                <FormGroup className={styles.formGroup}>
                  <div className={styles.tag}>
                    {" "}
                    <Label for="empExtension">내선번호</Label>
                  </div>
                  <Input
                    id="empExtension"
                    name="empExtension"
                    value={employeeInfo.empExtension}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
             <Divider variant="middle" />
           <Row>
            <Col md={5}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="password">비밀번호</Label>
                </div>
                <Input
                  id="empPassword"
                  name="empPassword"
                  type='password'
                  placeholder="비밀번호를 반드시 입력하세요"
                  value={'' ||employeeInfo.empPassword}
                  onChange={(e) => setEmployeeInfo({...employeeInfo, empPassword:e.target.value})}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empPhone">휴대전화</Label>
                </div>
                <Input
                  id="empPhone"
                  name="empPhone"
                  value={'' || employeeInfo.empPhone}
                  onChange={(e) => setEmployeeInfo({...employeeInfo, empPhone:e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>
         <Row>
            <Col md={10}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                
                  <Label for="empExtension">주소</Label>
                </div>
                <Input
                  id="empAddress"
                  name="empAddress"
                  className={styles.addrInput}
                  value={'' ||employeeInfo.empAddress}
                  onChange={(e) => setEmployeeInfo({...employeeInfo, empAddress:e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>



         <div className={styles.buttoncontainer}>
                        <Button variant="success" onClick={handleMyInfoChange}>
                            변경
                        </Button>
                    </div>

        </Form>
      
      </div>
      </>
  );
}

export default Mypage;