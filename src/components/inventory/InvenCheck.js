// import '../inventory/css/InvenCheck.module.css';
// import React, { useState, useEffect } from "react";
// import TableLayout from "../common/TableLayout";

// function InvenCheck() {
//   const [inventoryData, setInventoryData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

// //   useEffect(() => {
// //     fetchInventoryData(); // 컴포넌트가 마운트되었을 때 재고 데이터를 가져옵니다.
// //   }, []);

 
//   const handleSearchInputChange = (e) => {
//     setSearchTerm(e.target.value); // 검색어 입력값을 상태에 설정합니다.
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     // fetchInventoryData(); 
//   };

//   const columns = [
//     { Header: "품목구분", accessor: "품목구분" },
//     { Header: "품목코드", accessor: "품목코드" },
//     { Header: "품목명", accessor: "품목명" },
//     { Header: "규격", accessor: "규격" },
//     { Header: "양품수량", accessor: "양품수량" },
//     { Header: "불량수량", accessor: "불량수량" },
//     { Header: "재고수량", accessor: "재고수량" },
//     { Header: "창고코드", accessor: "storehouseCode" }
//   ];

//   const data = [
//     // 테이블에 표시할 데이터 배열
//     // 예시 데이터, 필요에 따라 수정해주세요
//     {
//       품목구분: "12345",
//       품목코드: "입고",
//       품목명: "품목 A",
//       규격: "츠",
//       품목코드: "A001",
//       양품수량: "10",
//       불량수량: "정상",
//       재고수량: "창고 A",
//       storehouseCode: "2023-06-18"  
//     }
//   ];

//   return (
//     <div>
//       <h2>재고현황</h2>
//       <form onSubmit={handleSearchSubmit}>
//         <input
//           type="text"
//           placeholder="품목명 검색"
//           value={searchTerm}
//           onChange={handleSearchInputChange}
//         />
//         <button type="submit">검색</button>
//       </form>

//       <TableLayout columns={columns} data={data} />
//     </div>
//   );
// }

// export default InvenCheck;



import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/InvenCheck.module.css';
import {API_BASE_URL, RAW, HALF, FINISHED} from '../../config/host-cofig';
import {Button} from 'reactstrap';


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
                          type: '원자재' })),
                      ...intermediates.map(item => ({ code: item.halfCode,
                        count: item.halfCount,
                        name: item.halfName,
                        price: item.halfPrice,
                        regDate: item.halfRegDate,
                        regUpdate: item.halfRegUpdate,
                        type: '반제품' })),
                      ...finishedProducts.map(item => ({  
                        code: item.finishedCode,
                        count: item.finishedCount,
                        name: item.finishedName,
                        price: item.finishedPrice,
                        regDate: item.finishedRegDate,
                        regUpdate: item.finishedRegUpdate,
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
    <div className={styles.contentHeadcontainer}>
      <div className={styles.contentHeadName}>
        <span> 재고현황 </span>
      </div>
    </div>


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
