import styles from './css/TradingCompany.module.css'
import React, { useState, useEffect } from "react";
import TableLayout from "../common/TableLayout";
import Modal from "../common/Modal";
import { Form, Row,FormGroup,Label,Input,Col,Button  } from 'reactstrap';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {API_BASE_URL, TRADING} from "../../config/host-cofig";

function TradingCompany() {

  const API_TRC_URL = API_BASE_URL + TRADING;
    const [companyData, setCompanyData] = useState({ });
    
    // useEffect(() => {
    //   fetchCompanyData(); // 컴포넌트가 마운트되었을 때 거래처 데이터를 가져옵니다.
    // }, []);
  
    // const fetchCompanyData = async () => {
     
    //     const response = await fetch(API_TRC_URL); // 백엔드의 거래처 데이터를 가져오는 API 엔드포인트로 요청합니다.
    //     const companyData = await response.json(); // 응답 데이터를 JSON 형식으로 변환합니다.
    //     console.log(companyData);
    //     const newformData = Object.values(companyData);
    //     setCompanyData(newformData); // 거래처 데이터를 상태에 설정합니다.
     
    // };


    useEffect(() => {
      const fetchData = async () => {
        try {
          // Send a GET request to the API endpoint
          const response = await fetch(API_TRC_URL);
  
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
  
          // Parse the response data as JSON
          const jsonData = await response.json();
          console.log("데이터형식 : ", jsonData );
          // Update the component's state with the fetched data
          setCompanyData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function
      fetchData();
    }, []);
  
  
  
    const columns = [
      
      { Header: " 거래처코드", accessor: "trCompCode" },
      { Header: "거래처명", accessor: "trCompName" },
      { Header: "전화번호", accessor: "trCompPhone" },
      { Header: "주소", accessor: "trAddr" },
      { Header: "비고", accessor: "trEtc" }
     
    ];
    console.log(companyData);
    const data = [
      // 테이블에 표시할 데이터 배열, 
      {
          구분: "12345",
          trCompCode: "입고",
          trCompName: "품목 A",
          trCompPhone: "A001",
          trAddr: "10",
          trEtc: "정상"  
      },
      {
        구분: "12345",
        trCompCode: "입고",
        trCompName: "품목 A",
        trCompPhone: "A001",
        trAddr: "10",
        trEtc: "정상"  
    },
    {
      구분: "12345",
      trCompCode: "입고",
      trCompName: "품목 A",
      trCompPhone: "A001",
      trAddr: "10",
      trEtc: "정상"  
  }
    ];
    

    return (
      <>
      <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>거래처 관리</h2>
       
     </div>
     </div>
     <div className={styles.usercontainer}>
    <div className={styles.container}>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={companyData}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.trCompCode}
          hideFooter={true}
       
        />
      </Box>
    </div>  
    </div>
 
      </>
    );
  }
  
  export default TradingCompany;
