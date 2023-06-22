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




import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const UserList = () => {


   const customPagination = () => null;
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'empName',
      headerName: '사원이름',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

    return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          component {{

          }}
        />
      </Box>
    </>
  );
}

export default UserList
