
import { useState, useEffect } from 'react';
import styles from '../admin/css/AdminUser.module.css';
import * as React from 'react';
import BasicModal from '../common/Modal';
import { Form, Row,FormGroup,Label,Input,Col, Alert } from 'reactstrap';
import { Checkbox, Divider } from '@mui/material';
import Switch from '@mui/material/Switch';
import Layouts from '../common/TableLayout';
import {API_BASE_URL, DEPARTMENT, POSITION, FINDALL} from '../../config/host-cofig';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";


function AdminUser() {

  const API_DEPT_URL = API_BASE_URL + DEPARTMENT ; 
  const API_POS_URL = API_BASE_URL + POSITION ; 
  const API_ADD_URL = API_BASE_URL + FINDALL;


  const label = { inputProps: { "aria-label": "Switch demo" } };
  //상태변수로 회원가입 입력값 관리 , 실시간으로 userValue에 저장하는 방법을 사용

  const userAuth = "userAuth";
  const infoAuth = "infoAuth";
  const purchaseAuth = "purchaseAuth";
  const inventoryAuth = "inventoryAuth";
  const salesAuth = "salesAuth";
  const productAuth = "productAuth";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  const [userValue, setUserValue] = useState({
    empName: "",
    empId: "",
    empPassword: "",
    deptCode: "",
    posCode: "",
    empPhone: "",
    empExtension: "",
    empHiredDate: "",
    empValidate: false, // 권한 체크박스의 기본 값
    userAuth: "N", 
    infoAuth: "N",
    purchaseAuth: "N",
    inventoryAuth: "N",
    salesAuth : "N",
    productAuth : "N"
  });


 
  const [modalVisible, setModalVisible] = useState(false);
 const [deptData, setDeptData] = useState([
    { deptCode: "", deptName: "" },
    
  ]);
 

   const [modalPosVisible, setModalPosVisible] = useState(false);
  const [posData, setPosData] = useState([
    { posCode: "", posName: "" },
    
  ]);
 
  const [selectedDeptName, setSelectedDeptName] = useState('');
  const [selectedPosName, setSelectedPosName] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const posModalOpen = () => {
    setModalPosVisible(true);
  }
  const posModalClose =() => {
    setModalPosVisible(false);
  }
 
  const columns = [
    // 테이블의 열 정의
    {
      Header: "부서 코드",
      accessor: "deptCode"
    },
    {
      Header: "부서명",
      accessor: "deptName"
    }
  ];
  const columnsPos = [
    // 테이블의 열 정의
    {
      Header: "직급 코드",
      accessor: "posCode"
    },
    {
      Header: "직급명",
      accessor: "posName"
    }
  ];

  
// 부서 데이터를 백엔드 API로부터 가져오는 로직
useEffect(() => {
  const fetchData = async () => {
    try {
      // Send a GET request to the backend API to fetch department data
      const response = await fetch(API_DEPT_URL);
      const jsonData = await response.json();

      // Update the data state with the fetched department data
      setDeptData(jsonData);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

   const fetchPOSData = async () => {
    try {
      // Send a GET request to the backend API to fetch department data
      const response = await fetch(API_POS_URL);
      const jsonData = await response.json();

      // Update the data state with the fetched department data
      setPosData(jsonData);
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  fetchPOSData();

  fetchData();

}, []);



  // 검증완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    empName: "", //사용자이름
    empId: "", //사용자ID
    empPassword: "", //사용자비밀번호
    deptCode: "", //사용자 소속 부서코드
    posCode: "", //사용자 직급 코드
    empPhone: "", //사용자 휴대전화
    empExtension: "", //사용자 내선 번호
    empHiredDate: "", //사용자 입사일
  });

  // 입력칸과 권한설정이 모두 검증에 통과했는지 여부 검사
  const isValid = () => {
    for (const key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };


  // 권한 체크박스 상태 변경 시 호출되는 함수
  const handlePermissionChange = (name, checked) => {
    setUserValue((prevUserValue) => ({
      ...prevUserValue,
      [name]: checked
    }));
  };

  
  const convertBooleanToEnum = (name, value) => {

    return setUserValue({...userValue, [name]:value ? "Y" : "N" } );
    
  }; 


  // 저장하기 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = async (e) => {

    if(localStorage.getItem('USER_AUTH') === 'N') {
      alert("권한이 없습니다.");
      return;
    }

    e.preventDefault();
  

    try{
       // 사용자 정보 서버 전달 요청
       const response = await fetch(API_ADD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userValue)
      });

      const data = await response.json();
      // console.log(data); // 서버로부터 받은 응답 확인

      // 성공적으로 등록되었을 때 처리
      if (response.ok) {
        // alert("사용자가 등록되었습니다");
        <Alert color="primary">
          사용자가 등록되었습니다
        </Alert>
      } else {
        // alert("등록에 실패했습니다");
        <Alert color="primary">
        등록에 실패했습니다
      </Alert>
      }
    } catch (error) {
      // alert("서버와의 통신이 원활하지 않습니다");
      <Alert color="primary">
      서버와의 통신이 원활하지 않습니다
    </Alert>
      console.error(error);
      // console.log('alert가 왜 안뜨지');
   }
  //  console.log('addUser 호출 전 로그 찍기', JSON.stringify(userValue));

  };
 


// 부서코드 가져오기(부서이름도 같이 가져올 수 있음)
  const handleDeptCellClick = (row) => {
    console.log('main에서 보는 선택된 행의 값 deptCode:', row.original.deptCode);
    setSelectedDeptName(row.original.deptName)
    setUserValue({...userValue, deptCode: row.original.deptCode})
   
    closeModal();
  };
// // 값입력 확인 log 
//  console.log(userValue);

 const handlePosCellClick = (row) => {
  // console.log('main에서 보는 선택된 행의 값posCode:', row.original.posCode);
  setSelectedPosName(row.original.posName)
  setUserValue({...userValue, posCode: row.original.posCode})
 
  posModalClose();
};

// console.log(userValue);



const handleChange = (e) => {
  const { name, value } = e.target;
  setUserValue((prevUserValue) => ({
    ...prevUserValue,
    [name]: value
  }));
};


const tfhandle = (name, value) => {
  // console.log(name ,':',value);
  setUserValue({...userValue, [name] : value}); 
  // console.log(userValue);
}


  return (
    <>
       <Nav variant="tabs" defaultActiveKey="0">
                <Nav.Item>
                    <Nav.Link eventKey="0">사용자 등록</Nav.Link>
                </Nav.Item>
            </Nav>


    {/* 유저정보 등록 */}
      <div className={styles.usercontainer}>
        <Form className={styles.form}>
          <Row className={styles.row}>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empName">이름</Label>
                </div>
                <Input
                
                  id="empName"
                  name="empName"
                  placeholder="사용자명"
                  type="text"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
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
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="password">비밀번호</Label>
                </div>
                <Input
                  id="empPassword"
                  name="empPassword"
                  type='password'
                  placeholder="비밀번호"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Divider variant="middle" />
          <Row className={styles.row}>
            <Col md={4}>
            <FormGroup className={styles.formGroup}>
              <div className={styles.tag}>
              <Label for="deptCode">부서명</Label>
              </div>
              <Input
              id="deptCode"
              name="deptCode"
              placeholder="클릭해서 부서명을 설정하세요"
              value={selectedDeptName}
              onClick={openModal}
              onChange={handleChange}
              />
              <BasicModal open={modalVisible} onClose={closeModal}>
              <div>
                <h2>부서 선택</h2>
                <main>
                  <Layouts columns={columns} data={deptData} onClick={handleDeptCellClick} 
                    />
                </main>
              </div>
            </BasicModal>
          </FormGroup>


            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
              <div className={styles.tag}>
                  {" "}
                  <Label for="posCode">직급명</Label>
              </div>
                <Input
                  id="posCode"
                  name="posCode"
                  placeholder="클릭해서 직급명을 설정하세요"
                  value={selectedPosName}
                  onClick={posModalOpen}
                  onChange={handleChange}/>

                <BasicModal open={modalPosVisible} onClose={posModalClose}>
              <div>
                <h2>직급 선택</h2>
            <main>
              <Layouts columns={columnsPos} data={posData} onClick={handlePosCellClick} />
            </main>
            </div>
               </BasicModal>

              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empPhone">휴대전화</Label>
                </div>
                <Input
                  id="empPhone"
                  name="empPhone"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Divider variant="middle" />
          <Row className={styles.row}>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empExtension">내선번호</Label>
                </div>
                <Input
                  id="empExtension"
                  name="empExtension"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empHireDate">입사일</Label>
                </div>
                <Input
                  id="empHiredDate"
                  name="empHiredDate"
                  type="date"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empValidate">입력권한 활성</Label>
                </div>
                <Switch
                  {...label}    
                              
                  id="empValidate"
                  onChange={(e) => tfhandle(e.target.id, e.target.checked)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>

      
      
      {/* 권한관리 메뉴  */}

      
      <div className={styles.container}>


        {/* 테이블 헤더 */}
        <div className={styles.headers}>
          <div className={`${styles.rowHeader}, ${styles.header1}`}>
            <span>메뉴</span>
          </div>
          <div className={`${styles.rowHeader}, ${styles.header2}`}>
            <span>하위메뉴</span>
          </div>
        
          <div className={`${styles.rowHeader}, ${styles.header4}`}>
            <span>입력권한</span>
          </div>
        </div>


        {/* 테이블내용  */}
        <div className={styles.contentSection}>


          {/* 사용자 관리 메뉴 체크 */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                  style={{ paddingTop : "10px" }}>
              <span>사용자관리</span>
            </div>


            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                사용자 개인정보 관리
              </span>
              <span style={{ display: "block" }}>사용자 권한관리</span>
            </div>
         
           
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(userAuth,e.target.checked)}/>
              </span>
            </div>
          </div>



          {/* 기준정보 메뉴 체크 */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                  style={{ paddingTop : "25px" }}>
              <span>기준정보</span>
            </div>


            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                거래처관리
              </span>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                품목정보
              </span>
              <span style={{ display: "block" }}>창고정보</span>
            </div>

            {/* 체크박스 */}
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(infoAuth, e.target.checked)}/>
              </span>
            </div>
          </div>

          {/* 구매 관리 메뉴 */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                  style={{ paddingTop : "10px" }}>
              <span>구매</span>
            </div>


            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                구매발주관리
              </span>
              <span style={{ display: "block" }}>구매입고관리</span>
            </div>
          
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(purchaseAuth, e.target.checked)}/>
              </span>
            </div>
          </div>

          {/* 영업관리 메뉴 */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                  style={{ paddingTop : "35px" }}>
              <span>영업관리</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                견적서등록
              </span>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                수주서관리
              </span>
              <span
                style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                납품 등록
              </span>
              <span style={{ display: "block" }}>구매입고관리</span>
            </div>
          
            <div className={`${styles.dataSection}, ${styles.header4}`}
                  style={{ paddingTop : "35px" }}>
              <span>
                <Checkbox
                  color="success"
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(salesAuth, e.target.checked)}/>
              </span>
            </div>
          </div>



          {/* 재고 관리 메뉴  */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                style={{ paddingTop : "5px" }}>
              <span>재고</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span style={{ display: "block" ,paddingTop: "7px"}}>재고현황</span>
            </div>

            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  name='inventoryAuth'
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(inventoryAuth, e.target.checked)}/>
              </span>
            </div>
          </div>

          {/* 생산관리 메뉴  */}
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}
                  style={{ paddingTop : "10px" }}>
              <span>생산관리</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span style={{ display: "block", borderBottom: "1px solid #92B4EC" }}>
                작업지시
              </span>
              <span style={{ display: "block" }}>
                실적등록
              </span>
            </div>

            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  disabled={!userValue.empValidate}
                  onChange={(e) => convertBooleanToEnum(productAuth, e.target.checked)}/>
              </span>
            </div>
          </div>
        </div> 

      </div>
      {/* 저장버튼 */}
      <div className={styles.buttoncontainer}>
        <Button variant="primary" className={styles.Button} onClick={joinButtonClickHandler}>저장</Button>
      </div>

  </>



  );
}

export default AdminUser;