import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PurchaseItemTable = () => {
    const CustomPagination = () => null;



    const [rows, setRows] = useState([]);

    const fetchGridData = async () => {
        try {
            const response = await fetch('http://localhost:8888/ynfinal/inputproduct');
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
        { field: 'inputProductCode', headerName: "입고번호", width: 150 },
        { field: 'trCompName', headerName: "입고유형", width: 150 },
        { field: 'inputProductDate', headerName: "입고일자", width: 150 },
        // { field: 'projectCode', headerName: "프로젝트 코드", width: 200 },
        // { field: 'projectName', headerName: "프로젝트명", width: 200 },
        // { field: 'payMode', headerName: "무상여부", width: 150 },
        // { field: 'payType', headerName: "수불타입", width: 150 },
        { field: 'itemOrderCode', headerName: "발주번호", width: 150 },
        { field: 'companyCode', headerName: "거래처코드", width: 150 },
        { field: 'storehouseCode', headerName: "창고번호", width: 150 },
        { field: 'companyName', headerName: "거래처명", width: 150 },
        // { field: 'comment', headerName: "비고", width: 150 },
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
export default PurchaseItemTable;

