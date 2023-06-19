import '../inventory/css/InvenCheck.module.css';
import React, { useState, useEffect } from "react";
import TableLayout from "../common/TableLayout";

function InvenCheck() {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchInventoryData(); // 컴포넌트가 마운트되었을 때 재고 데이터를 가져옵니다.
//   }, []);

 
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 입력값을 상태에 설정합니다.
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // fetchInventoryData(); 
  };

  const columns = [
    { Header: "품목구분", accessor: "품목구분" },
    { Header: "품목코드", accessor: "품목코드" },
    { Header: "품목명", accessor: "품목명" },
    { Header: "규격", accessor: "규격" },
    { Header: "양품수량", accessor: "양품수량" },
    { Header: "불량수량", accessor: "불량수량" },
    { Header: "재고수량", accessor: "재고수량" },
    { Header: "창고코드", accessor: "storehouseCode" }
  ];

  const data = [
    // 테이블에 표시할 데이터 배열
    // 예시 데이터, 필요에 따라 수정해주세요
    {
      품목구분: "12345",
      품목코드: "입고",
      품목명: "품목 A",
      규격: "츠",
      품목코드: "A001",
      양품수량: "10",
      불량수량: "정상",
      재고수량: "창고 A",
      storehouseCode: "2023-06-18"  
    }
  ];

  return (
    <div>
      <h2>재고현황</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="품목명 검색"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button type="submit">검색</button>
      </form>

      <TableLayout columns={columns} data={data} />
    </div>
  );
}

export default InvenCheck;
