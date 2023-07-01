import React, { useState } from "react";
import Modal from "../common/Modal";
import TableLayout from "../common/TableLayout";

const Import = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    입고번호: "",
    구분: "",
    품목명: "",
    품목코드: "",
    수량: "",
    재고상태: "",
    창고명: "",
    입고일자: "",
    등록일자: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 모달에서 폼 데이터를 전송해야함
    // console.log(formData);
    // 백엔드로 데이터 전송! 
    fetch("/api/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        // 처리 완료 되는지 확인하기
      });
   
    // 모달
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const columns = [
    { Header: "입고번호", accessor: "입고번호" },
    { Header: "구분", accessor: "구분" },
    { Header: "품목명", accessor: "품목명" },
    { Header: "품목코드", accessor: "품목코드" },
    { Header: "수량", accessor: "수량" },
    { Header: "재고상태", accessor: "재고상태" },
    { Header: "창고명", accessor: "창고명" },
    { Header: "입고일자", accessor: "입고일자" },
    { Header: "등록일자", accessor: "등록일자" },
    { Header: "발주서번호", accessor: "발주서번호" },
    { Header: "사원번호", accessor: "사원번호" }

  ];

  const data = [
    // 테이블에 표시할 데이터 배열
    // 예시 데이터, 필요에 따라 수정해주세요
    {
      입고번호: "12345",
      구분: "입고",
      품목명: "품목 A",
      품목코드: "A001",
      수량: "10",
      재고상태: "정상",
      창고명: "창고 A",
      입고일자: "2023-06-18",
      등록일자: "2023-06-18"
    }
    // 추가 데이터...
  ];
  // 구분 선택 옵션
  const 구분Options = ["옵션1", "옵션2", "옵션3"];

  return (
    <div>
      <h2>입고 정보 조회</h2>
      <button onClick={handleOpenModal}>입고등록</button>
      <TableLayout columns={columns} data={data} />

      {showModal && (
        <Modal closeModal={handleCloseModal}>
          <h3>입고 정보 입력</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              입고번호:
              <input
                type="text"
                name="입고번호"
                value={formData.입고번호}
                onChange={handleInputChange}
              />
            </label>
            {/* 나머지 입력 필드들도 위와 같이 추가하고 수정해주세요 */}

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
                name="품목명"
                value={formData.품목명}
                onChange={handleInputChange}
              />
            </label>
            <label>
              품목코드:
              <input
                type="text"
                name="품목코드"
                value={formData.품목코드}
                onChange={handleInputChange}
              />
            </label>
            <label>
              수량:
              <input
                type="text"
                name="수량"
                value={formData.수량}
                onChange={handleInputChange}
              />
            </label>
            <label>
              재고상태:
              <input
                type="text"
                name="재고상태"
                value={formData.재고상태}
                onChange={handleInputChange}
              />
            </label>
            <label>
              창고명:
              <input
                type="text"
                name="창고명"
                value={formData.창고명}
                onChange={handleInputChange}
              />
            </label>
            <label>
              입고일자:
              <input
                type="date"
                name="입고번호"
                value={formData.입고일자}
                onChange={handleInputChange}
              />
            </label>
            <label>
              등록일자:
              <input
                type="date"
                name="입고번호"
                value={formData.등록일자}
                onChange={handleInputChange}
              />
            </label>

            <button type="submit">등록</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Import;
