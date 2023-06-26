
import { useState, useEffect } from 'react';
import styles from '../admin/css/AdminUser.module.css';
import * as React from 'react';
import BasicModal from '../common/Modal';
import { Form, Row,FormGroup,Label,Input,Col,Button  } from 'reactstrap';
import { Checkbox, Divider } from '@mui/material';
import Switch from '@mui/material/Switch';
import Layouts from '../common/TableLayout';
import {API_BASE_URL, DEPARTMENT, POSITION} from '../../config/host-cofig';

function AdminUser() {

  const API_DEPT_URL = API_BASE_URL + DEPARTMENT ; 
  const API_POS_URL = API_BASE_URL + POSITION ; 


  const label = { inputProps: { "aria-label": "Switch demo" } };
  //상태변수로 회원가입 입력값 관리 , 실시간으로 userValue에 저장하는 방법을 사용

  const adminMenu = "adminMenu";
  const masterDataMenu = "masterDataMenu";
  const purchaseMenu = "purchaseMenu";
  const inventoryMenu = "inventoryMenu";

  const [userValue, setUserValue] = useState({
    empName: "",
    empId: "",
    empPassword: "",
    deptCode: "",
    posCode: "",
    empPhone: "",
    empExtension: "",
    empHireDate: "",
    empValidate: false, // 권한 체크박스의 기본 값
    adminMenu: { checka: true, inputa: false },
    masterDataMenu: { checka: true, inputa: false },
    purchaseMenu: { checka: true, inputa: false },
    inventoryMenu: { checka: true, inputa: false }
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
    empHireDate: "", //사용자 입사일
    empValidate: "" //사용자 유효화
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

  const handleMenuPermissionChange2 = (category, permission, checked) => {
    setUserValue((prevPermissions) => ({
      ...prevPermissions,
      [category]: {
        ...prevPermissions[category],
        [permission]: checked
      }
    }));
  };
  const convertBooleanToEnum = (value) => {
    return value ? "Y" : "N";
    
  }; 

  const addUser = async (e) => {

    // try {
       
      
      //t/f enum으로 바꾸기
     const convertBooleanToEnum = (value) => {
        return value ? "Y" : "N";
      };
    
      setUserValue({...userValue, 
              empValidate: convertBooleanToEnum(userValue.empValidate),
              adminMenu : {checka: convertBooleanToEnum(userValue.adminMenu.checka),
                          inputa: convertBooleanToEnum(userValue.adminMenu.inputa)},
              masterDataMenu: {checka: convertBooleanToEnum(userValue.masterDataMenu.checka),
                              inputa: convertBooleanToEnum(userValue.masterDataMenu.inputa)},
              purchaseMenu: {checka: convertBooleanToEnum(userValue.purchaseMenu.checka),
                            inputa: convertBooleanToEnum(userValue.purchaseMenu.inputa)},
              inventoryMenu: {checka: convertBooleanToEnum(userValue.inventoryMenu.checka),
                              inputa: convertBooleanToEnum(userValue.inventoryMenu.inputa)}  })
          //enum으로 보내기 위해 t/f 바꿔서 담기
          
             
       

  };

  console.log('밖에서 하는 확인! ', posData);

  // 저장하기 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = async (e) => {
    e.preventDefault();

//     try{

//     }

//     addUser();
//  // 회원가입 서버 요청
// //  if(isValid()){
// //   alert('회원가입정보를 서버에 전송합니다');
// // }  else {
// //   alert ('입력란을 다시 확인해주세요');
// // }

       // 사용자 정보 서버 전달 요청
       const response = await fetch(API_DEPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userValue)
      });

      const data = await response.json();
      console.log(data); // 서버로부터 받은 응답 확인

      // 성공적으로 등록되었을 때 처리
      if (response.ok) {
        alert("사용자가 등록되었습니다");
      } else {
        alert("등록에 실패했습니다");
      }
  //   } catch (error) {
  //     alert("서버와의 통신이 원활하지 않습니다");
  //     console.error(error);
  //  }
   console.log('addUser 호출 전 로그 찍기',userValue);



   
  };




// 부서코드 가져오기(부서이름도 같이 가져올 수 있음)
  const handleDeptCellClick = (row) => {
    console.log('main에서 보는 선택된 행의 값 deptCode:', row.original.deptCode);
    setSelectedDeptName(row.original.deptName)
    setUserValue({...userValue, deptCode: row.original.deptCode})
   
    closeModal();
  };
// 값입력 확인 log 
 console.log(userValue);

 const handlePosCellClick = (row) => {
  console.log('main에서 보는 선택된 행의 값posCode:', row.original.posCode);
  setSelectedPosName(row.original.posName)
  setUserValue({...userValue, posCode: row.original.posCode})
 
  posModalClose();
};

console.log(userValue);







  return (
    <>
    <div className={styles.contentHeadcontainer}>
      <div className={styles.contentHeadName}>
        <span>사용자 등록</span>
      </div>
    </div>
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
                  onChange={(e) =>
                    setUserValue({ ...userValue, empName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserValue({ ...userValue, empId: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserValue({ ...userValue, empPassword: e.target.value })
                  }
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
    onChange={(e) => setUserValue({ ...userValue, deptCode: e.target.value })
  }
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
                  onChange={(e) => setUserValue({ ...userValue, posCode: e.target.value })}/>

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
                  onChange={(e) =>
                    setUserValue({ ...userValue, empPhone: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserValue({ ...userValue, empExtension: e.target.value })
                  }
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
                  id="empHireDate"
                  name="empHireDate"
                  type="date"
                  onChange={(e) =>
                    setUserValue({ ...userValue, empHireDate: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup className={styles.formGroup}>
                <div className={styles.tag}>
                  {" "}
                  <Label for="empValidate">활성화</Label>
                </div>
                <Switch
                  {...label}
                  defaultChecked={userValue.empValidate}
                  id="empValidate"
                  onChange={(checked) =>
                    handlePermissionChange("empValidate", checked)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>


        {/* 권한관리 메뉴  */}
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
              <span
                style={{ display: "block", borderBottom: "1px solid #000" }}
              >
                사용자 개인정보 관리
              </span>
              <span style={{ display: "block" }}>사용자 권한관리</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header3}`}>
              <span>
                <Checkbox
                  defaultChecked={userValue.adminMenu.checka}
                  color="success"
                  checked={userValue.adminMenu.checka}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "adminMenu",
                      "checka",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  checked={userValue.adminMenu.inputa}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "adminMenu",
                      "inputa",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}>
              <span>기준정보</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #000" }}
              >
                거래처관리
              </span>
              <span
                style={{ display: "block", borderBottom: "1px solid #000" }}
              >
                품목정보
              </span>
              <span style={{ display: "block" }}>창고정보</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header3}`}>
              <span>
                <Checkbox
                  defaultChecked={userValue.masterDataMenu.checka}
                  color="success"
                  checked={userValue.masterDataMenu.checka}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "masterDataMenu",
                      "checka",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  checked={userValue.masterDataMenu.inputa}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "masterDataMenu",
                      "inputa",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}>
              <span>구매</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #000" }}
              >
                구매발주관리
              </span>
              <span style={{ display: "block" }}>구매입고관리</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header3}`}>
              <span>
                <Checkbox
                  defaultChecked={userValue.purchaseMenu.checka}
                  color="success"
                  checked={userValue.purchaseMenu.checka}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "purchaseMenu",
                      "checka",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  checked={userValue.purchaseMenu.inputa}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "purchaseMenu",
                      "inputa",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={`${styles.dataSection}, ${styles.header1}`}>
              <span>재고</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header2}`}>
              <span
                style={{ display: "block", borderBottom: "1px solid #000" }}
              >
                재고입고관리
              </span>
              <span style={{ display: "block" }}>창고현황관리</span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header3}`}>
              <span>
                <Checkbox
                  defaultChecked={userValue.inventoryMenu.checka}
                  color="success"
                  checked={userValue.inventoryMenu.checka}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "inventoryMenu",
                      "checka",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
            <div className={`${styles.dataSection}, ${styles.header4}`}>
              <span>
                <Checkbox
                  color="success"
                  checked={userValue.inventoryMenu.inputa}
                  onChange={(e) =>
                    handleMenuPermissionChange2(
                      "inventoryMenu",
                      "inputa",
                      e.target.checked
                    )
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttoncontainer}>
        <Button color="primary"outline  className={styles.Button} onClick={joinButtonClickHandler}>저장</Button>
      </div>
    </>
  );
}

export default AdminUser;
