import React from 'react'
import './css/UserList.css';
import { useMemo } from "react";

import Layouts from "../common/TableLayout";



const SearchUser = () => {
  

//     //검색된 사원 List column명
//     const headers = ['이름', '사원ID', '부서', '직급', '내선번호', '휴대전화', '주소']; 
//     const headersName = headers.map(function(header){
//         return (
//         <div className='empListHead'>{header}</div>);
//     });
  
//  return (
//    <>
//    <div className='container'>
//     <div className='contentTitleBox'>
//         <div className='contentTitle'> 
//             {/* //사용자 조회 제목 */}
//             <span>사용자 조회</span>
//         </div>
//     </div>
//     <div className='searchBox'>
//         <div className='searchContentsButton'>
//             <input className='searchName'/>
//             <input className='searEmpId'/>
//             <input className='searchDept'/>
//             <button className='searchBtn'>조회</button>
//         </div>       
//     </div>
//     <div className='empListBox'>
//         <div className='empListHeaders'>
//             {headersName}
//         </div>
//     </div>
//    </div>
//    </>
//   )


const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "이름"
      },
      {
        accessor: "id",
        Header: "사원ID"
      },
      {
        accessor: "dept",
        Header: "부서"
      },
      {
        accessor: "pos",
        Header: "직급"
      },
      {
        accessor: "num",
        Header: "내선번호"
      },
      {
        accessor: "phone",
        Header: "휴대전화"
      },
      {
        accessor: "addr",
        Header: "주소"
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      Array(10)
        .fill()
        .map(() => ({
          name: '안녕',
          id: 'aaa@email.com',
          dept : '디디야',
          num : '버노',
          phone: '0101111111',
          addr: '우리집'
        })),
    []
  );

  return <Layouts columns={columns} data={data} />;









}

export default SearchUser
