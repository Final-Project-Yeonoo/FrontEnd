import styles from "./css/Mypage.module.css";
import { useEffect, useState } from "react";
import React from "react";

function Mypage({ employeeId }) {
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeId: "12345",
    name: "John Doe",
    department: "HR",
    position: "Manager",
    extension: "123",
    password: "111",
    phoneNumber: "010-111-222",
    address: "서울시 강남구"
  });
  const [newPassword, setNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddr, setNewAddr] = useState("");

  useEffect(() => {
    // 백엔드에서 사원 정보를 FETCH하는 함수
    const fetchEmployeeInfo = async () => {
      try {
        const response = await fetch(`/api/employees/${employeeId}`);
        const data = await response.json();
        setEmployeeInfo(data);
      } catch (error) {
        console.error("사원 정보를 가져오는 중에 오류가 발생했습니다:", error);
      }
    };

    fetchEmployeeInfo();
  }, [employeeId]);

  const handleMyInfoChange = async () => {
    // console.log(newPassword, newAddr, newPhoneNumber);

    try {
      await fetch(`/api/employees/${employeeId}`, {
        method: "PUT",
        body: JSON.stringify({password: newPassword, phoneNumber: newPhoneNumber, address: newAddr}),
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
    <div className={styles.profilecontainer}>
      <h2 className={styles.profileheading}>사원 정보</h2>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>사원 ID:</p>
        <p>{employeeInfo.employeeId}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>이름:</p>
        <p>{employeeInfo.name}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>부서:</p>
        <p>{employeeInfo.department}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>직급:</p>
        <p>{employeeInfo.position}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>내선번호:</p>
        <p>{employeeInfo.extension}</p>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>비밀번호:</p>
        <input type='text'
        value={newPassword ||employeeInfo.password}
        onChange={(e) => setNewPassword(e.target.value)}
        className="profile-input"/>{}
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>휴대전화번호:</p>
        <input type='text'
         value={newPhoneNumber || employeeInfo.phoneNumber}
         onChange={(e) => setNewPhoneNumber(e.target.value)}
         className="profile-input"/>
      </div>
      <div className={styles.profilesection}>
        <p className={styles.profilelabel}>주소:</p>
        <input type='text'
        value={newAddr ||employeeInfo.address}
        onChange={(e) => setNewAddr(e.target.value)}
        className="profile-input"/>
      </div>

      <button onClick={handleMyInfoChange} className={styles.profilebutton}>
        변경
      </button>
    </div>
    </>
  );
}

export default Mypage;
