import "../common/css/MyPage.module.css";
import { useEffect, useState } from "react";
import React from "react";

function Mypage({ employeeId }) {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

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

  const handlePasswordChange = async () => {
    try {
      // 백엔드에 비밀번호 변경 요청 보내는 함수
      await fetch(`/api/employees/${employeeId}/password`, {
        method: "PUT",
        body: JSON.stringify({ newPassword }),
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

  const handlePhoneNumberChange = async () => {
    try {
      // 백엔드에 휴대전화번호 변경 요청 보내는 함수
      await fetch(`/api/employees/${employeeId}/phoneNumber`, {
        method: "PUT",
        body: JSON.stringify({ newPhoneNumber }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      // 휴대전화번호 변경 성공한 경우, 성공 처리를 진행하세요 (예: 알림 메시지, 리다이렉트 등)
    } catch (error) {
      console.error("휴대전화번호 변경 중에 오류가 발생했습니다:", error);
      // 오류 처리를 진행하세요 (예: 알림 메시지, 오류 상태 표시 등)
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">사원 정보</h2>
      <div className="profile-section">
        <p className="profile-label">사원 ID:</p>
        <p>{employeeInfo.employeeId}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">이름:</p>
        <p>{employeeInfo.name}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">부서:</p>
        <p>{employeeInfo.department}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">직급:</p>
        <p>{employeeInfo.position}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">내선번호:</p>
        <p>{employeeInfo.extension}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">비밀번호:</p>
        <p>{employeeInfo.password}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">휴대전화번호:</p>
        <p>{employeeInfo.phoneNumber}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">주소:</p>
        <p>{employeeInfo.address}</p>
      </div>

      <h3 className="profile-heading">비밀번호 변경</h3>
      <input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="profile-input"
      />
      <button onClick={handlePasswordChange} className="profile-button">
        변경
      </button>

      <h3 className="profile-heading">휴대전화번호 변경</h3>
      <input
        type="text"
        placeholder="새 휴대전화번호"
        value={newPhoneNumber}
        onChange={(e) => setNewPhoneNumber(e.target.value)}
        className="profile-input"
      />
      <button onClick={handlePhoneNumberChange} className="profile-button">
        변경
      </button>
    </div>
  );
}

export default Mypage;
