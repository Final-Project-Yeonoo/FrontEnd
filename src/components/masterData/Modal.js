import React, { useState } from "react";

function Modal({ onClose, onAddCompany }) {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    // 새로운 거래처 데이터 생성
    const newCompanyData = {
      trCompName: companyName,
      trCompPhone: phoneNumber,
      trAddr: address,
      trEtc: note
    };

    // 새로운 거래처 데이터를 추가
    onAddCompany(newCompanyData);

    // 입력값 초기화
    setCompanyName("");
    setPhoneNumber("");
    setAddress("");
    setNote("");

    // 모달 닫기
    onClose();
  };

  return (
    <div>
      <h2>거래처 등록</h2>
      <input
        type="text"
        placeholder="거래처명"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="비고"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleSave}>저장</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
}

export default Modal;