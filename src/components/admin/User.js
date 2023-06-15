// import React from 'react'
import { useState } from 'react';
import styles from './css/User.module.css';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box'
import { Form, Row,FormGroup,Label,Input,Col,Button,  } from 'reactstrap';
import { Checkbox } from '@mui/material';

function AdminUser() {

  //상태변수로 회원가입 입력값 관리 , 실시간으로 userValue에 저장하는 방법을 사용
  // const [userValue, setUserValue] = useState({
  //   empName: false, 
  //   empId: false,
  //   empPassword: false,
  //   deptCode: false,
  //   posCode: false,
  //   empPhone: false,
  //   empExtension: false,
  //   empHireDate: false,
  //   empValidate: false
  // });

  // 검증완료 체크에 대한 상태변수 관리
  // const [correct, setCorrect] = useState({
  //   empName: '', //사용자이름
  //   empId: '', //사용자ID
  //   empPassword: '', //사용자비밀번호
  //   deptCode: '', //사용자 소속 부서코드
  //   posCode: '', //사용자 직급 코드
  //   empPhone: '', //사용자 휴대전화
  //   empExtension: '', //사용자 내선 번호
  //   empHireDate: '', //사용자 입사일
  //   empValidate: '' //사용자 입사일
  // });




//   입력칸과 권한설정이 모두 검증에 통과했는지 여부 검사
  // const isValid = () => {
  //   for (const key in correct) {
  //     const flag = correct[key];
  //     if (!flag) return false;
  //   }
  //   return true;
  // };



  // 저장하기 버튼 클릭 이벤트 핸들러
  // const joinButtonClickHandler = e => {
  //   e.preventDefault();

  //   // 사용자 정보 서버 요청
  //   if (isValid()) {
  //     fetchSignUpPost();
  //     alert('사용자 정보를 서버에 전송합니다');
  //   } else {
  //     alert('입력란과 권한설정을 다시 확인해주세요');
  //   }

  // };



//   사용자 등록 서버로 보내기
  // const fetchSignUpPost = async () => {
  //   const res = await fetch(API_BASE_URL, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(userValue)
  //   });

  //   if (res.status === 200) {
  //     alert('사용자가 등록되었습니다');
  //   } else {
  //     alert('서버와의 통신이 원활하지 않습니다');
  //   }
  // };


  return (
<>
<div className={styles.usercontainer}>
<Form className={styles.form}> 
  <Row className={styles.row}>
    <Col md={4}>
      <FormGroup className={styles.formGroup} >
       <div className={styles.tag}> <Label for="userName">
        이름 
        </Label></div>
        <Input
          id="userName"
          name="userName"
          placeholder="사용자명"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="userId">
        사원ID
        </Label></div>
        <Input
          id="userId"
          name="userId"
          placeholder="사원ID"
          type="text"
        />
      </FormGroup>
    </Col>
  <Col  md={4}>
  <FormGroup className={styles.formGroup}>
  <div className={styles.tag}> <Label for="password">
      비밀번호
        </Label></div>
    <Input
      id="password"
      name="password"
      placeholder="비밀번호"
    />
  </FormGroup>
  </Col>
  </Row>
  <Row>
  <Col md={4}>
  <FormGroup className={styles.formGroup}>
  <div className={styles.tag}> <Label for="password">
        부서코드
        </Label></div>
    <Input
      id="exampleAddress2"
      name="address2"
      placeholder="Apartment, studio, or floor"
    />
  </FormGroup>
  </Col>
  <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="password">
        직급명
        </Label></div>
        <Input
          id="exampleCity"
          name="city"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="password">
        휴대전화
        </Label></div>
        <Input
          id="exampleState"
          name="state"
        />
      </FormGroup>
    </Col>
    </Row>
    <Row>
    <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="password">
        내선번호
        </Label></div>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="password">
        입사일 
        </Label></div>
        <Input
          id="exampleZip"
          name="zip"
          type='date'
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup className={styles.formGroup}>
      <div className={styles.tag}> <Label for="password">
       활성화
        </Label></div>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
</Row>
  <FormGroup check>
    <Input
      id="exampleCheck"
      name="check"
      type="checkbox"
    />
    <Label
      check
      for="exampleCheck"
    >
      Check me out
    </Label>
  </FormGroup>
  <Button>
    Sign in
  </Button>
</Form>
</div>

<div className={styles.container}>
  <div className={styles.headers}>
    <div className={`${styles.rowHeader}, ${styles.header1}`}>
      <span>메뉴</span>
    </div>
    <div className={`${styles.rowHeader}, ${styles.header2}`}>
      <span>하위메뉴</span>
    </div>
    <div className={`${styles.rowHeader}, ${styles.header3}`}>
      <span>조회</span>
    </div>
    <div className={`${styles.rowHeader}, ${styles.header4}`}>
      <span>입력</span>
    </div>
  </div>
  <div className={styles.contentSection}>
    <div className={styles.content}>
      <div className={`${styles.dataSection}, ${styles.header1}`}>
        <span>사용자관리</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header2}`}>
        <span style={{display: 'block', borderBottom: '1px solid #000'}}>사용자 개인정보 관리</span>
        <span style={{display: 'block'}}>사용자 권한관리</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header3}`}>
        <span><Checkbox defaultChecked color="success"/></span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header4}`}>
        <span><Checkbox color="success"/></span>
      </div>
    </div> 
    <div className={styles.content}>
      <div className={`${styles.dataSection}, ${styles.header1}`}>
        <span>기준정보</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header2}`}>
        <span style={{display: 'block' , borderBottom: '1px solid #000'}}>거래처관리</span>
        <span style={{display: 'block' , borderBottom: '1px solid #000'}}>품목정보</span>
        <span style={{display: 'block'}}>창고정보</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header3}`}>
        <span><Checkbox defaultChecked  color="success"/></span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header4}`}>
        <span><Checkbox color="success"/></span>
      </div>
    </div> 

    <div className={styles.content}>
      <div className={`${styles.dataSection}, ${styles.header1}`}>
        <span >구매</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header2}`}>
        <span style={{display: 'block', borderBottom: '1px solid #000'}}>구매발주관리</span>
        <span style={{display: 'block'}}>구매입고관리</span>
      
      </div>
      <div className={`${styles.dataSection}, ${styles.header3}`}>
        <span><Checkbox defaultChecked  color="success"/></span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header4}`}>
        <span><Checkbox color="success"/></span>
      </div>
    </div> 

    <div className={styles.content}>
      <div className={`${styles.dataSection}, ${styles.header1}`}>
        <span>재고</span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header2}`}>
        <span style={{display: 'block', borderBottom: '1px solid #000'}}>재고입고관리</span>
        <span style={{display: 'block'}}>창고현황관리</span>
        
      </div>
      <div className={`${styles.dataSection}, ${styles.header3}`}>
        <span><Checkbox defaultChecked color="success"/></span>
      </div>
      <div className={`${styles.dataSection}, ${styles.header4}`}>
        <span><Checkbox color="success"/></span>
      </div>
    </div> 
  </div> 
</div>







</>    
  );
}

export default AdminUser