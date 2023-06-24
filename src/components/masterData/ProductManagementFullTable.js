import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProductManagementFullTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/finisheditem');
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
        { field: 'finishedCode', headerName: '완제품 코드', width: 150 },
        { field: 'finishedName', headerName: '완제품 이름', width: 150 },
        { field: 'finishedCount', headerName: '완제품 수량', width: 150 },
        { field: 'finishedPrice', headerName: '완제품 금액', width: 150 },
        { field: 'storehouseCode', headerName: '창고 번호', width: 150 },
        { field: 'empNo', headerName: '사원 번호', width: 150 },
        { field: 'finishedSize', headerName: '규격', width: 150 },
        { field: 'finishedRegDate', headerName: '완제품 등록일', width: 150 },
        { field: 'finishedRegUpdate', headerName: '완제품 수정일', width: 150 },

    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id}
                      components={{
                          Pagination: CustomPagination,
                      }}

            />
        </div>
    );
};
export default ProductManagementFullTable;

