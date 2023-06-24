import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const OrderItemDetailTable = () => {
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
        { field: 'itemOrderDetailCode', headerName: '발주 상세번호', width: 150 },
        { field: 'itemOrderDetailName', headerName: '발주 품목상세명', width: 150 },
        { field: 'itemOrderNetPrice', headerName: '가격', width: 150 },
        { field: 'itemOrderDetailCount', headerName: '수량', width: 100 },
        { field: 'taxCode', headerName: '세금10%', width: 100 },
        { field: 'itemOrderCode', headerName: '발주서 번호', width: 150 },
        { field: 'storehouseCode', headerName: '창고 번호', width: 200 },
        { field: 'comment', headerName: '비고', width: 150 },
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
export default OrderItemDetailTable;
