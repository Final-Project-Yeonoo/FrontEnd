import styles from './css/TradingCompany.module.css'
import React, { useState, useEffect } from "react";
import TableLayout from "../common/TableLayout";

import { Form, Row,FormGroup,Label,Input,Col,Button  } from 'reactstrap';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {API_BASE_URL, TRADING} from "../../config/host-cofig";
import Modal from "./Modal"; // 모달 컴포넌트를 import 합니다.

function TradingCompany() {

  const API_TRC_URL = API_BASE_URL + TRADING;
    const [companyData, setCompanyData] = useState({ });

    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태를 관리합니다.


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
    {
      field: 'trCompCode',
      headerName: '거래처코드',
      width: 150,
      editable: true,
    },
    {
      field: 'trCompName',
      headerName: '거래처명',
      width: 130,
      editable: true,
    },
    {
      field: 'trCompPhone',
      headerName: '전화번호',
      width: 180,
      editable: true,
    },
    {
      field: 'trAddr',
      headerName: '거래처주소',
      width: 160,
      editable: true,
    },
    {
      field: 'trEtc',
      headerName: '비고',
      width: 180,
      editable: true,
    },
    {
      field : 'trRegDate',
      headerName : '거래처 등록일',
      width : '150',
      editable: false

    },
    {
      field : 'trStartDate',
      headerName : '거래 시작일',
      width : '150',
      editable: true

    }
  ];



    console.log(companyData);
 
    const handleSearch = () => {
      const filteredCompanies = companyData.filter(company =>
        company.trCompName.includes(searchQuery) // 거래처명을 검색어로 포함하는 데이터를 필터링합니다.
      );
      setFilteredData(filteredCompanies);
    };
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const handleAddCompany = async (newCompanyData) => {
      console.log('이건 되나');
      setCompanyData(prevData => [...prevData,newCompanyData])
      // try {
      //   // Send a POST request to the backend API with the new company data
      //   const response = await fetch(API_TRC_URL, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(companyData),
      //   });
    
      //   if (!response.ok) {
      //     throw new Error("Failed to save company data");
      //   }
    
      //   // Retrieve the response data as JSON
      //   const responseData = await response.json();
    
      //   // Update the component's state with the newly added company data
      //   // setCompanyData(prevData => [...prevData, responseData]);
    
      //   // Close the modal
        toggleModal();
      // } catch (error) {
      //   console.error("Error saving company data:", error);
      // }
    };

    return (
      <>
      <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>거래처 관리</h2>
        <div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <button onClick={toggleModal}>거래처 입력</button>
          <button>삭제</button>
       
     </div>
     </div>
     <div className={styles.usercontainer}>
    <div className={styles.container}>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={companyData}
          columns={columns}
          // disableRowSelectionOnClick
          getRowId={(row) => row.trCompName}
          hideFooter={true}
       
        />
      </Box>
    </div>  
    </div>
    {isModalOpen && (
        <Modal onClose={toggleModal} onAddCompany={handleAddCompany} />
      )}
 
      </>
    );
  }
  
  export default TradingCompany;
