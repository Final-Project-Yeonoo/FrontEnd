import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/SearchUser.module.css';
import {API_BASE_URL, FINDALL} from '../../config/host-cofig';
import { display, margin } from '@mui/system';
import Nav from "react-bootstrap/Nav";

const SearchUser = () => {
  const [data, setData] = useState([]);

  const API_USERLIST_URL = API_BASE_URL + FINDALL;

   const CustomPagination = () => null;
  
  const columns = [
  
    {
      field: 'empName',
      headerName: '사원이름',
      width: 170,
   
      editable: false,
    },
    {
      field: 'empId',
      headerName: '사원ID',
      width: 130,
      editable: false,
      align: 'center'

    },
    
    {
      field: 'deptName',
      headerName: '부서',
      width: 170,
      editable: false
    },
    {
      field: 'posName',
      headerName: '직급',
      width: 170,
      editable: false
    },
    {
      field: 'empExtension',
      headerName: '내선번호',
      width: 130,
      editable: false,
      align: 'center'
    },
   
    {
      field: 'empPhone',
      headerName: '휴대전화',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      align: 'center'

    },
  
   
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



    return (
    <>
      <Nav variant="tabs" defaultActiveKey="0">
        <Nav.Item>
          <Nav.Link eventKey="0">사원조회</Nav.Link>
        </Nav.Item>
      </Nav>
    {/*<div className={styles.contentHeadcontainer}>*/}
    {/*  <div className={styles.contentHeadName}>*/}
    {/*    <span>사원조회 </span>*/}
    {/*  </div>*/}
    {/*</div>*/}


  
    <div className={styles.container}>
      <Box sx={{ height: 600, width: '100%'}}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooter={true}
          getRowId={(row) => row.empId}
          style={{align:"center"}}
          
        />
      </Box>
    </div>  
    </>
  );
}

export default SearchUser;
