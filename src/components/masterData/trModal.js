import React, { useState, useEffect } from "react";
import "./css/Modal.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {API_BASE_URL, TRADING, STORE} from "../../config/host-cofig";

function Modal({ onClose, onAddCompany }) {
  const [newCompanyData, setNewCompanyData] = useState({
    trCompCode:'',
    trCompName: '',
    trCompPhone: '',
    trAddr: '',
    trEtc:'',
    trStartDate: '',
    storehouseName: ''
  });
  const [storeData, setStoreData ] = useState({});

    const API_TRC_URL = API_BASE_URL + TRADING;
    const API_STORE_URL = API_BASE_URL + STORE;
  // 새로운 거래처 데이터 생성
    
    // console.log('여긴뭐지',newCompanyData);
  
  const handleSave = async () => {
    
    const newCompanyArray = [newCompanyData];
    try {
      // Send a POST request to the backend API with the new company data
      const response = await fetch(API_TRC_URL, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newCompanyArray),
      });

        // console.log('객체 : ',JSON.stringify(newCompanyData));
        // console.log('배열? : ',Object.entries(JSON.stringify(newCompanyData)));
      if (!response.ok) {
        throw new Error("Failed to save company data");
      }

      // console.log('1111',newCompanyData);


      // 새로운 거래처 데이터를 추가
    onAddCompany(newCompanyData);

    // 입력값 초기화
   setNewCompanyData('');

    // 모달 닫기
    onClose();
  } catch (error) {
    console.error("Error saving company data:", error);
  }
  };
  // console.log('배열?',newCompanyData);


  //창고정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the API endpoint
        const response = await fetch(API_STORE_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response data as JSON
        const jsonData = await response.json();
        // console.log("데이터형식 : ", jsonData );
        // console.log("왜 안받아지지 : ", jsonData[0].storehouseName);
        // Update the component's state with the fetched data
        setStoreData(jsonData);
        // console.log("storeData",storeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);





// 창고선택 option

  const handleChange = (event) => {
    // setStoreData(event.target.value);
    setNewCompanyData({...newCompanyData, storehouseName : event.target.value})
    // console.log(storeData);
  };



  return (
    <div className="modal openModal">
      <section>
        <header>
          <h2>거래처 등록</h2>
          <button onClick={onClose}>X</button>
        </header>
        <main>
          <div className="inputTag">
          <span className="nameTag"> 거래처명 </span>
          <input
            type="text"
            placeholder="거래처명"
            // value={companyName}
            onChange={(e) => setNewCompanyData({...newCompanyData, trCompName : e.target.value})}
          />
          </div>

          <div  className="inputTag">
          <span  className="nameTag"> 전화번호 </span>
          <input
            type="text"
            placeholder="전화번호"
            // value={phoneNumber}
            onChange={(e) => setNewCompanyData({...newCompanyData, trCompPhone : e.target.value})}
          />

          </div>

          <div className="inputTag">
          <span  className="nameTag"> 주소 </span>
          <input
            type="text"
            placeholder="주소"
            // value={address}
            onChange={(e) => setNewCompanyData({...newCompanyData, trAddr : e.target.value})}
          />
          </div>
          <div className="inputTag">
          <span  className="nameTag" > 거래시작일 </span>
          <input
            type="date"
            placeholder="거래시작일"
            // value={trStartDate}
            onChange={(e) => setNewCompanyData({...newCompanyData, trStartDate : e.target.value})}
          />
          </div>
          <div className="inputTag">
        <span  className="nameTag"> 창고이름 </span>
        <FormControl sx={{ m: 1, minWidth: 150}}>
        <Select
          value={newCompanyData.storehouseName}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
    {storeData.length > 0 && storeData.map((item, i) => (
      <MenuItem key={i} value={item.storehouseName}>{item.storehouseName}</MenuItem>))}
        </Select>
      
      </FormControl>
      </div>
      <div className="inputTag">
      <span  className="nameTag"> 비고 </span>
          <input
            type="text"
            placeholder="비고"
            // value={note}
            onChange={(e) => setNewCompanyData({...newCompanyData, trEtc : e.target.value})}
          />
          </div>
        </main>
        <footer>
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>취소</button>
        </footer>
      </section>
    </div>
  );
}

export default Modal;
