import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StoreManagementTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/store');
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
        { field: 'storehouseType', headerName: '창고타입', width: 150 },
        { field: 'storehouseCode', headerName: '창고코드', width: 150 },
        { field: 'storehouseName', headerName: '창고명', width: 150 },
        { field: 'storehouseStartDate', headerName: '창고 등록일', width: 150 },
        { field: 'storehouseAddr', headerName: '창고 주소', width: 150 },
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
export default StoreManagementTable;
