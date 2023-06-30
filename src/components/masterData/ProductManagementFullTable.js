import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import styles from "./css/ProductManagement.module.css";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {API_BASE_URL,FINISHED} from '../../config/host-cofig';


function OrangeInputforFull() {

    const API_FIN_URL = API_BASE_URL + FINISHED

    const [inputValue, setInputValue] = useState([]);
    const handleInputChange = (index, value) => {
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);
    };

    // console.log(inputValue)

    // 초기화  버튼 선택시
    const handleReset = () => {
        const newInputValue = inputValue.map(() => "");
        setInputValue(newInputValue);
    };

    // 저장 버튼 선택시
    const handleSubmit = () => {
        if (inputValue.length === 2 && inputValue.every((value) => value.trim() !== '')) {
            const data = {
                // "finishedCode": inputValue[0],
                "finishedName": inputValue[0],
                "finishedSize": inputValue[1],
                empNo : localStorage.getItem('EMP_NO'),
            }


            console.log(data);
            alert('저장완료')
            axios
                .post(API_FIN_URL, data)
                .then(response => {
                    // const {finishedCode} = response.data;
                    console.log(response.data);
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
                                <Form.Control readOnly placeholder='제품 코드'
                                              style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="au₩to">
                                <Form.Control className="mb-2"
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
                                <Form.Control readOnly placeholder='제품명'
                                              style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control className="mb-2"
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
                                    placeholder='규격'
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
    )
        ;

}


const ProductManagementFullTable = () => {
    const API_FIN_URL = API_BASE_URL + FINISHED
    
    const CustomPagination = () => null;
    const [rows, setRows] = useState([]);



    useEffect(() => {
        fetchGridData();
    }, []);

    const fetchGridData = async () => {
        try {
            const response = await fetch(API_FIN_URL);
            const data = await response.json();

            const rowsWithIds = data.map((row, index) => ({...row, id: index + 1}));

            setRows(rowsWithIds);
        } catch (error) {
            console.error('Error fetching grid data:', error);
        }
    };

    // 행 선택
    const [selectedRow, setSelectedRow] = useState(null);
    const handleRowClick = (params) => {

        const selectedRowData = params.row;

        console.log("선택된 row의 정보:", selectedRowData);

        setSelectedRow(selectedRowData);
    };


// 표 내용 수정시
    const handleModifyClick = async () => {

        const arrayData = selectedRow
        arrayData.empNo = localStorage.getItem('EMP_NO');
        try {
            const response = await fetch(API_FIN_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayData),
            });
            console.log('선택정보 수정확인', arrayData);
            alert('수정완료!');
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    // 삭제
    const handleDeleteClick = async () => {
        const arrayData = selectedRow.finishedCode
        try {
            const response = await fetch(API_FIN_URL+'/' + arrayData, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayData),
            });
            console.log('선택정보 삭제확인', arrayData);

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    return (
        <div style={{height: 500, width: '100%'}}>
            <div style={{marginBottom: '1rem'}}>
                <div style={{marginBottom: '20px'}}>
                    <Button variant="primary" onClick={handleModifyClick} style={{marginRight: '10px'}}>수정 저장</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>삭제</Button>
                </div>
                <DataGrid
                    rows={rows}
                    columns={[
                        {field: 'finishedCode', headerName: '제품 코드', width: 150},
                        {field: 'finishedName', headerName: '제품명', width: 150},
                        {field: 'finishedSize', headerName: '규격', width: 150},
                        {field: 'finishedCount', headerName: '수량', width: 150, editable: true},
                        {field: 'finishedPrice', headerName: '금액', width: 150, editable: true},
                        {field: 'empName', headerName: '사원 이름', width: 150},
                        {field: 'finishedRegDate', headerName: '제품 등록일', width: 150},
                        {field: 'finishedRegUpdate', headerName: '제품 수정일', width: 150},
                    ]}
                    checkboxSelection={true}
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
}
export {OrangeInputforFull, ProductManagementFullTable}

