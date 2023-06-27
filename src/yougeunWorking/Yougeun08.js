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




// 실적등록
function RegisterPerformance() {


  
  const [selectionModel, setSelectionModel] = useState([])
  const [selectionModel2, setSelectionModel2] = useState([])
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  const apiRef2 = React.useRef(null);
  const [empList, setEmpList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [trCompList, setTrCompList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [jobOrderList, setJobOrderList] = useState([]);
  const [code, setCode] = useState([]);
  const [finishedList, setFinishedList] = useState([]);

  const handleRowClick = (ids) => {
    console.log(ids.row.orderCode);
    setCode(ids.row.orderCode);
  
    fetch('http://localhost:8888/ynfinal/performance')
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.values(data).filter((item) => ids.row.orderCode === item.orderCode);
  
        const processedData = filteredData.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
  
        setResponseData2(processedData);
        console.log(processedData);
      })
      .catch((error) => {
        console.error('Failed to fetch employee list:', error);
      });
  };

 

  const handleFilter = () => {
    const { estimateDate, estimateOrderType, orderDate, orderEtc } = formData;
  
    
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
      if(orderDate){
        const nextDay2 = new Date(orderDate);
        nextDay2.setDate(nextDay2.getDate()-1);
        const formattedRowOrderDate = new Date(row.orderDate).toISOString().split('T')[0];
        const formattedOrderDate = nextDay2.toISOString().split('T')[0];

        if (formattedOrderDate && formattedRowOrderDate != formattedOrderDate) {
          return false;
        }
    }
      if (orderEtc && row.orderEtc && !row.orderEtc.includes(orderEtc)) {
        return false;
      }
      return true;
    });
  
    // 필터링된 결과를 상태 변수에 저장합니다.
    setResponseData(filteredData);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = responseData.filter((row) => ids.includes(row.id));
    
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
          orderDate: formData.orderDate,
          orderEtc: formData.orderEtc,
          // storehouseStartDate : formattedDate,  
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          estimateDate: "",
          estimateOrderType: "",
          orderDate: "",
          orderEtc: "",
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
      fetchJoborderList();
    }, []);

    const fetchJoborderList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch('http://localhost:8888/ynfinal/joborder')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setJobOrderList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
  

    const fetchStorehouseList = () => {
      // 견적담당자 목록을 가져오는 API 요청을 수행합니다.
      // 예를 들어, '/api/employees' 엔드포인트로 GET 요청을 보내고 견적담당자 목록을 받아온다고 가정합니다.
      fetch('http://localhost:8888/ynfinal/store')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setStoreList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });
    };
  
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

    const fetchFinishedList = () => {
      fetch('http://localhost:8888/ynfinal/finisheditem')
        .then((response) => response.json())
        .then((data) => {
          // 견적담당자 목록을 받아온 후 valueOptions에 설정합니다.

          setFinishedList(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Failed to fetch employee list:', error);
        });

    }

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
          const response = await fetch("http://localhost:8888/ynfinal/performance");
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            performanceStartdate : new Date(item.performanceStartdate),
            performanceEnddate: new Date(item.performanceEnddate)
            // projectRegDate: new Date(item.projectRegDate),
            // projectUpdateDate: new Date(item.projectUpdateDate),
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
    orderDate: "",
    orderEtc: "",
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
    console.log('수정버튼 !!');
    console.log(JSON.stringify(responseData));
    console.log(jsonData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch('http://localhost:8888/ynfinal/performance', requestOptions)
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
    console.log('수정버튼 !!');
    console.log(JSON.stringify(responseData2));
    console.log(jsonData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch('http://localhost:8888/ynfinal/performance', requestOptions)
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
    console.log(formData);
    // axios 또는 다른 HTTP 클라이언트를 사용하여 서버로 데이터 전송 등의 로직 추가
  };

  const handleDelete = () => {
    if(selectionModel.length<1) {
      alert("삭제할 행이 없습니다.");
      return;
    }
    const orderCodes = selectionModel.map((selectedRow) => selectedRow.orderCode);
      console.log(orderCodes);
    console.log(selectionModel);
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    

    if (shouldDelete) {

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderCodes),
      };
    
      fetch('http://localhost:8888/ynfinal/performance', requestOptions)
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
      orderDate: "",
      orderEtc: "",
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
    field: 'performanceCode',
    headerName: 'No',
    width: 100,
    editable: false,
    cellClassName: 'grayCell',
    // type: 'singleSelect',
    // cellClassName: 'selectCell',
    // valueOptions: ['저장', '확정'],
  },
    {
      field: 'jobOrderCode',
      headerName: '지시번호',
      width: 150,
      editable: true,
      cellClassName: 'blueCell',
      type: 'singleSelect',
       valueOptions: jobOrderList.map((joborder) => ({
         value: joborder.jobOrderCode,
         label: joborder.jobOrderCode,
       })), 
    },
    {
      field: 'jobOrderInstructDate',
        headerName: '지시일',
        editable: false,
        sortable: false,
        type: 'date',
        cellClassName: 'grayCell',
        width: 160,
    },
    {
        field: "jobOrderType",
        headerName: "유형",
        width: 110,
        editable: false,
        cellClassName: 'grayCell',
        type: 'singleSelect',
        valueOptions: ['일반'],
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
        editable: false,
        type: 'number', 
        cellClassName: 'grayCell',
        sortable: false,
        width: 160,
      },

      {
        field: 'performanceStartdate',
        headerName: '시작시간',
        editable: true,
        sortable: false,
        width: 160,
        type: 'date',
      },
      
      {
        field: 'performanceEnddate',
        headerName: '종료시간',
        editable: true,
        sortable: false,
        width: 160,
        type: 'date',
      },
     
      {
        field: 'performanceGoodCnt',
        headerName: '양품수량',
        editable: true,
        type: 'number', 
        sortable: false,
        width: 160,
      },

      {
        field: 'performanceBadCnt',
        headerName: '불량수량',
        editable: true,
        type: 'number', 
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
        const selectedStore = storeList.find((store) => store.storehouseCode === newRow.storehouseCode);
        const selectedJoborder = jobOrderList.find((joborder) => joborder.jobOrderCode === newRow.jobOrderCode);
        const selectedFinished = finishedList.find((finish) => finish.finishedCode === newRow.finishedCode);

        return {
          ...updatedRow,
          empName: selectedEmp ? selectedEmp.empName : '',
          projectName: selectedProject ? selectedProject.projectName : '',
          trCompName: selectedTrComp ? selectedTrComp.trCompName : '',
          storehouseName : selectedStore ? selectedStore.storehouseName : '',
          jobOrderInstructDate : selectedJoborder ? selectedJoborder.jobOrderInstructDate : '',
          jobOrderType : selectedJoborder ? selectedJoborder.jobOrderType : '',
          jobOrderQuantity : selectedJoborder ? selectedJoborder.jobOrderQuantity : '',
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
            <div>납기일자</div>
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
            <div>수주일자</div>
            <TextField
                id="standard-search"
                type="date"
                
                value={formData.orderDate}
                variant="standard"
                
                name="orderDate"
                onChange={handleChange}
                style={{ width: '30%' }}
            />
            <div>비고사항</div>
            <TextField
                id="standard-search"
                // label="비고"
                type="search"
                variant="standard"
                value={formData.orderEtc}
                name="orderEtc"
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

export default RegisterPerformance;
