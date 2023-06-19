import './css/TradingCompany.module.css'
import React, { useState, useEffect } from "react";
import TableLayout from "../common/TableLayout";
import Modal from "../common/Modal";

function TradingCompany() {
    const [companyData, setCompanyData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      구분: "",
      거래처코드: "",
      거래처명: "",
      취급품목: "",
      전화번호: "",
      주소: "",
      비고: ""
    });
    useEffect(() => {
      fetchCompanyData(); // 컴포넌트가 마운트되었을 때 거래처 데이터를 가져옵니다.
    }, []);
  
    const fetchCompanyData = async () => {
     
        const response = await fetch("/api/ynfinal/trcomp"); // 백엔드의 거래처 데이터를 가져오는 API 엔드포인트로 요청합니다.
        const data = await response.json(); // 응답 데이터를 JSON 형식으로 변환합니다.
        setCompanyData(data); // 거래처 데이터를 상태에 설정합니다.
     
    };
  // 검색어 입력값 처리 로직 어떻게 짜죠??? 
    const handleSearchInputChange = (e) => {
      
    };
  // 검색 기능 처리 : 모두 불러와서 할지? 검색할때마다 새로 불러올지? 
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      
    };
  
    const handleNewRegistration = () => {
      setShowModal(true); // 모달창을 열도록 상태 변경
    };
  
    const handleModalClose = () => {
      setShowModal(false); // 모달창을 닫도록 상태 변경
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
    
        const response = await fetch("/api/companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData) // 폼 데이터를 JSON 형식으로 변환하여 전송합니다.
        });
        if (response.ok) {
          // 성공적으로 저장된 경우 어떻게 보여줄지? 
        } else {
          // 저장 실패 시 어떻게 처리 할지? 
        }  
    };
  // 구분 선택 옵션
  const 구분Options = ["옵션1", "옵션2", "옵션3"];
  
    const columns = [
      { Header: "구분", accessor: "구분" },
      { Header: " 거래처코드", accessor: " 거래처코드" },
      { Header: "거래처명", accessor: "거래처명" },
      { Header: "취급품목", accessor: "취급품목" },
      { Header: "전화번호", accessor: "전화번호" },
      { Header: "주소", accessor: "주소" },
      { Header: "비고", accessor: "비고" }
     
    ];
  
    const data = [
      // 테이블에 표시할 데이터 배열, 
      {
          구분: "12345",
          거래처코드: "입고",
          거래처명: "품목 A",
          취급품목: "츠",
          전화번호: "A001",
          주소: "10",
          비고: "정상"  
      }
    ];
  
    return (
      <div>
        <h2>거래처 관리</h2>
  
        
  
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="거래처명 검색"
            // value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button type="submit">검색</button>
        </form>
  
        <button onClick={handleNewRegistration}>신규등록</button>
  
        <TableLayout columns={columns} data={companyData} />
  
        {showModal && (
          <div>
            <Modal closeModal={handleModalClose}>
                  <h3>입고 정보 입력</h3>
            <form onSubmit={handleFormSubmit}>
             
              <label>
                구분:
                <select
                  name="구분"
                  value={formData.구분}
                  onChange={handleInputChange}
                >
                  <option value="">구분 선택</option>
                  {구분Options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                품목명:
                <input
                  type="text"
                  name="거래처코드"
                  value={formData.거래처코드}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                품목코드:
                <input
                  type="text"
                  name="거래처명"
                  value={formData.거래처명}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                수량:
                <input
                  type="text"
                  name="취급품목"
                  value={formData.취급품목}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                재고상태:
                <input
                  type="text"
                  name="전화번호"
                  value={formData.전화번호}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                창고명:
                <input
                  type="text"
                  name="주소"
                  value={formData.주소}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                입고일자:
                <input
                  type="date"
                  name="비고"
                  value={formData.비고}
                  onChange={handleInputChange}
                />
              </label>
             
  
              
              <button type="submit">저장</button>
              <button onClick={handleModalClose}>취소</button>
            </form>
            </Modal>
          </div>
          
        )}
      </div>
    );
  }
  
  export default TradingCompany;
