import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ProductManagementRawTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/rawitem');
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
        { field: 'rawCode', headerName: '원자재코드', width: 150 },
        { field: 'rawName', headerName: '원자재명', width: 150 },
        { field: 'rawCount', headerName: '원자재 수량', width: 150 },
        { field: 'rawPrice', headerName: '원자재 가격', width: 150 },
        { field: 'rawType', headerName: '유형', width: 150 },
        { field: 'rawRegDate', headerName: '원자재 등록일', width: 150 },
        { field: 'rawRegUpdate', headerName: '원자재 수정일', width: 150 },
        { field: 'rawPrice', headerName: '원자재 금액', width: 150 },
        { field: 'storehouseCode', headerName: '창고 번호', width: 150 },
        { field: 'empNo', headerName: '사원 번호', width: 150 },
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
export default ProductManagementRawTable;

