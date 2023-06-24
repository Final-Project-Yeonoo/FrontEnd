import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "reactstrap";
import { Button, TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModelChangeParams,
} from "@mui/x-data-grid";



// 납품등록
function RegisterDelivery() {


  const [selectionModel, setSelectionModel] = useState([])
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  


  const handleFilter = () => {
    const { storehouseType, storehouseAddr, storehouseName, storehouseEtc } = formData;
  
    const filteredData = originalRows.filter((row) => {
      if (storehouseType && row.storehouseType !== storehouseType) {
        return false;
      }
      if (storehouseAddr && row.storehouseAddr && !row.storehouseAddr.toLowerCase().includes(storehouseAddr.toLowerCase())) {
        return false;
      }
      if (storehouseName && !row.storehouseName.toLowerCase().includes(storehouseName.toLowerCase())) {
        return false;
      }
      if (storehouseEtc && row.storehouseEtc && !row.storehouseEtc.includes(storehouseEtc)) {
        return false;
      }
      return true;
    });
  
    // 필터링된 결과를 상태 변수에 저장합니다.
    setResponseData(filteredData);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => responseData.find((row) => row.id === id));
  
  
    console.log(selectedRowsData);
     setSelectionModel(selectedRowsData);
    
  };


  const handleCellChange = (params) => {
    const { id, field, value } = params;
    
    // 변경된 셀의 데이터를 업데이트
    setResponseData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[id][field] = value;
      return updatedData;
    });
  };

    const handleAdd = (event) => {
        event.preventDefault();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        // Create a new row object with the form values
        const newRow = {
          id: responseData.length + 1, // Generate a unique ID for the new row
          storehouseType: formData.storehouseType,
          storehouseAddr: formData.storehouseAddr,
          storehouseName: formData.storehouseName,
          storehouseEtc: formData.storehouseEtc,
          storehouseStartDate : formattedDate,  
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          storehouseType: "",
          storehouseAddr: "",
          storehouseName: "",
          storehouseEtc: "",
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
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            storehouseType: storehouseTypeTranslations[item.storehouseType] || item.storehouseType,
          }));
          console.log(processedData);
          setResponseData(processedData);
          setOriginalRows(processedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };


  const [formData, setFormData] = useState({
    storehouseType: "",
    storehouseAddr: "",
    storehouseName: "",
    storehouseEtc: "",
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
  

  const handleSave = () => {

    const storehouseTypeMapping = {
      '반제품': 'HALF',
      '원자재': 'RAW',
      '불량': 'ERROR',
      '제품': 'FINISHED',
    };
  

    const data = apiRef.current?.getRowModels(); // 데이터 가져오기
    const dataArray = Array.from(data.values()); // Map 객체를 배열로 변환
    dataArray.forEach((row) => {
      row.storehouseType = storehouseTypeMapping[row.storehouseType] || 'FINISHED';
    });


    console.log(dataArray); 
    const jsonData = JSON.stringify(dataArray);
    console.log(jsonData);

    // if(true) return;
  
    // storehouseType 값을 역매핑하여 변경
    

    console.log(JSON.stringify(responseData));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch('http://localhost:8888/ynfinal/store', requestOptions)
      .then((response) => {
        // 응답 처리
        if (response.ok) {
          alert('저장이 완료되었습니다.');
          console.log('POST 요청이 성공했습니다.');
          sendGetRequest();

        } else {
          console.log('POST 요청이 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('POST 요청 중 오류가 발생했습니다.', error);
      });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 저장 버튼 클릭 시 처리할 로직 작성
   
    console.log("저장 버튼이 클릭되었습니다.");
    console.log(formData);
    // axios 또는 다른 HTTP 클라이언트를 사용하여 서버로 데이터 전송 등의 로직 추가
  };

  const handleDelete = () => {
    if(selectionModel.length<1) {
      alert("삭제할 행이 없습니다.");
      return;
    }

    console.log(selectionModel);
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    

    if (shouldDelete) {

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectionModel),
      };
    
      fetch('http://localhost:8888/ynfinal/store', requestOptions)
        .then((response) => {
          // 응답 처리
          if (response.ok) {
            alert(selectionModel.length + '행이 삭제되었습니다.');
            console.log('DELETE 요청이 성공했습니다.');
            
            sendGetRequest();
            window.location.reload();

          } else {
            console.log('DELETE 요청이 실패했습니다.');
            window.location.reload();

          }
        })
        .catch((error) => {
          console.error('DELETE 요청 중 오류가 발생했습니다.', error);
          window.location.reload();

        });
    } else {
      console.log('삭제를 취소했습니다.');
    }
    
    
  };

  const handleReset = () => {
    // 초기화 버튼 클릭 시 처리할 로직 작성
    console.log("초기화 버튼이 클릭되었습니다.");
    setFormData({
      storehouseType: "",
      storehouseAddr: "",
      storehouseName: "",
      storehouseEtc: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
    });
    // 기타 초기화 작업 추가
    sendGetRequest();
    
  };

  const handleOptionClick = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      storehouseType: selectedOption.label,
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
   { field: 'id', headerName: 'ID', width: 90,
  },
    {
      field: 'storehouseCode',
      headerName: '창고코드',
      width: 150,
      cellClassName: 'grayCell',
      editable: false
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
        type: 'singleSelect',
        valueOptions: ['제품', '반제품', '원자재', '불량'],
      },
    {
      field: 'storehouseStartDate',
      headerName: '등록일시',
      sortable: false,
      cellClassName: 'grayCell',
      width: 160,
    },
    {
        field: 'storehouseAddr',
        headerName: '창고 주소',
        editable: true,
        sortable: false,
        width: 160,
      },
      {
        field: 'storehouseEtc',
        headerName: '비고',
        editable: true,
        sortable: false,
        width: 160,
      },
  ];
  
  const styles = {
    grayCell: {
      backgroundColor: 'gray',
      color: 'white',
    },
  };
  
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setResponseData(responseData.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };



  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>

       

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <TextField
                required
                id="standard-required"
                label="창고구분"
                value={formData.storehouseType}
                variant="standard"
                name="storehouseType"
                onChange={handleChange}
                style={{ width: '43%' }}
                onClick={handleOpenModal} 
            />
            <TextField
                id="standard-search"
                label="창고주소"
                type="search"
                value={formData.storehouseAddr}
                variant="standard"
                name="storehouseAddr"
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
                value={formData.storehouseName}
                name="storehouseName"
                onChange={handleChange}
                style={{ width: '43%' }}
            />
            <TextField
                id="standard-search"
                label="비고"
                type="search"
                variant="standard"
                value={formData.storehouseEtc}
                name="storehouseEtc"
                onChange={handleChange}
                style={{ width: '43%' }}
            />
            </div>
            <div style={{marginBottom:'20px',  display: 'flex', padding:'10px',  justifyContent: 'flex-end'}}>
            <Button color="primary" onClick={handleAdd} variant="contained" type="submit" style={{ marginLeft: '10px', backgroundColor: 'green'  }}>
              행 추가
            </Button>{" "}
            <Button color="primary" variant="contained" onClick={handleFilter} style={{ marginLeft: '10px', backgroundColor: 'green'  }}>
              조회
            </Button>{" "}
            <Button color="primary" variant="contained" onClick={handleSave} style={{ marginLeft: '10px' }}>
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
            apiRef={apiRef}
            rows={responseData}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            disableRowSelectionOnClick 
            onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            processRowUpdate={processRowUpdate}
          />
</Box>
)}
    <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectionModel, null, 4)}
      </pre>
      {/* 스타일을 적용할 CSS 스타일시트 */}
      <style>{`
        .grayCell {
          background-color: gray;
          color: white;
        }
      `}</style>
    </>
  );
}

export default RegisterDelivery;
