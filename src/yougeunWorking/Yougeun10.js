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


// 반품등록
function RegisterReturn() {


  
  const [selectionModel, setSelectionModel] = useState([])
  const [selectionModel2, setSelectionModel2] = useState([])
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  const apiRef2 = React.useRef(null);
  const [empList, setEmpList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [trCompList, setTrCompList] = useState([]);
  const [code, setCode] = useState([]);
  const [finishedList, setFinishedList] = useState([]);

  const handleRowClick = (ids) => {
    // console.log(ids.row.returnedCode);
    setCode(ids.row.returnedCode);
  
    fetch(BASE + RETURN_DETAIL)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = Object.values(data).filter((item) => ids.row.returnedCode === item.returnedCode);
  
        const processedData = filteredData.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        
        setResponseData2(processedData);
        // console.log('테스틍ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ');
        // console.log(processedData);
//  console.log('테스틍ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ');
       
        // console.log(responseData2);
      })
      .catch((error) => {
        console.error('Failed to fetch employee list:', error);
      });
  };

 

  const handleFilter = () => {
    const { returnedDate, returnedStatus } = formData;
  
    
    const filteredData = originalRows.filter((row) => {
      if(returnedDate){
      const nextDay = new Date(returnedDate);
      nextDay.setDate(nextDay.getDate() - 1);
      const formattedRowreturnedDate = new Date(row.returnedDate).toISOString().split('T')[0];
      const formattedreturnedDate = nextDay.toISOString().split('T')[0];

    
      if (formattedreturnedDate && formattedRowreturnedDate !== formattedreturnedDate) {
        return false;
      }
      }


      if (returnedStatus && row.returnedStatus && !row.returnedStatus.toLowerCase().includes(returnedStatus.toLowerCase())) {
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


  const onRowsSelectionHandler2 = (ids) => {
    const selectedRowsData2 = responseData2.filter((row) => ids.includes(row.id));
    
    // console.log(selectedRowsData2);
    setSelectionModel2(selectedRowsData2);
  };


    const handleAdd = (event) => {
          
        if(localStorage.getItem('SALES_AUTH') === 'N') {
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
        if(formData.returnedDate){
          rowDate = new Date(formData.returnedDate)
        } else{
          rowDate = new Date();
        }
        const newRow = {
          id: responseData.length + 1, // Generate a unique ID for the new row
          returnedDate: rowDate,
          returnedStatus: formData.returnedStatus,
      
          // storehouseStartDate : formattedDate,  
        };
      
        
        // Add the new row to the responseData array
        setResponseData([...responseData, newRow]);
      
        // Reset the form inputs
        setFormData({
          returnedDate: "",
          returnedStatus: "",
          orderDate: "",
          orderEtc: "",
        });
      };


      const handleAdd2 = (event) => {
        
        if(localStorage.getItem('SALES_AUTH') === 'N') {
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
        const newRow = {
          id: responseData2.length + 1, // Generate a unique ID for the new row
          orderDetailTaxCode : 0.1,
          orderDetailQuantity: 0,
        orderDetailUnitPrice: 0,
        returnedCode : code,
          // storehouseStartDate : formattedDate,  
        };
        // console.log(responseData2);
        
        // Add the new row to the responseData array
        setResponseData2([...responseData2, newRow]);
      
        // Reset the form inputs
       
      };


      const handleDelete2 = () => {
        
        if(localStorage.getItem('SALES_AUTH') === 'N') {
          alert("권한이 없습니다.");
          return;
        }

        if(selectionModel2.length<1) {
          alert("삭제할 행이 없습니다.");
          return;
        }
        const returnDetailCode = selectionModel2.map((selectedRow) => selectedRow.returnDetailCode);
          // console.log(returnDetailCode);
        // console.log(selectionModel2);
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
    
        
    
        if (shouldDelete) {
    
          const requestOptions = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(returnDetailCode),
          };
        
          fetch(BASE + RETURN_DETAIL, requestOptions)
            .then((response) => {
              // 응답 처리
              if (response.ok) {
                alert(selectionModel2.length + '행이 삭제되었습니다.');
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
    const [responseData, setResponseData] = useState([]);
    const [responseData2, setResponseData2] = useState([]);


    useEffect(() => {
      sendGetRequest();
      fetchEmployeeList();
      fetchTrCompanyList();
      fetchProjectList();
      fetchFinishedList();
    }, []);
  
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
          const response = await fetch(BASE + RETURNED);
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            orderDate: new Date(item.orderDate),
            returnedDate: new Date(item.returnedDate),
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
    returnedDate: "",
    returnedStatus: "",
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

    
    if(localStorage.getItem('SALES_AUTH') === 'N') {
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
  
    fetch(BASE + RETURNED, requestOptions)
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

      
    if(localStorage.getItem('SALES_AUTH') === 'N') {
      alert("권한이 없습니다.");
      return;
    }

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
  
    fetch(BASE + RETURN_DETAIL, requestOptions)
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
   
    // console.log("저장 버튼이 클릭되었습니다.");
    // console.log(formData);
    // axios 또는 다른 HTTP 클라이언트를 사용하여 서버로 데이터 전송 등의 로직 추가
  };

  const handleDelete = () => {
    
    if(localStorage.getItem('SALES_AUTH') === 'N') {
      alert("권한이 없습니다.");
      return;
    }

    if(selectionModel.length<1) {
      alert("삭제할 행이 없습니다.");
      return;
    }
    const returnedCodes = selectionModel.map((selectedRow) => selectedRow.returnedCode);
      // console.log(returnedCodes);
    // console.log(selectionModel);
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    

    if (shouldDelete) {

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnedCodes),
      };
    
      fetch(BASE + RETURNED, requestOptions)
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
    // console.log("초기화 버튼이 클릭되었습니다.");
    setFormData({
      returnedDate: "",
      returnedStatus: "",
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
      returnedStatus: selectedOption.label,
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
      field: 'returnedStatus',
      headerName: '상태',
      width: 100,
      editable: true,
      type: 'singleSelect',
      cellClassName: 'selectCell',
      valueOptions: ['저장', '확정'],
    },
    {
      field: 'returnedCode',
      headerName: 'No',
      width: 100,
      editable: false,
      cellClassName: 'grayCell',

    },
    {
        field: "returnedReceipt",
        headerName: "입고번호",
        width: 110,
        editable: false,
        cellClassName: 'grayCell',
        
      },
      {
        field: 'returnedDate',
        headerName: '반품일자',
        editable: true,
        sortable: false,
        type: 'date',
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
  

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 90,
   },
     {
       field: 'returnDetailCode',
       headerName: 'No',
       width: 150,
       editable: false,
       cellClassName: 'grayCell',
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
       field: 'returnDetailQuantity',
       headerName: '수량',
       sortable: false,
       editable: true,
       width: 110,
       type: 'number',
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



  const processRowUpdate2 = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const updatedData = responseData2.map((row) => {
      if (row.id === newRow.id) {
        const selectedEmp = empList.find((emp) => emp.empId === newRow.empId);
        const selectedProject = projectList.find((project) => project.projectCode === newRow.projectCode);
        const selectedTrComp = trCompList.find((trComp) => trComp.trCompCode === newRow.trCompCode);
        const selectedFinished = finishedList.find((finish) => finish.finishedCode === newRow.finishedCode);

        const sum = newRow.orderDetailQuantity * newRow.orderDetailUnitPrice + newRow.orderDetailQuantity * newRow.orderDetailUnitPrice * newRow.orderDetailTaxCode;
        

        setResponseData2((prevData) => {
          const updatedData = prevData.map((prevRow) => {
            if (prevRow.id === newRow.id) {
              return {
                ...updatedRow,
                // empName: selectedEmp ? selectedEmp.empName : '',
                // projectName: selectedProject ? selectedProject.projectName : '',
                // trCompName: selectedTrComp ? selectedTrComp.trCompName : '',
                // orderDetailVat: sum,
                finishedName : selectedFinished ? selectedFinished.finishedName : '',
                // returnedCode : ,
              };
            }
            return prevRow;
          });
          return updatedData;
        });
  
        // console.log(updatedRow.orderDetailUnitPrice);
        // console.log(updatedRow.orderDetailQuantity);
        // console.log(sum);
      }
      return row;
    });
  
    return updatedRow;
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>

       
        
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <div>반품상태</div>
           

            <Select
              labelId="estimatePayment-label"
              id="estimatePayment"
              value={formData.returnedStatus}
              name="returnedStatus"
              onChange={handleChange}
              style={{ width: '30%' }}
            >
              <MenuItem value="저장">저장</MenuItem>
              <MenuItem value="확정">확정</MenuItem>
            </Select>
            <div>반품일자</div>
            <TextField
                id="standard-search"
                type="date"
                
                value={formData.returnedDate}
                variant="standard"
                
                name="returnedDate"
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
  <Box sx={{ height: '40vh', width: '100%' }}>
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

<div style={{marginBottom:'20px',  display: 'flex', padding:'10px',  justifyContent: 'flex-end'}}>
            <Button color="primary" onClick={handleAdd2} variant="contained" type="submit" style={{ marginLeft: '10px', backgroundColor: 'green'  }}>
              추가
            </Button>{" "}     
            <Button color="secondary" variant="contained" onClick={handleDelete2} style={{ marginLeft: '10px' }}>
              삭제
            </Button>{" "}
            <Button color="primary" variant="contained" onClick={handleSave2} style={{ marginLeft: '10px' }}>
              저장
            </Button>{" "}
          </div>


<Box sx={{ height: '40vh', width: '100%' }}>
    <DataGrid
            apiRef={apiRef2}
            rows={responseData2}
            columns={columns2}
            checkboxSelection
            disableSelectionOnClick
            disableRowSelectionOnClick 
            
            onRowSelectionModelChange={(ids) => onRowsSelectionHandler2(ids)}
            processRowUpdate={processRowUpdate2}
          />
</Box>
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

export default RegisterReturn;
