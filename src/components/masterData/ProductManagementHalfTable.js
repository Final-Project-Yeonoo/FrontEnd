import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProductManagementHalfTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/halfitem');
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
        { field: 'halfCode', headerName: '반제품 코드', width: 150 },
        { field: 'halfName', headerName: '반제품 이름', width: 150 },
        { field: 'halfCount', headerName: '수량', width: 150 },
        { field: 'halfRegDate', headerName: ' 반제품 등록일', width: 150 },
        { field: 'halfRegUpdate', headerName: ' 반제품 수정일', width: 150 },
        { field: 'halfPrice', headerName: '반제품 금액', width: 150 },
        { field: 'storehouseCode', headerName: '창고 번호', width: 150 },
        { field: 'empNo', headerName: '사원 번호', width: 150 },
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
export default ProductManagementHalfTable;

