import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/UserList.module.css';
import {API_BASE_URL, FINDALL, DEPARTMENT,POSITION } from '../../config/host-cofig';
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";


const UserList = () => {
  const [data, setData] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deptData, setDeptData] = useState([
    { deptCode: "", deptName: "" }]);
    const [posData, setPosData] = useState([
      { posCode: "", posName: "" },
      
    ]);

  const API_USERLIST_URL = API_BASE_URL + FINDALL;
  const API_DEPT_URL = API_BASE_URL + DEPARTMENT ; 
  const API_POS_URL = API_BASE_URL + POSITION ; 

 
 

  const columns = [
  
    {
      field: 'empName',
      headerName: '사원이름',
      width: 150,
      editable: true,
    },
    {
      field: 'empId',
      headerName: '사원ID',
      width: 130,
      editable: true,
    },
    {
      field: 'empExtension',
      headerName: '내선번호',
      width: 130,
      editable: true,
    },
    {
      field: 'deptName',
      headerName: '부서',
      width: 160,
      editable: true,
    },
    {
      field: 'posName',
      headerName: '직급',
      width: 160,
      editable: true,
    },

    {
      field: 'empHiredDate',
      headerName: '채용날짜',
      type: 'Date',
      width: 120,
      editable: true,
    },
    {
      field: 'empPhone',
      headerName: '휴대전화',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 170,
      editable: true,
  
    },
    {
      field: 'empAddress',
      headerName: '주소',
      width: 200,
      editable: true,
    },
    {
      field: 'empPassword',
      headerName: '비밀번호',
      type:'password',
      width: 150,
      editable: true,
    },
    
    {
      field: 'empValidate',
      headerName: '계정활성화',
      type: 'boolean',
      width: 100,
      editable: true,
    },
    {
      field: 'userAuth',
      headerName: '사용자관리입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
      // editable: (params) =>
      // `${params.row.empValidate.value || 'true'}`
    },
    {
      field: 'infoAuth',
      headerName: '기준정보입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
    },
    {
      field: 'salesAuth',
      headerName: '영업메뉴입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
    },
    {
      field: 'purchaseAuth',
      headerName: '구매메뉴입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
    },
    {
      field: 'inventoryAuth',
      headerName: '재고메뉴입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
    },
    {
      field: 'productAuth',
      headerName: '생산메뉴입력권한',
      type: 'boolean',
      width: 110,
      editable: true,
    }
    
  ];


 


  useEffect(() => {

    const fetchData = async () => {
      try {
        // Send a GET request to the API endpoint
        const response = await fetch(API_USERLIST_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response data as JSON
        const jsonData = await response.json();
        // console.log("데이터형식 : ", jsonData );
        const modifiedData = jsonData.map((item) => {
          const { deptName, posName, userAuth, infoAuth, purchaseAuth, inventoryAuth, salesAuth, productAuth, ...otherFields } = item;
        
   
        
          return {
            ...otherFields,
            deptName: deptName,
            posName: posName,
            userAuth: userAuth === "Y",
            infoAuth: infoAuth === "Y",
            purchaseAuth: purchaseAuth === "Y",
            inventoryAuth: inventoryAuth === "Y",
            salesAuth: salesAuth === "Y",
            productAuth: productAuth === "Y",
            
          };
        });
        
     
        // Update the component's state with the fetched data
        setData(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDeptData = async () => {
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
  
    fetchDeptData();

    // Call the fetchData function
    fetchData();
  }, []);

  const [selectedRow, setSelectedRow] = useState(null); // 선택된 row의 정보를 관리합니다.
  const handleRowClick = (params) => {
    
    // 클릭한 row의 정보를 가져옵니다.
    const selectedRowData = params.row;
    // 필요한 처리를 수행합니다.
    // console.log("선택된 row의 정보:", selectedRowData);
    setSelectedRow(selectedRowData);
  };


 //백으로 정보를 전달
 const handleSaveClick = async () => {
  if(localStorage.getItem('USER_AUTH') === 'N') {
    alert("권한이 없습니다.");
    return;
  }


  try {
    // 1. deptName과 posName 값을 가져옵니다.
    const { deptName, posName, userAuth, infoAuth, purchaseAuth, inventoryAuth, salesAuth,productAuth , ...otherFields } = selectedRow;

    // 2. 전체 부서 목록과 직급 목록을 비교하여 코드를 찾습니다.
    const selectedDept = deptData.find((dept) => dept.deptName === deptName);
    const selectedPos = posData.find((pos) => pos.posName === posName);

    // 3. 선택된 부서와 직급의 코드 값을 수정합니다.
    const modifiedRow = {
      ...otherFields,
      deptCode: selectedDept.deptCode,
      posCode: selectedPos.posCode,
      userAuth: userAuth === true ? "Y" : "N",
      infoAuth: infoAuth === true ? "Y" : "N",
      purchaseAuth: purchaseAuth === true ? "Y" : "N",
      inventoryAuth: inventoryAuth === true ? "Y" : "N",
      salesAuth: salesAuth === true ? "Y" : "N",
      productAuth : productAuth === true ? "Y" : "N",   
    };

    
    

    // console.log('ㅋㅋㅋ');
    const response = await fetch(API_USERLIST_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedRow),
    });

  //  console.log('선택정보 수정확인',modifiedRow);
   alert('수정'); 
   if (!response.ok) {
      throw new Error('Failed to save data');
    }

    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};


    return (
    <>
      <Nav variant="tabs" defaultActiveKey="0">
        <Nav.Item>
          <Nav.Link eventKey="0">사용자 정보수정</Nav.Link>
        </Nav.Item>
      </Nav>

    <div className={styles.container}>
      <div className={styles.buttonContainer}> 
      <Button variant="primary" onClick={handleSaveClick}>
            수정
      </Button>
      </div>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          onRowClick={handleRowClick}
          getRowId={(row) => row.empId}
          hideFooter={true}
        />
      </Box>
    </div>  
    </>
  );
}

export default UserList