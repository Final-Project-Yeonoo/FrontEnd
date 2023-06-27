import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "reactstrap";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem  } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModelChangeParams,
} from "@mui/x-data-grid";



// 자재 소요 분석
function AnalyzeMaterialRequirement() {

  
  const [selectionModel, setSelectionModel] = useState([])
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  const [empList, setEmpList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [trCompList, setTrCompList] = useState([]);

  const handleCellClick = (params) => {
    // 셀 클릭 이벤트 처리 로직 작성
    console.log('셀 클릭:', params);
  };
  

  const handleFilter = () => {
    const { estimateDate, estimateOrderType, estimatePayment, estimateEtc } = formData;
  
    
    const filteredData = originalRows.filter((row) => {
      if(estimateDate){
      const nextDay = new Date(estimateDate);
      nextDay.setDate(nextDay.getDate() - 1);
      const formattedRowEstimateDate = new Date(row.estimateDate).toISOString().split('T')[0];
      const formattedEstimateDate = nextDay.toISOString().split('T')[0];
      if (formattedEstimateDate && formattedRowEstimateDate !== formattedEstimateDate) {
        return false;
      }
      }
      if (estimateOrderType && row.estimateOrderType && !row.estimateOrderType.toLowerCase().includes(estimateOrderType.toLowerCase())) {
        return false;
      }
      if (estimatePayment && !row.estimatePayment.toLowerCase().includes(estimatePayment.toLowerCase())) {
        return false;
      }
      if (estimateEtc && row.estimateEtc && !row.estimateEtc.includes(estimateEtc)) {
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
          estimateDate: new Date(formData.estimateDate),
          estimateOrderType: formData.estimateOrderType,
          estimatePayment: formData.estimatePayment,
          estimateEtc: formData.estimateEtc,
          // storehouseStartDate : formattedDate,  
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          estimateDate: "",
          estimateOrderType: "",
          estimatePayment: "",
          estimateEtc: "",
        });
      };

    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
      sendGetRequest();
      fetchEmployeeList();
      fetchTrCompanyList();
      fetchProjectList();
    }, []);
  
    const fetchTrCompanyList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch('http://localhost:8888/ynfinal/trcomp')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setTrCompList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
    const fetchProjectList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch('http://localhost:8888/ynfinal/project')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setProjectList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };

    const fetchEmployeeList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch('http://localhost:8888/ynfinal/employee')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setEmpList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
   
      
    const sendGetRequest = async () => {
        try {
          const response = await fetch("http://localhost:8888/ynfinal/estimate");
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            estimateDate: new Date(item.estimateDate),
            projectRegDate: new Date(item.projectRegDate),
            projectUpdateDate: new Date(item.projectUpdateDate),
          }));
          console.log(processedData);
          setResponseData(processedData);
          setOriginalRows(processedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };


  const [formData, setFormData] = useState({
    estimateDate: "",
    estimateOrderType: "",
    estimatePayment: "",
    estimateEtc: "",
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

    

    const data = apiRef.current?.getRowModels(); // 데이터 가져오기
    const dataArray = Array.from(data.values()); // Map 객체를 배열로 변환
    
    const jsonData = JSON.stringify(dataArray);



    console.log(JSON.stringify(responseData));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch('http://localhost:8888/ynfinal/estimate', requestOptions)
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
    
      fetch('http://localhost:8888/ynfinal/estimate', requestOptions)
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
      estimateDate: "",
      estimateOrderType: "",
      estimatePayment: "",
      estimateEtc: "",
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
      estimateOrderType: selectedOption.label,
    }));
    setIsModalOpen(false);
  };
  

  const modalOptions = [
    { id: 1, label: "OEM" },
    { id: 2, label: "자체생산" },
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
      field: 'estimateCode',
      headerName: '견적서코드',
      width: 150,
      cellClassName: 'grayCell',
      editable: false
    },
    {
      field: 'estimateDate',
      headerName: '견적날짜',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
        field: "estimateOrderType",
        headerName: "수주유형",
        width: 110,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['OEM', '자체생산'],
      },
    {
      field: 'estimatePayment',
      headerName: '결재조건',
      sortable: false,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['카드', '현금'],
      width: 110,
    },
    {
        field: 'estimateEtc',
        headerName: '비고',
        editable: true,
        sortable: false,
        width: 160,
      },
      {
        field: 'projectRegDate',
        headerName: '등록날짜',
        editable: false,
        sortable: false,
        cellClassName: 'grayCell',
        width: 160,
        type: 'date',
      },
      {
        field: 'projectUpdateDate',
        headerName: '수정날짜',
        editable: false,
        sortable: false,
        width: 160,
        cellClassName: 'grayCell',
        type: 'date',
      },
      {
        field: 'empId',
        headerName: '견적담당자',
        // editable: true,
        sortable: false,
        cellClassName: 'blueCell',
        width: 160,
        editable: true,
        type: 'singleSelect',
        valueOptions: empList.map((emp) => ({
          value: emp.empId,
          label: emp.empId,
        })), 
      },
      {
        field: 'empName',
        headerName: '견적담당자명',
        cellClassName: 'grayCell',
        editable: false,
        sortable: false,
        width: 160,
      
      },
      {
        field: 'projectCode',
        headerName: '프로젝트코드',
        editable: true,
        sortable: false,
        cellClassName: 'blueCell',
        type: 'singleSelect',
        valueOptions: projectList.map((project) => ({
          value: project.projectCode,
          label: project.projectCode,
        })), 
        width: 160,
      },
      {
        field: 'projectName',
        headerName: '프로젝트명',
        cellClassName: 'grayCell',
        editable: false,
        sortable: false,
        width: 160,
      },
      {
        field: 'trCompCode',
        headerName: '거래처코드',
        editable: true,
        sortable: false,
        width: 160,
        cellClassName: 'blueCell',
        type: 'singleSelect',
        valueOptions: trCompList.map((tr) => ({
          value: tr.trCompCode,
          label: tr.trCompCode,
        })), 
      },
      {
        field: 'trCompName',
        headerName: '거래처명',
        editable: false,
        cellClassName: 'grayCell',
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
    const updatedData = responseData.map((row) => {
      if (row.id === newRow.id) {
        const selectedEmp = empList.find((emp) => emp.empId === newRow.empId);
        const selectedProject = projectList.find((project) => project.projectCode === newRow.projectCode);
        const selectedTrComp = trCompList.find((trComp) => trComp.trCompCode === newRow.trCompCode);
    
        return {
          ...updatedRow,
          empName: selectedEmp ? selectedEmp.empName : '',
          projectName: selectedProject ? selectedProject.projectName : '',
          trCompName: selectedTrComp ? selectedTrComp.trCompName : '',
        };
      }
      return row;
    });
  
    setResponseData(updatedData);
    return updatedRow;
  };



  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>

       
        
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
              <div>수주유형</div>
            <TextField
                required
                id="standard-required"
                // label="수주유형"
                value={formData.estimateOrderType}
                variant="standard"
                name="estimateOrderType"
                onChange={handleChange}
                style={{ width: '30%' }}
                onClick={handleOpenModal} 
            />
            <div>견적날짜</div>
            <TextField
                id="standard-search"
                type="date"
                
                value={formData.estimateDate}
                variant="standard"
                
                name="estimateDate"
                onChange={handleChange}
                style={{ width: '30%' }}
            />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <div>결재조건</div>
            <Select
              labelId="estimatePayment-label"
              id="estimatePayment"
              value={formData.estimatePayment}
              name="estimatePayment"
              onChange={handleChange}
              style={{ width: '30%' }}
            >
              <MenuItem value="카드">카드</MenuItem>
              <MenuItem value="현금">현금</MenuItem>
              
            </Select>
            <div>비고사항</div>
            <TextField
                id="standard-search"
                // label="비고"
                type="search"
                variant="standard"
                value={formData.estimateEtc}
                name="estimateEtc"
                onChange={handleChange}
                style={{ width: '30%' }}
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
      <h3>수주 유형:</h3>
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
  <Box sx={{ height: '80vh', width: '100%' }}>
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
          background-color: #676767;
          color: white;
        }

        .blueCell{
          background-color: #0072e8;
          color: white;
        }
      `}</style>
    </>
  );
}

export default AnalyzeMaterialRequirement;
