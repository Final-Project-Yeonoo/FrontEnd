// import './css/SearchUser.module.css';
// import {BasicTextFields,BasicSelect, MultipleSelectCheckmarks} from '../common/UsefulComponents'; 
// import { useState } from 'react';

// function SearchUser() {
   
//  //부서정보를 받아와서 부서이름을 보여주고 부서 코드를 보내주는 역할
//  const [dept, setDept] = useState([]);
//  fetch('api/', {
//     method: 'POST',
//     headers: requestHeader,
//     body: JSON.stringify()
//  })
 
//     const deptName = [
       
//       ];
    
// return (    
// <>
// <div className='container'>
//     <div className='contentTitleBox'>
//         <div className='contentTitle'> 
//             {/* //사용자 조회 제목 */}
//             <span>사용자 조회</span>
//         </div>
//     </div>

//     <div className='searchBox'>
//          <div className='searchContentsButton'>
//             <BasicTextFields className='searchName' placeholder='사원이름' />
//             <MultipleSelectCheckmarks names={deptName} tag='부서명' />
//              <button className='searchBtn'>조회</button>
//          </div>       
//      </div>
//     </div>
// </>
//         );
// }

// export default SearchUser
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/SearchUser.module.css';
import {API_BASE_URL, FINDALL} from '../../config/host-cofig';
import { display, margin } from '@mui/system';

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
    <div className={styles.contentHeadcontainer}>
      <div className={styles.contentHeadName}>
        <span>사원조회 </span>
      </div>
    </div>


  
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
