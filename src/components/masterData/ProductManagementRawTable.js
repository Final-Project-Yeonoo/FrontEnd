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
        if (inputValue.length === 2 && inputValue.every((value) => value.trim() !== '')) {
            const data = {
                // rawCode: inputValue[0],
                rawName: inputValue[0],
                rawType: inputValue[1]
            };

            console.log(data);

            axios
                .post('http://localhost:8888/ynfinal/rawitem', data)
                .then(response => {
                    const { rawCode } = response.data;
                    console.log(response.data);
                    console.log('Received rawCode:', rawCode); // rawCode를 콘솔에 출력
                })
                .catch(error => {
                    console.error('실패함', error);
                });
        } else {
            alert('항목을 모두 입력해야 합니다.');
        }
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
                                    placeholder='자동 완성'
                                    // value={inputValue[0]}
                                    // onChange={(e) => handleInputChange(0, e.target.value)}
                                    readOnly
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
                                    placeholder='유형'
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

    // 저장 시 정보 전달
    useEffect(() => {
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
        fetchGridData();
    }, []);

    // 행 선탥
    const [selectedRow, setSelectedRow] = useState(null);
    const handleRowClick = (params) => {

        const selectedRowData = params.row;

        console.log("선택된 row의 정보:", selectedRowData);
        setSelectedRow(selectedRowData);
    };

    // 수정 버튼 클릭시 백에 전달
    const handleModifyClick = async () => {
        const arrayData = selectedRow
        try {
            const response = await fetch('http://localhost:8888/ynfinal/rawitem', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayData),
            });
            console.log('선택정보 수정확인',arrayData);

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    // 수정 버튼 클릭시 백에 전달
    const handleDeleteClick = async () => {
        const arrayData = selectedRow.rawCode
        try {
            const response = await fetch('http://localhost:8888/ynfinal/rawitem/'+`${arrayData}` , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayData),
            });
            console.log('선택정보 삭제확인',arrayData);

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div style={{height: 800, width: '100%'}}>
            <div style={{marginBottom: '1rem'}}>
                <div style={{marginBottom:'20px'}}>
                    <Button variant="primary" sytle={{marginRight:'10px'}} onClick={handleModifyClick}>수정 완료</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>삭제</Button>
                </div>
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
                    ]}
                    checkboxSelection={true}
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};


export {ProductManagementRawTable, OrangeInputforRaw}

