import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "react-bootstrap/Button";

const OrderItemTable = () => {
    const CustomPagination = () => null;
    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/itemorder');
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


    // 행 선택
    const [selectedRow, setSelectedRow] = useState(null);
    const handleRowClick = (params) => {

        const selectedRowData = params.row;

        console.log("선택된 row의 정보:", selectedRowData);

        setSelectedRow(selectedRowData);
    };

    //체크 박스 선택


    // 수정 버튼
    // const gridRef = useRef(null);

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
            console.log('선택정보 수정확인', arrayData);

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
        const arrayData = selectedRow.rawCode
        try {
            const response = await fetch('http://localhost:8888/ynfinal/rawitem/' + `${arrayData}`, {
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
                <DataGrid rows={rows} columns={[
                    {field: 'itemOrderCode', headerName: '발주서 번호', width: 150},
                    {field: 'itemOrderCheck', headerName: '발주 확정', width: 150},
                    {field: 'itemOrderStart', headerName: '입고예정일', width: 150},
                    {field: 'itemOrderEnd', headerName: '마감기한', width: 150},
                    {field: 'trCompCode', headerName: '거래처코드', width: 150},
                    {field: 'empNo', headerName: '사원번호', width: 150},
                    {field: 'itemOrderReg', headerName: '등록시간', width: 150},
                    {field: 'itemOrderUpdate', headerName: '수정시간', width: 150},
                ]}
                          checkboxSelection={true}
                          onRowClick={handleRowClick}
                          getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};
export default OrderItemTable;


