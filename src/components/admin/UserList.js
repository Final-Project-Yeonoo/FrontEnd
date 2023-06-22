// import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";
// // import "./css/yougeun.css";
// import { DateTime } from 'luxon'
// import { useEffect } from "react";

// import { Navigate, useNavigate } from 'react-router-dom'
// import DateEditor from "react-tabulator/lib/editors/DateEditor";
// import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// // import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

// import "react-tabulator/lib/styles.css"; // default theme
// import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// import { ReactTabulator, reactFormatter } from "react-tabulator";



// const editableColumns = [
//   {
//     title: "이름",
//     field: "empName",
//     width: 150,
//     editor: "input",
//   //   headerFilter: "input"
//   },
//   {
//       title: "사원ID",
//       field: "empId",
//       width: 150,
//       editor: "input",
//     //   headerFilter: "input"
//     },
//   {
//     title: "부서코드",
//     field: "deptCode",
//     hozAlign: "left",
//     editor: "input"
//   },
//   {
//     title: "직급코드",
//     field: "posCode",
//     editor: "input"
//   },
//   {
//     title: "내선번호",
//     field: "empExtension",
//     editor: "input"
//   },
//   {
//     title: "휴대전화",
//     field: "empPhone",
//     editor: "input"
//   },
//   {
//     title: "주소",
//     field: "addr",
//     editor: "input"
//   }
// ];
// const options = {
//   // height: 150,
//   layout:"fitData",
//   movableRows: true,
//   movableColumns: true,
//   autoResize: false // 자동 리사이징 비활성화
// };






// const UserList = forwardRef((props, ref) => {
//   const navigate = useNavigate();
//   const tabulatorRef = useRef(ref);
//   const [data, setData] = useState([]);


// useEffect(() => {
    
//   const fetchData = async () => {
//     try {
      
//       const response = await fetch('http://localhost:8888/ynfinal/employee');
//       const data1 = await response.json();
//       console.log('받은 데이터:', data1);
//       const newData = Object.values(data1); // 받은 데이터를 배열 형태로 변환합니다.
//       setData(newData); // 데이터 상태를 업데이트합니다.

//       // 데이터에 대한 추가 처리를 수행할 수 있습니다.
//     } catch (error) {
//       console.error('요청 중 에러 발생:', error);
//       // 요청 중에 발생한 에러를 처리할 수 있습니다.
//     }
//   };
//   fetchData();
// }, []); 




// useImperativeHandle(ref, () => ({
//   table: tabulatorRef.current.table,
// }));

// const rowFormatter = (row) => {
//   const rowEl = row.getElement();
//   rowEl.style.height = "50px";
//   rowEl.style.overflow = "hidden";
//   return rowEl;
// };



// return(
// <>

// <div className="parent-container">
// <ReactTabulator
//         ref={(el) => {
//           tabulatorRef.current = el;
//           if (ref) {
//             ref.current = el;
//           }
//         }}
//         columns={editableColumns}
//         data={data}
//         options={options}
//         rowFormatter={rowFormatter}
//       />

// </div>


// </>


// );


// });

// export default UserList;




import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/UserList.module.css';
import {API_BASE_URL, FINDALL} from '../../config/host-cofig';

const UserList = () => {
  const [data, setData] = useState([]);

  const API_USERLIST_URL = API_BASE_URL + FINDALL;

   const CustomPagination = () => null;
  
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
      width: 150,
      editable: true,
    },
  
    {
      field: 'empPassword',
      headerName: '비밀번호',
      type:'Password',
      width: 150,
      editable: true,
    },
    {
      field: 'empExtension',
      headerName: '내선번호',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'deptName',
      headerName: '부서',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'posName',
      headerName: '직급',
      type: 'number',
      width: 110,
      editable: true,
    },

    {
      field: 'empHiredDate',
      headerName: '채용날짜',
      type: 'Date',
      width: 110,
      editable: true,
    },
    {
      field: 'empPhone',
      headerName: '휴대전화',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'empAddress',
      headerName: '주소',
      
      width: 110,
      editable: true,
    },
    
    {
      field: 'empValidate',
      headerName: '계정활성화',
      type: 'boolean',
      width: 110,
      editable: false,
    },
    {
      field: 'userAuth',
      headerName: '사용자관리입력권한',
      type: 'boolean',
      width: 110,
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



    return (
    <>
    <div className={styles.container}>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.empId}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </Box>
    </div>  
    </>
  );
}

export default UserList
