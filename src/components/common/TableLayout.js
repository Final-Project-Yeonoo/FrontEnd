import React from 'react';
import { useTable } from "react-table";
import '../common/css/TableLayout.module.css'

const Layouts = ({columns, data, onClick}) => { //(받아올 정보를 하나로 묶어서 넣어주세요 {}: 객체로! )
    
  // console.log(data[0].deptCode);
  const {getTableProps,  getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({columns, data});

  const handleCellClick = (cellValue, row) => {
          console.log(cellValue);
          onClick(row);
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
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}
            key={rowIndex} >
              {row.cells.map((cell,cellIndex) => (
                <td {...cell.getCellProps()} 
                key={cellIndex}
                  onClick={() => handleCellClick(cell.value, row)} 
                 >{cell.render("Cell")}</td>
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