import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from "react-bootstrap/Button";
import {API_BASE_URL,ORDERDETAIL} from '../../config/host-cofig';

const OrderItemDetailTable = () => {

    const API_DETAIL_URL = API_BASE_URL + ORDERDETAIL;
    const CustomPagination = () => null;
    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch(API_DETAIL_URL);
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

    // 수정 버튼
    const handleModifyClick = async () => {
        const arrayData = selectedRow
        try {
            const response = await fetch(API_DETAIL_URL, {
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
        const arrayData = selectedRow.itemOrderCode
        try {
            const response = await fetch(API_DETAIL_URL+'/' + arrayData, {
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
                <DataGrid rows={rows} columns={
                    [
                        {field: 'itemOrderCode', headerName: '발주서 번호', width: 150},
                        {field: 'itemOrderDetailCode', headerName: '발주 상세번호', width: 150},
                        {field: 'itemOrderDetailName', headerName: '발주 품목상세명', width: 2000},
                        {field: 'storehouseCode', headerName: '창고 번호', width: 150},
                        {field: 'itemOrderNetPrice', headerName: '가격', width: 100},
                        {field: 'itemOrderDetailCount', headerName: '수량', width: 100},
                        {field: 'taxCode', headerName: '세금10%', width: 100},
                    ]
                }
                          checkboxSelection={true}
                          onRowClick={handleRowClick}
                          getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};
export default OrderItemDetailTable;
