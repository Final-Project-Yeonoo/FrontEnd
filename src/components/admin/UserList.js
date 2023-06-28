import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/UserList.module.css';
import {API_BASE_URL, FINDALL} from '../../config/host-cofig';
import {Button} from 'reactstrap';

const UserList = () => {
  const [data, setData] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const API_USERLIST_URL = API_BASE_URL + FINDALL;
 
 

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
        console.log("데이터형식 : ", jsonData );
        // Update the component's state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const [selectedRow, setSelectedRow] = useState(null); // 선택된 row의 정보를 관리합니다.
  const handleRowClick = (params) => {
    // 클릭한 row의 정보를 가져옵니다.
    const selectedRowData = params.row;
    // 필요한 처리를 수행합니다.
    console.log("선택된 row의 정보:", selectedRowData);
    setSelectedRow(selectedRowData);
  };

 //백으로 정보를 전달
 const handleSaveClick = async () => {
  const arrayData = [selectedRow]
  // try {
  //   const response = await fetch(API_USERLIST_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(selectedRow),
  //   });
  try {
    // 선택된 row의 값을 수정합니다.



    const response = await fetch(API_USERLIST_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arrayData),
    });
    console.log('선택정보 수정확인',arrayData);

    if (!response.ok) {
      throw new Error('Failed to save data');
    }

    // Optional: Display a success message or perform any other actions
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};


 







    return (
    <>
    <div className={styles.contentHeadcontainer}>
      <div className={styles.contentHeadName}>
        <span>사용자 정보 수정 </span>
      </div>
    </div>



    <div className={styles.container}>
      <div className={styles.buttonContainer}> 
      <Button color="success" outline onClick={handleSaveClick}>
            수정
      </Button>
      </div>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          // checkboxSelection
          // disableRowSelectionOnClick
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
