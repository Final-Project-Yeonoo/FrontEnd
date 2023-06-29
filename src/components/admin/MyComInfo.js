import React, { useState, useEffect } from "react";
import styles from "./css/MyComInfo.module.css";
import { Divider } from "@mui/material";
import { Button } from "reactstrap";
import {API_BASE_URL, COMPANY} from '../../config/host-cofig';
import adminUser from './AdminUser';

const MyComInfo = () => {

    const API_COM_URL = API_BASE_URL + COMPANY;
  const [comValue, setComValue] = useState([
    { compCode: "", compName: "", compRegNo: " ", compCeo: "", compPhone: "" }
  ]);

  const headers = [
    "회사번호",
    "회사이름",
    "사업자등록번호",
    "대표자 이름",
    "전화번호"
  ];
  const classNames = [
    "compCode",
    "compName",
    "compRegNo",
    "compCeo",
    "compPhone"
  ];

  console.log(comValue);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch(API_COM_URL);
      if (response.ok) {
        const data = await response.json();
        setComValue(data); // 서버에서 받아온 회사 정보를 상태에 업데이트
      } else {
        console.log("회사 정보 가져오기 실패");
      }
    } catch (error) {
      console.error("회사 정보 가져오기 중 오류 발생:", error);
    }
  };

useEffect(() => {
    fetchCompanyInfo(); 
  }, []);

  const handlerSaveInfo = async () => {

    
    try {
      // 회사 정보를 서버에 전송하여 저장하는 API 호출
      const response = await fetch(API_COM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comValue)
      });
      if (response.ok) {
        // 저장이 성공
        console.log("회사 정보 저장 완료");
      } else {
        // 저장이 실패
        console.log("회사 정보 저장 실패");
      }
    } catch (error) {
      // 예외 발생
      console.error("회사 정보 저장 중 오류 발생:", error);
    }
  };

  const cName = (value, index) => {
    const updatedValue = [...comValue];
    updatedValue[0][classNames[index]] = value;
    setComValue(updatedValue);
  };

  console.log(comValue);

  const headersName = headers.map(function (header, index) {
    const value = comValue[0][classNames[index]] || ""; // 정보가 없는 경우 빈칸
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.empListHead}>{header}</div>
          <input
            value={value}
            onChange={(e) => {
              cName(e.target.value, index);
            }}
          />
        </div>
        <Divider />
      </>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.contentTitleBox}>
        <div className={styles.contentTitle}>
          {/* 회사정보 입력 */}
          <span>회사정보 입력</span>
        </div>
      </div>

      <div className={styles.empListBox}>
        <div className={styles.empListHeaders}>{headersName}</div>
        <div className={styles.buttonContainer}>
          <Button color="primary" outline onClick={handlerSaveInfo}>
            저장
          </Button>
        </div>
      </div>
    </div>


  );
};

export default MyComInfo;
