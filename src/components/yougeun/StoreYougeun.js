import React, { useState, useEffect } from "react";
import {  Container, Row, Col, Form } from "reactstrap";
import { Button, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal"; // @material-ui/core 패키지에서 Modal 컴포넌트를 가져옵니다.

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function StoreYougeun() {

    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectedRowIds(newSelectionModel);
        console.log('선택된 모델 변경:', newSelectionModel);
        // 추가로 수행해야 할 작업들을 여기에 추가합니다.
      };


    const handleAdd = (event) => {
        event.preventDefault();
        
        // Create a new row object with the form values
        const newRow = {
          id: responseData.length + 1, // Generate a unique ID for the new row
          storehouseType: formData.input1,
          storehouseCode: formData.input2,
          storehouseName: formData.input3,
          
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
        });
      };

    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
      sendGetRequest();
    }, []);
  

    const storehouseTypeTranslations = {
        HALF: '반제품',
        RAW: '원자재',
        ERROR: '불량',
        FINISHED: '제품',
        // 더 많은 영어-한글 변환 매핑을 추가할 수 있습니다.
      };

      
    const sendGetRequest = async () => {
        try {
          const response = await fetch("http://localhost:8888/ynfinal/store");
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: item.storehouseCode, // storehouseCode 값을 id로 사용
            ...item,
            storehouseType: storehouseTypeTranslations[item.storehouseType] || item.storehouseType,
          }));
          console.log(processedData);
          setResponseData(processedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };


  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // 저장 버튼 클릭 시 처리할 로직 작성
    console.log("저장 버튼이 클릭되었습니다.");
    console.log(formData);
    // axios 또는 다른 HTTP 클라이언트를 사용하여 서버로 데이터 전송 등의 로직 추가
  };

  const handleDelete = () => {
    console.log(selectedRowIds + '-----------');
    // Filter out the selected rows from the responseData array
    const updatedData = responseData.filter((row) => {
        if (selectedRowIds.includes(row.id)) {
            console.log(row.id);
            return true;
        }
        return false;
    });
  
    // Perform any additional delete logic here (e.g., sending a request to a server)
  
    // Update the state with the updated data and reset the selectedRowIds
    setResponseData(updatedData);
    console.log(updatedData);
    setSelectedRowIds([]);
    
  };

  const handleReset = () => {
    // 초기화 버튼 클릭 시 처리할 로직 작성
    console.log("초기화 버튼이 클릭되었습니다.");
    setFormData({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
    });
    // 기타 초기화 작업 추가
  };

  const handleOptionClick = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      input1: selectedOption.label,
    }));
    setIsModalOpen(false);
  };
  

  const modalOptions = [
    { id: 1, label: "제품" },
    { id: 2, label: "반제품" },
    { id: 3, label: "원자재" },
    { id: 4, label: "불량" },
  ];


  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  
  const modalContentStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "4px",
    width: "500px",
    height: "500px",
    overflowY: "auto",  
  };


  const columns = [
   { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'storehouseCode',
      headerName: '창고코드',
      width: 150,
      editable: true,
    },
    {
      field: 'storehouseName',
      headerName: '창고명',
      width: 150,
      editable: true,
    },
    {
        field: "storehouseType",
        headerName: "창고구분",
        width: 110,
        editable: true,
        renderCell: (params) => {
          const handleStorehouseTypeChange = (event) => {
            const updatedData = responseData.map((item) => {
              if (item.id === params.id) {
                return {
                  ...item,
                  storehouseType: event.target.value,
                };
              }
              return item;
            });
            setResponseData(updatedData);
          };
  
          return (
            <select
              value={params.value}
              onChange={handleStorehouseTypeChange}
              style={{ width: "100%" }}
            >
              <option value="제품">제품</option>
              <option value="반제품">반제품</option>
              <option value="원자재">원자재</option>
              <option value="불량">불량</option>
            </select>
          );
        },
      },
    {
      field: 'storehouseStartDate',
      headerName: '등록일시',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
        field: 'storehouseAddr',
        headerName: '창고 주소',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
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
      <div>
        <Form onSubmit={handleSubmit}>

       

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <TextField
                required
                id="standard-required"
                label="창고구분"
                value={formData.input1}
                variant="standard"
                name="input1"
                onChange={handleChange}
                style={{ width: '43%' }}
                onClick={handleOpenModal} 
            />
            <TextField
                id="standard-search"
                label="창고코드"
                type="search"
                value={formData.input2}
                variant="standard"
                name="input2"
                onChange={handleChange}
                style={{ width: '43%' }}
            />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <TextField
                id="standard-search"
                label="창고명"
                type="search"
                variant="standard"
                value={formData.input3}
                name="input3"
                onChange={handleChange}
                style={{ width: '43%' }}
            />
            <TextField
                id="standard-search"
                label="비고"
                type="search"
                variant="standard"
                value={formData.input4}
                name="input4"
                onChange={handleChange}
                style={{ width: '43%' }}
            />
            </div>
            <div style={{marginBottom:'20px',  display: 'flex', padding:'10px',  justifyContent: 'flex-end'}}>
            <Button color="primary" onClick={handleAdd} variant="contained" type="submit" style={{ marginLeft: '10px', backgroundColor: 'green'  }}>
              행 추가
            </Button>{" "}
            <Button color="primary" variant="contained" type="submit" style={{ marginLeft: '10px', backgroundColor: 'green'  }}>
              조회
            </Button>{" "}
            <Button color="primary" variant="contained" type="submit" style={{ marginLeft: '10px' }}>
              저장
            </Button>{" "}
            <Button color="secondary" variant="contained" onClick={handleDelete} style={{ marginLeft: '10px' }}>
              삭제
            </Button>{" "}
            <Button color="default" variant="contained" onClick={handleReset} style={{ marginLeft: '10px' }}>
              초기화
            </Button>{" "}
            
          </div>
          
        </Form>
      </div>
     {/* Modal */}
     <Modal open={isModalOpen} onClose={handleCloseModal}>
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <h3>창고 구분:</h3>
      {modalOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => handleOptionClick(option)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "10px 0",
          }}
        >
          {option.label}
        </div>
      ))}
      <Button variant="contained" onClick={handleCloseModal} style={{ marginTop: "10px" }}>
        돌아가기
      </Button>
    </div>
  </div>
</Modal>
        {responseData !== null && (
  <Box sx={{ height: 600, width: '100%' }}>
    <DataGrid
      rows={responseData}
      columns={columns}
      getRowId={(row) => row.id}
      pagination={false}
      checkboxSelection
      disableRowSelectionOnClick
      
      selectionModel={selectedRowIds}
        onSelectionModelChange={handleSelectionModelChange}
    />
  </Box>
)}

    </>
  );
}

export default StoreYougeun;
