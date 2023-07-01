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

import { API_YGBASE_URL as BASE, PROJECT, DELIVERY, DELIVERY_DETAIL, RETURNED,
  RETURN_DETAIL, PERFORMANCE, JOBORDER, ORDERS_DETAIL, ESTIMATE,
  ORDERS, STORE, ORDER, DEPARTMENT, FINISHED_ITEM, HALF_ITEM,
  RAW_ITEM, TR_COMP, EMPLOYEE, COMPANY
} from './YougeunConfig';


// 작업 지시
function CreateWorkOrder(){


  
  const [selectionModel, setSelectionModel] = useState([])
  const [selectionModel2, setSelectionModel2] = useState([])
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  const apiRef2 = React.useRef(null);
  const [empList, setEmpList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [trCompList, setTrCompList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [code, setCode] = useState([]);
  const [finishedList, setFinishedList] = useState([]);

  const handleRowClick = (ids) => {
    // console.log(ids.row.orderCode);
    setCode(ids.row.orderCode);
  
    fetch(BASE + JOBORDER)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.values(data).filter((item) => ids.row.orderCode === item.orderCode);
  
        const processedData = filteredData.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
  
        setResponseData2(processedData);
        // console.log(processedData);
      })
      .catch((error) => {
        console.error('Failed to fetch employee list:', error);
      });
  };

 

  const handleFilter = () => {
    const { jobOrderStatus, jobOrderType, jobOrderInstructDate, jobOrderFinishedDate } = formData;
  
    
    const filteredData = originalRows.filter((row) => {
      if(jobOrderStatus){
      const nextDay = new Date(jobOrderStatus);
      nextDay.setDate(nextDay.getDate() - 1);
      const formattedRowjobOrderStatus = new Date(row.jobOrderStatus).toISOString().split('T')[0];
      const formattedjobOrderStatus = nextDay.toISOString().split('T')[0];

    
      if (formattedjobOrderStatus && formattedRowjobOrderStatus !== formattedjobOrderStatus) {
        return false;
      }
      }
      if (jobOrderType && row.jobOrderType && !row.jobOrderType.toLowerCase().includes(jobOrderType.toLowerCase())) {
        return false;
      }
      if(jobOrderInstructDate){
        const nextDay2 = new Date(jobOrderInstructDate);
        nextDay2.setDate(nextDay2.getDate()-1);
        const formattedRowjobOrderInstructDate = new Date(row.jobOrderInstructDate).toISOString().split('T')[0];
        const formattedjobOrderInstructDate = nextDay2.toISOString().split('T')[0];

        if (formattedjobOrderInstructDate && formattedRowjobOrderInstructDate != formattedjobOrderInstructDate) {
          return false;
        }
    }
      if (jobOrderFinishedDate && row.jobOrderFinishedDate && !row.jobOrderFinishedDate.includes(jobOrderFinishedDate)) {
        return false;
      }
      return true;
    });
  
    // 필터링된 결과를 상태 변수에 저장합니다.
    setResponseData(filteredData);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = responseData.filter((row) => ids.includes(row.id));
    
    // console.log(selectedRowsData);
    setSelectionModel(selectedRowsData);
  };





    const handleAdd = (event) => {
      if(localStorage.getItem('PRODUCT_AUTH') === 'N') {
        alert("권한이 없습니다.");
        return;
      }
  
        event.preventDefault();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        // Create a new row object with the form values

        let rowDate;
        let rowDate2;
        if(formData.jobOrderInstructDate){
          rowDate = new Date(formData.jobOrderInstructDate)
        } else{
          rowDate = new Date();
        }
        if(formData.jobOrderFinishedDate){
          rowDate2 = new Date(formData.jobOrderFinishedDate)
        } else{
          rowDate2 = new Date();
        }


        const newRow = {
          id: responseData.length + 1, // Generate a unique ID for the new row
          jobOrderStatus: formData.jobOrderStatus,
          jobOrderType: formData.jobOrderType,
          jobOrderInstructDate: rowDate,
          jobOrderFinishedDate: rowDate2 ,

          // storehouseStartDate : formattedDate,  
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          jobOrderStatus: "",
          jobOrderType: "",
          jobOrderInstructDate: "",
          jobOrderFinishedDate: "",
        });
      };


      
    const [responseData, setResponseData] = useState([]);
    const [responseData2, setResponseData2] = useState([]);


    useEffect(() => {
      sendGetRequest();
      fetchEmployeeList();
      fetchTrCompanyList();
      fetchProjectList();
      fetchFinishedList();
      fetchStorehouseList();
    }, []);

    const fetchStorehouseList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch(BASE + STORE)
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setStoreList(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
  
    const fetchTrCompanyList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch(BASE + TR_COMP)
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setTrCompList(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };

    const fetchFinishedList = () => {
      fetch(BASE + FINISHED_ITEM)
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setFinishedList(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });

    }

    const fetchProjectList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch(BASE + PROJECT)
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setProjectList(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };

    const fetchEmployeeList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch(BASE + EMPLOYEE)
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setEmpList(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
   
      
    const sendGetRequest = async () => {
        try {
          const response = await fetch(BASE + JOBORDER);
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            jobOrderInstructDate: new Date(item.jobOrderInstructDate),
            jobOrderFinishedDate: new Date(item.jobOrderFinishedDate)
            // projectRegDate: new Date(item.projectRegDate),
            // projectUpdateDate: new Date(item.projectUpdateDate),
          }));
          // console.log(processedData);
          setResponseData(processedData);
          setOriginalRows(processedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };


  const [formData, setFormData] = useState({
    jobOrderStatus: "",
    jobOrderType: "",
    jobOrderInstructDate: "",
    jobOrderFinishedDate: "",
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
    if(localStorage.getItem('PRODUCT_AUTH') === 'N') {
      alert("권한이 없습니다.");
      return;
    }

    
    const data = apiRef.current?.getRowModels(); // 데이터 가져오기
    const dataArray = Array.from(data.values()); // Map 객체를 배열로 변환
    
    const jsonData = JSON.stringify(dataArray);
    // console.log('수정버튼 !!');
    // console.log(JSON.stringify(responseData));
    // console.log(jsonData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch(BASE + JOBORDER, requestOptions)
      .then((response) => {
        // 응답 처리
        if (response.ok) {
          alert('저장이 완료되었습니다.');
          console.log('POST 요청이 성공했습니다.');
          sendGetRequest();
          window.location.reload();

        } else {
          console.log('POST 요청이 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('POST 요청 중 오류가 발생했습니다.', error);
      });

  }


  const handleSave2 = () => {

    
    const data = apiRef2.current?.getRowModels(); // 데이터 가져오기
    const dataArray = Array.from(data.values()); // Map 객체를 배열로 변환
    
    const jsonData = JSON.stringify(dataArray);
    // console.log('수정버튼 !!');
    // console.log(JSON.stringify(responseData2));
    // console.log(jsonData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch(BASE + JOBORDER, requestOptions)
      .then((response) => {
        // 응답 처리
        if (response.ok) {
          alert('저장이 완료되었습니다.');
          console.log('POST 요청이 성공했습니다.');
          sendGetRequest();
          window.location.reload();

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
    // console.log(formData);
    // axios 또는 다른 HTTP 클라이언트를 사용하여 서버로 데이터 전송 등의 로직 추가
  };

  const handleDelete = () => {
    if(localStorage.getItem('PRODUCT_AUTH') === 'N') {
      alert("권한이 없습니다.");
      return;
    }

    if(selectionModel.length<1) {
      alert("삭제할 행이 없습니다.");
      return;
    }
    const jobOrderCode = selectionModel.map((selectedRow) => selectedRow.jobOrderCode);
      // console.log(jobOrderCode);
    // console.log(selectionModel);
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    

    if (shouldDelete) {

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobOrderCode),
      };
    
      fetch(BASE + JOBORDER, requestOptions)
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
      jobOrderStatus: "",
      jobOrderType: "",
      jobOrderInstructDate: "",
      jobOrderFinishedDate: "",
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
      jobOrderType: selectedOption.label,
    }));
    setIsModalOpen(false);
  };
  

  const modalOptions = [
    { id: 1, label: "저장" },
    { id: 2, label: "확정" },
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
      field: 'jobOrderCode',
      headerName: '지시번호',
      width: 100,
      editable: false,
      cellClassName: 'grayCell',
      // type: 'singleSelect',
      // cellClassName: 'selectCell',
      // valueOptions: ['저장', '확정'],
    },
    {
      field: 'jobOrderStatus',
      headerName: '상태',
      width: 100,
      editable: true,
      cellClassName: 'selectCell',
       type: 'singleSelect',
      valueOptions: ['확정', '취소'],

    },
    {
        field: "jobOrderType",
        headerName: "유형",
        width: 110,
        editable: true,
        cellClassName: 'selectCell',
        type: 'singleSelect',
        valueOptions: ['일반'],
      },
      {
        field: 'jobOrderInstructDate',
        headerName: '지시일',
        editable: true,
        sortable: false,
        type: 'date',
        width: 160,
      },
      {
        field: 'jobOrderFinishedDate',
        headerName: '완료일',
        editable: true,
        sortable: false,
        width: 160,
        type: 'date',
      },
      {
        field: 'finishedCode',
        headerName: '아이템코드',
        width: 150,
        editable: true,
        cellClassName: 'blueCell',
        type: 'singleSelect',
         valueOptions: finishedList.map((finished) => ({
           value: finished.finishedCode,
           label: finished.finishedCode,
         })), 
  
      },
      {
        field: "finishedName",
        headerName: "품명",
        width:210,
        editable: false,
        cellClassName: 'grayCell',
        
      },
      {
        field: 'jobOrderQuantity',
        headerName: '수량',
        editable: true,
        type: 'number', 
        sortable: false,
        width: 160,
      },
      {
        field: 'projectCode',
        headerName: '프로젝트코드',
        editable: true,
        sortable: false,
        width: 160,
        cellClassName: 'blueCell',
        type: 'singleSelect',
        valueOptions: projectList.map((tr) => ({
          value: tr.projectCode,
          label: tr.projectCode,
        })), 
        // type: 'date',
      },
      {
        field: 'projectName',
        headerName: '프로젝트명',
        // editable: true,
        sortable: false,
        cellClassName: 'grayCell',
        width: 160,
        
      },
      {
        field: 'storehouseCode',
        headerName: '창고',
        cellClassName: 'blueCell',
        editable: true,
        sortable: false,
        width: 160,
        type: 'singleSelect',
        valueOptions: storeList.map((store) => ({
          value: store.storehouseCode,
          label: store.storehouseCode,
        })), 
      },
      {
        field: 'storehouseName',
        headerName: '창고명',
        editable: false,
        sortable: false,
        cellClassName: 'grayCell',
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
        const selectedStore = storeList.find((store) => store.storehouseCode === newRow.storehouseCode);
        const selectedFinished = finishedList.find((finish) => finish.finishedCode === newRow.finishedCode);

        return {
          ...updatedRow,
          empName: selectedEmp ? selectedEmp.empName : '',
          projectName: selectedProject ? selectedProject.projectName : '',
          trCompName: selectedTrComp ? selectedTrComp.trCompName : '',
          storehouseName : selectedStore ? selectedStore.storehouseName : '',
          finishedName : selectedFinished ? selectedFinished.finishedName : '',
               
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
              <div>작업상태</div>
           

            <Select
              labelId="estimatePayment-label"
              id="estimatePayment"
              value={formData.jobOrderStatus}
              name="jobOrderStatus"
              onChange={handleChange}
              style={{ width: '30%' }}
            >
              <MenuItem value="저장">저장</MenuItem>
              <MenuItem value="확정">확정</MenuItem>
 
            </Select>
            <div>작업유형</div>
            <Select
              labelId="estimatePayment-label"
              id="estimatePayment"
              value={formData.jobOrderType}
              name="jobOrderType"
              onChange={handleChange}
              style={{ width: '30%' }}
            >
              <MenuItem value="일반">일반</MenuItem>
 
            </Select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <div>지시일자</div>
            <TextField
                id="standard-search"
                type="date"
                
                value={formData.jobOrderInstructDate}
                variant="standard"
                
                name="jobOrderInstructDate"
                onChange={handleChange}
                style={{ width: '30%' }}
            />
            <div>완료일자</div>
            <TextField
                id="standard-search"
                type="date"
                
                value={formData.jobOrderFinishedDate}
                variant="standard"
                
                name="jobOrderFinishedDate"
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
      <h3>문서 상태:</h3>
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
            onRowClick={handleRowClick} // 행 클릭 이벤트 처리 함수를 전달합니다.
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
          background-color: #0E2954;
          color: white;
        }

        .blueCell{
          background-color: #7895B2;
          color: white;
        }

        .selectCell {
          background-color: #FFEEBB;
          
        }
      `}</style>
    </>
  );
}

export default CreateWorkOrder;
