import styles from "./css/Mypage.module.css";
import { useEffect, useState } from "react";
import React from "react";
import { Form, Row,FormGroup,Label,Input,Col,Button  } from 'reactstrap';
import { Checkbox, Divider } from '@mui/material';
import ImgUpload from "./ImgUpload";

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
        const response = await fetch(`http://localhost:8888/ynfinal/employee/mypage/5`);
       
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








  return (
    <>
    {/* <div className={styles.profilecontainer}>
      <h2 className={styles.profileheading}>사원 정보</h2>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>사원 ID:</p>
        <p>{employeeInfo.empId}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>이름:</p>
        <p>{employeeInfo.empName}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>부서:</p>
        <p>{employeeInfo.deptName}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>직급:</p>
        <p>{employeeInfo.posName}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>내선번호:</p>
        <p>{employeeInfo.empExtension}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>비밀번호:</p>
        <input type='text'
        value={newPassword ||employeeInfo.empPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="profile-input"/>{}
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>휴대전화번호:</p>
        <input type='text'
         value={newPhoneNumber || employeeInfo.empPhone}
         onChange={(e) => setNewPhoneNumber(e.target.value)}
         className="profile-input"/>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>주소:</p>
        <input type='text'
        value={newAddr ||employeeInfo.empAddress}
        onChange={(e) => setNewAddr(e.target.value)}
        className="profile-input"/>
      </div>

      <button onClick={handleMyInfoChange} className={styles.profilebutton}>
        변경
      </button>
    </div> */}

 
    <div className={styles.contentHeadcontainer}>
      <div className={styles.contentHeadName}>
        <span>My Page</span>
      </div>
    </div>


    
      <div className={styles.usercontainer}>
        <div className={styles.profileImgcontainer}>
          <div className={styles.profileImg}>
              <div>
                {/* <ImgUpload /> */}
              </div>
              <span>클릭해서 사진을 변경하세요</span>
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
          <Button color="primary"outline onClick={handleMyInfoChange}>
            변경
          </Button>
        </div>

        </Form>
      
      </div>
      </>
  );
}

export default Mypage;
