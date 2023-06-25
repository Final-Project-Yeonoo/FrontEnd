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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// 프로젝트 등록
function RegisterProject() {


  const [selectionModel, setSelectionModel] = useState([])
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [originalRows, setOriginalRows] = React.useState([]);
  const apiRef = React.useRef(null);
  const [data, setData] = useState([]);


  const handleFilter = () => {
    const { projectName, storehouseAddr, storehouseName, storehouseEtc } = formData;
  
    const filteredData = originalRows.filter((row) => {
      if (projectName && !row.projectName.includes(projectName)) {
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
    const updatedData = data.map((row) => {
      if (row.id === params.id) {
        return { ...row, [params.field]: params.value };
      }
      return row;
    });
    setData(updatedData);
    setResponseData([updatedData]);
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
      projectName: formData.projectName,
      storehouseAddr: formData.storehouseAddr,
      storehouseName: formData.storehouseName,
      storehouseEtc: formData.storehouseEtc,
      storehouseStartDate: formattedDate,
    };
  
    // Add the new row to the responseData array
    setResponseData([...responseData, newRow]);
  
    // Reset the form inputs
    setFormData({
      projectName: "",
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
          const response = await fetch("http://localhost:8888/ynfinal/project");
          const data = await response.json();
          const processedData = Object.values(data).map((item, index) => ({
            id: index + 1, // 1부터 시작하여 증가하는 값으로 id 할당
            ...item,
            projectDate: new Date(item.projectDate),
            projectName: storehouseTypeTranslations[item.projectName] || item.projectName,
          }));
          console.log(processedData);
          setResponseData(processedData);
          setOriginalRows(processedData);
        } catch (error) {
          console.error("Error:", error);
        }
      };


  const [formData, setFormData] = useState({
    projectName: "",
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
    // dataArray.forEach((row) => {
    //   row.projectName = storehouseTypeMapping[row.projectName] || 'FINISHED';
    // });


    console.log(dataArray); 
    const jsonData = JSON.stringify(dataArray);
    console.log(jsonData);

    // if(true) return;
  
    // projectName 값을 역매핑하여 변경
    

    console.log(JSON.stringify(responseData));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };
  
    fetch('http://localhost:8888/ynfinal/project', requestOptions)
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
    
      fetch('http://localhost:8888/ynfinal/project', requestOptions)
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
      projectName: "",
    });
    // 기타 초기화 작업 추가
    sendGetRequest();
    
  };

  const handleOptionClick = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      projectName: selectedOption.label,
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
      field: 'projectCode',
      headerName: '프로젝트코드',
      width: 150,
      cellClassName: 'grayCell',
      editable: false
    },
    {
      field: 'projectName',
      headerName: '프로젝트명',
      width: 150,
      editable: true,
    },
    
  {
    field: 'projectDate',
    headerName: '프로젝트일시',
    width: 150,
    editable: true,
    type: 'date',
  },
    {
      field: 'empId',
      headerName: '등록자아이디',
      sortable: false,
      editable: false,
      cellClassName: 'grayCell',
      width: 160,
    },
    {
        field: 'empName',
        headerName: '등록이름',
        editable: false,
        sortable: false,
        cellClassName: 'grayCell',
        width: 160,
      },
      {
        field: 'projectEtc',
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
                label="프로젝트명"
                value={formData.projectName}
                variant="standard"
                name="projectName"
                onChange={handleChange}
                style={{ width: '100%' }} 
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
            onCellEditCommit={handleCellChange}
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

export default RegisterProject;
