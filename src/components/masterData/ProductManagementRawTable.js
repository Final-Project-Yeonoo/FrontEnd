import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import './css/ProductManagementRawTable.css'
import styles from "./css/ProductManagement.module.css";
import {Checkbox} from "@mui/material";


function OrangeInputforRaw() {

    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (index, value) => {
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);
    };

    console.log(inputValue)

    // 초기화  버튼 선택시
    const handleReset = () => {
        const newInputValue = inputValue.map(() => "");
        setInputValue(newInputValue);
    };

    // 저장 버튼 선택시
    const handleSubmit = () => {
        const data = {
            "rawCode": inputValue[0],
            "rawName": inputValue[1],
            "rawType": inputValue[2]
        }

        console.log(data);

        axios
            .post('http://localhost:8888/ynfinal/rawitem', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('실패함', error);
            });
    };


    return (
        <>

            <div className={styles.searchSection}>
                <Form>
                    <Row>
                        <div style={{display: 'flex'}}>
                            <Col xs="auto">
                                <Form.Control readOnly placeholder='원자재 코드'
                                              style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder='입력하세요'
                                    value={inputValue[0]}
                                    onChange={(e) => handleInputChange(0, e.target.value)}
                                />
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <div style={{display: 'flex'}}>
                            <Col xs="auto">
                                <Form.Control
                                    readOnly
                                    placeholder='원자재명'
                                    style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder='입력하세요'
                                    value={inputValue[1]}
                                    onChange={(e) => handleInputChange(1, e.target.value)}
                                />
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <div style={{display: 'flex'}}>
                            <Col xs="auto">
                                <Form.Control
                                    readOnly
                                    placeholder='유형'
                                    style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control
                                    className="mb-2"
                                    id="inlineFormInput"
                                    placeholder='입력하세요'
                                    value={inputValue[2]}
                                    onChange={(e) => handleInputChange(2, e.target.value)}
                                />
                            </Col>
                        </div>
                    </Row>
                </Form>
            </div>
            <div className={styles.navRight}>
                <Button variant="success" onClick={handleSubmit}>저장</Button>
                <Button variant="secondary" onClick={handleReset}>초기화</Button>
            </div>
        </>
    );

}

const ProductManagementRawTable = () => {
    const CustomPagination = () => null;
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/rawitem');
            const data = await response.json();
            const rowsWithIds = data.map((row, index) => ({...row, id: index + 1}));
            setRows(rowsWithIds);
        } catch (error) {
            console.error('Error fetching grid data:', error);
        }
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    const handleRowCheckboxChange = (event, rowId) => {
        const selectedRowIds = [...selectedRows];
        if (event.target.checked) {
            selectedRowIds.push(rowId);
        } else {
            const index = selectedRowIds.indexOf(rowId);
            if (index !== -1) {
                selectedRowIds.splice(index, 1);
            }
        }
        setSelectedRows(selectedRowIds);
    };

    const handleButtonClick = () => {
        const modifiedData = selectedRows.map(rowId => {
            const modifiedRow = rows.find(row => row.id === rowId);
            return modifiedRow ? {...modifiedRow} : null;
        });
        console.log('Modified Data:', modifiedData);
        // 여기서 수정된 데이터를 백엔드로 전송하는 로직을 추가하면 됩니다.
    };

    // 삭제
    const handleDeleteButtonClick = () => {
        const modifiedRows = rows.filter(row => !selectedRows.includes(row.id));
        setRows(modifiedRows);
        setSelectedRows([]);

        // 여기에 변경된 데이터를 백엔드로 전송하는 로직을 추가하세요.
        // 백엔드로의 데이터 전송 방식은 환경과 요구사항에 따라 다를 수 있습니다.
        // 예를 들어, fetch 또는 axios를 사용하여 DELETE 요청을 보낼 수 있습니다.
        // 삭제할 행의 id를 서버로 전달하여 해당 행을 삭제하는 작업을 수행합니다.
        // 자세한 내용은 백엔드 API 문서를 참조하시기 바랍니다.
    };
    
    return (
        <div style={{height: 800, width: '100%'}}>
            <div style={{marginBottom: '1rem'}}>
                <Button variant="primary" onClick={handleButtonClick} style={{marginRight: '10px'}}>전송</Button>
                <Button variant="danger" onClick={() => {
                }}>삭제</Button>
                <DataGrid
                    rows={rows}
                    columns={[
                        {field: 'rawCode', headerName: '원자재 코드', width: 150},
                        {field: 'rawName', headerName: '원자재명', width: 150},
                        {field: 'rawType', headerName: '유형', width: 150},
                        {field: 'rawCount', headerName: '수량', width: 150, editable: true},
                        {field: 'rawPrice', headerName: '금액', width: 150, editable: true},
                        {field: 'storehouseCode', headerName: '창고 번호', width: 150, editable: true},
                        {field: 'empNo', headerName: '사원 번호', width: 150},
                        {field: 'rawRegDate', headerName: '원자재 등록일', width: 150},
                        {field: 'rawRegUpdate', headerName: '원자재 수정일', width: 150},
                        {
                            field: 'selection',
                            headerName: '선택',
                            width: 100,
                            renderCell: (params) => (
                                <Checkbox
                                    checked={selectedRows.includes(params.row.id)}
                                    onChange={(event) => handleRowCheckboxChange(event, params.row.id)}
                                />
                            ),
                        },
                    ]}
                    checkboxSelection={true}
                    selectionModel={selectedRows}
                    getRowId={(row) => row.id}
                    components={{
                        Pagination: CustomPagination,
                    }}
                />
            </div>
        </div>
    );
};


export {ProductManagementRawTable, OrangeInputforRaw}

