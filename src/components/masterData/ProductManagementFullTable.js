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
        { field: 'finishedName', headerName: '완제품', width: 150 },
        { field: 'finishedCount', headerName: 'lot_size', width: 150 },
        { field: 'finishedRegDate', headerName: '등록일자', width: 150 },
        { field: 'finishedRegUpdate', headerName: '', width: 100 },
        { field: 'finishedPrice', headerName: 'Sell', width: 100 },
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
export default ProductManagementFullTable;

