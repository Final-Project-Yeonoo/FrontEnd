import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import styles from "./css/ProductManagement.module.css";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



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
                <Button variant="primary" onClick={() => {
                }}>조회</Button>
                <Button variant="success" onClick={handleSubmit}>저장</Button>
                <Button variant="danger" onClick={() => {
                }}>삭제</Button>
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

            // Generate unique IDs for the rows based on their index
            const rowsWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

            setRows(rowsWithIds);
        } catch (error) {
            console.error('Error fetching grid data:', error);
        }
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    const columns = [
        { field: 'rawCode', headerName: '원자재 코드', width: 150 },
        { field: 'rawName', headerName: '원자재명', width: 150 },
        { field: 'rawType', headerName: '유형', width: 150 },
        { field: 'rawCount', headerName: '수량', width: 150 , editable:true },
        { field: 'rawPrice', headerName: '금액', width: 150, editable:true },
        { field: 'storehouseCode', headerName: '창고 번호', width: 150, editable:true },
        { field: 'empNo', headerName: '사원 번호', width: 150 },
        { field: 'rawRegDate', headerName: '원자재 등록일', width: 150 },
        { field: 'rawRegUpdate', headerName: '원자재 수정일', width: 150 },
    ];

    const handleSelectionModelChange = (selection) => {
        setSelectedRows(selection);
        console.log(selection); // 선택한 행 출력
    };

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                      components={{
                          Pagination: CustomPagination,
                      }}
                      checkboxSelection={true}
                      selectionModel={selectedRows}
                      onSelectionModelChange={handleSelectionModelChange}

            />
        </div>
    );
};
export {ProductManagementRawTable, OrangeInputforRaw};

