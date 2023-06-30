import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import styles from "./css/ProductManagement.module.css";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function OrangeInputforHalf() {

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
            // "halfCode": inputValue[0],
            "halfName": inputValue[0],
            "halfComment": inputValue[1]
        }

        // console.log(data);

        axios
            .post('http://localhost:8888/ynfinal/halfitem', data)
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
                                <Form.Control readOnly placeholder='반제품 코드'
                                              style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
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
                                <Form.Control
                                    readOnly
                                    placeholder='반제품명'
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
                                <Form.Control readOnly
                                              placeholder='비고'
                                              style={{marginRight: '10px', width: '150px'}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control className="mb-2"
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


const ProductManagementHalfTable = () => {
    const CustomPagination = () => null;
    const [rows, setRows] = useState([]);

    useEffect(() => {

        const fetchGridData = async () => {
            try {
                const response = await fetch('http://localhost:8888/ynfinal/halfitem');
                const data = await response.json();

                // Generate unique IDs for the rows based on their index
                const rowsWithIds = data.map((row, index) => ({...row, id: index + 1}));

                setRows(rowsWithIds);
            } catch (error) {
                console.error('Error fetching grid data:', error);
            }
        };

        fetchGridData();
    }, []);


    // 행 선택
    const [selectedRow, setSelectedRow] = useState(null);
    const handleRowClick = (params) => {

        const selectedRowData = params.row;

        console.log("선택된 row의 정보:", selectedRowData);

        setSelectedRow(selectedRowData);
    };

    // 수정 버튼
    const handleModifyClick = async () => {
        const arrayData = selectedRow
        try {
            const response = await fetch('http://localhost:8888/ynfinal/halfitem', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arrayData),
            });
            console.log('선택정보 수정확인', arrayData);

            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    // 삭제 버튼
    const handleDeleteClick = async () => {
        const arrayData = selectedRow.halfCode
        try {
            const response = await fetch('http://localhost:8888/ynfinal/halfitem/' + arrayData, {
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
        <div style={{height: 800, width: '100%'}}>
            <div style={{marginBottom: '1rem'}}>
                <div style={{marginBottom: '20px'}}>
                    <Button variant="primary" onClick={handleModifyClick} style={{marginRight: '10px'}}>수정 저장</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>삭제</Button>
                </div>
                <DataGrid
                    rows={rows}
                    columns={[
                        {field: 'halfCode', headerName: '반제품 코드', width: 150},
                        {field: 'halfName', headerName: '반제품명', width: 150},
                        {field: 'halfCount', headerName: '수량', width: 150, editable: true},
                        {field: 'halfPrice', headerName: '금액', width: 150, editable: true},
                        // {field: 'storehouseCode', headerName: '창고 번호', width: 150, editable: true},
                        {field: 'empName', headerName: '사원 이름', width: 150},
                        {field: 'halfRegDate', headerName: ' 반제품 등록일', width: 150},
                        {field: 'halfRegUpdate', headerName: ' 반제품 수정일', width: 150},
                        {field: 'halfComment', headerName: '비고', width: 150},
                    ]}
                    checkboxSelection={true}
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};
export {ProductManagementHalfTable, OrangeInputforHalf}

