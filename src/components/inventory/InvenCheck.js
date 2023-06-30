
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/InvenCheck.module.css';
import {API_BASE_URL, RAW, HALF, FINISHED} from '../../config/host-cofig';
import {Button} from 'reactstrap';
import Nav from "react-bootstrap/Nav";


const InvenCheck = () => {
  const [inventoryData, setInventoryData] = useState([]);

  const API_RAW_URL = API_BASE_URL + RAW;
  const API_HALF_URL = API_BASE_URL + HALF;
  const API_FINISHED_URL = API_BASE_URL + FINISHED;


  useEffect(() => {
    // 각 테이블의 데이터를 서버로부터 가져온다
  const fetchRawMaterials = fetch(API_RAW_URL).then(response => response.json());
  const fetchIntermediates = fetch(API_HALF_URL).then(response => response.json());
  const fetchFinishedProducts = fetch(API_FINISHED_URL).then(response => response.json());

 // 모든 데이터를 통합한다
 Promise.all([fetchRawMaterials, fetchIntermediates, fetchFinishedProducts])
 .then(([rawMaterials, intermediates, finishedProducts]) => {
   const mergedData = [...rawMaterials.map(item => ({ 
                          code: item.rawCode,
                          count: item.rawCount,
                          name: item.rawName,
                          price: item.rawPrice,
                          regDate: item.rawRegDate,
                          regUpdate: item.rawRegUpdate,
                          empName : item.empName,
                          type: '원자재' })),
                      ...intermediates.map(item => ({ code: item.halfCode,
                        count: item.halfCount,
                        name: item.halfName,
                        price: item.halfPrice,
                        regDate: item.halfRegDate,
                        regUpdate: item.halfRegUpdate,
                        empName : item.empName,
                        type: '반제품' })),
                      ...finishedProducts.map(item => ({  
                        code: item.finishedCode,
                        count: item.finishedCount,
                        name: item.finishedName,
                        price: item.finishedPrice,
                        regDate: item.finishedRegDate,
                        regUpdate: item.finishedRegUpdate,
                        empName : item.empName,
                        type: '완제품' }))];
                      setInventoryData(mergedData);
                    }
                    );
}, []);
console.log(inventoryData);
  
  const columns = [
  
    {
      field: 'type',
      headerName: '구분',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: '품목명',
      width: 130,
      editable: true,
    },
    {
      field: 'code',
      headerName: '품목코드',
      width: 130,
      editable: true,
    },
    {
      field: 'count',
      headerName: '수량',
      width: 160,
      editable: true,
    },
    {
      field: 'price',
      headerName: '단가',
      width: 160,
      editable: true,
    },
    {
      field: 'regDate',
      headerName: '등록일',
      type: 'Date',
      width: 120,
      editable: true,
    },

    {
      field: 'regUpdate',
      headerName: '수정일',
      type: 'Date',
      width: 120,
      editable: true,
    }
  ];



    return (
    <>
    {/*<div className={styles.contentHeadcontainer}>*/}
    {/*  <div className={styles.contentHeadName}>*/}
    {/*    <span> 재고현황 </span>*/}
    {/*  </div>*/}
    {/*</div>*/}
      <Nav variant="tabs" defaultActiveKey="0">
        <Nav.Item>
          <Nav.Link eventKey="0">재고현황</Nav.Link>
        </Nav.Item>
      </Nav>



  <div className={styles.usercontainer}>
    <div className={styles.container}>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={inventoryData}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.code}
          hideFooter={true}
       
        />
      </Box>
    </div>  
    </div>
    </>
  );
}

export default InvenCheck
