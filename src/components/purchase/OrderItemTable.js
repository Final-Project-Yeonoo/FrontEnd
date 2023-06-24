import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const OrderItemTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/trcomp');
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
        { field: 'itemOrderCode', headerName: '발주서 번호', width: 150 },
        { field: 'itemOrderCheck', headerName: '발주 확정', width: 150 },
        { field: 'itemOrderStart', headerName: '입고예정일', width: 150 },
        { field: 'itemOrderEnd', headerName: '마감기한', width: 150 },
        { field: 'trCompCode', headerName: '거래처코드', width: 150 },
        { field: 'trCompName', headerName: '거래처명', width: 150 },
        { field: 'empNo', headerName: '사원번호', width: 150 },
        { field: 'itemOrderReg', headerName: '등록시간', width: 150 },
        { field: 'itemOrderUpdate', headerName: '수정시간', width: 150 },
    ];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                      components={{
                          Pagination: CustomPagination,
                      }}

            />
        </div>
    );
};
export default OrderItemTable;


