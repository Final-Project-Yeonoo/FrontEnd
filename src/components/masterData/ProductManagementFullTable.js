import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import styles from "./css/ProductManagement.module.css";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function OrangeInputforFull() {

    const [inputValue, setInputValue] = useState([]); // 초기값 빈 배열로 설정

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
                // "finishedCode": inputValue[0],
                "finishedName": inputValue[0],
                "finishedSize": inputValue[1]
            }


            console.log(data);

            axios
                .post('http://localhost:8888/ynfinal/finisheditem', data)
                .then(response => {
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
                                <Form.Control readOnly placeholder='규격'
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
                <Button variant="primary" onClick={() => {
                }}>조회</Button>
                <Button variant="success" onClick={handleSubmit}>저장</Button>
                <Button variant="danger" onClick={() => {
                }}>삭제</Button>
                <Button variant="secondary" onClick={handleReset}>초기화</Button>
            </div>
        </>
    )
        ;

}


const ProductManagementFullTable = () => {
    const CustomPagination = () => null;

    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState(null);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/finisheditem');
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

    const columns = [
        {field: 'finishedCode', headerName: '제품 코드', width: 150},
        {field: 'finishedName', headerName: '제품명', width: 150},
        {field: 'finishedSize', headerName: '규격', width: 150},
        {field: 'finishedCount', headerName: '수량', width: 150, editable: true},
        {field: 'finishedPrice', headerName: '금액', width: 150, editable: true},
        {field: 'storehouseCode', headerName: '창고 번호', width: 150, editable: true},
        {field: 'empNo', headerName: '사원 번호', width: 150},
        {field: 'finishedRegDate', headerName: '제품 등록일', width: 150},
        {field: 'finishedRegUpdate', headerName: '제품 수정일', width: 150},

    ];

    const handleSelectionModelChange = (selection) => {
        setSelectedRows(selection);
        console.log(selection); // 선택한 행 출력

        if (selection.length > 0) {
            // 선택된 행이 있는 경우에만 삭제 알림 창을 엽니다.
            setIsDeleteAlertOpen(true);
            // 선택된 행 중 첫 번째 행의 id를 설정합니다.
            setDeleteRowId(selection[0]);
        } else {
            setIsDeleteAlertOpen(false);
            setDeleteRowId(null);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            console.log('Deleting row with id:', deleteRowId);

            // 서버로 삭제 요청을 보내는 코드
            const response = await fetch(
                `http://localhost:8888/ynfinal/finisheditem/${deleteRowId}`,
                {
                    method: 'DELETE',
                    // 필요한 헤더 등을 추가합니다.
                }
            );
            const data = await response.json();
            console.log('Delete response:', data);
            setIsDeleteAlertOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCancel = () => {
        // 삭제 취소 시 알림 창을 닫습니다.
        setIsDeleteAlertOpen(false);
    };

    return (
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                components={{
                    Pagination: CustomPagination,
                }}
                checkboxSelection={true}
                selectionModel={selectedRows}
                onSelectionModelChange={handleSelectionModelChange}
            />
            {isDeleteAlertOpen && (
                <div className="delete-alert">
                    <div className="delete-alert-message">삭제하시겠습니까?</div>
                    <div className="delete-alert-buttons">
                        <button onClick={handleDeleteConfirm}>확인</button>
                        <button onClick={handleDeleteCancel}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export {OrangeInputforFull, ProductManagementFullTable}

