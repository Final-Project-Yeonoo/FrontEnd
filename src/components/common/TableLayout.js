import React from 'react';
import { useTable } from "react-table";
import '../common/css/TableLayout.module.css'

const Layouts = ({columns, data, onDeptSelect, onClick}) => { //(받아올 정보를 하나로 묶어서 넣어주세요 {}: 객체로! )
    const {getTableProps,  getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({columns, data});
    const handleDeptSelection = (deptName) => {
          onDeptSelect(deptName); // 선택된 부서명을 MainPage 컴포넌트로 전달
        };
  

  return (
    <>
         <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default Layouts