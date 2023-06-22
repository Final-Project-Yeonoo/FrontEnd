import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Yougeun1 = () => {
    const CustomPagination = () => null;



  const [rows, setRows] = useState([]);
  const handleValueChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });

    setRows(updatedRows);
  };
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
    { field: 'trCompCode', headerName: 'Company Code', width: 150,  },
    { field: 'trCompName', headerName: 'Company Name', width: 150, editable: true },
    { field: 'trCompPhone', headerName: 'Company Phone', width: 150, editable: true },
    {
        field: 'trBuy',
        headerName: 'Buy',
        width: 100,
        editable: true,
        renderCell: (params) => (
          <select
            value={params.value}
            onChange={(e) => handleValueChange(params.id, params.field, e.target.value)}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
        ),
      },
      {
        field: 'trSell',
        headerName: 'Sell',
        width: 100,
        editable: true,
        renderCell: (params) => (
          <select
            value={params.value}
            onChange={(e) => handleValueChange(params.id, params.field, e.target.value)}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
        ),
      },
    { field: 'trStartDate', headerName: 'Start Date', width: 150 },
    { field: 'trAddr', headerName: 'Address', width: 200 },
    { field: 'storehouseName', headerName: 'Storehouse', width: 150 },
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

export default Yougeun1;
