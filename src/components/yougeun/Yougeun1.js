import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';

const Yougeun1 = () => {
    const CustomPagination = () => null;



  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
const [modalOpen, setModalOpen] = useState(false);


    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
         // 데이터를 입력한 값으로 표의 값과 일치시킴
            setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === selectedRow.id) {
                return selectedRow;
                }
                return row;
            })
            );

            setSelectedRow(null); // 선택한 행 초기화
            setModalOpen(false); // 모달 창 닫기
      };


      

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
    {
      field: 'highlight',
      headerName: '', // Empty header for the new column
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: params.field === 'trCompName' ? 'blue' : 'transparent',
            width: '100%',
            height: '100%',
          }}
        >
          {params.field === 'trCompName' && params.value}
        </div>
      ),
    },
    { field: 'trCompCode', headerName: 'Company Code', width: 150 },
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
        onRowClick={handleRowClick}
        components={{
            Pagination: CustomPagination,
          }}

      />

<Modal open={modalOpen} onClose={handleCloseModal}>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'rgba(0, 0, 0, 0.5)' }}>
    {selectedRow && (
      <div style={{ background: 'white', padding: '20px' }}>
        <h2>Selected Row</h2>
        <p>Company Code: {selectedRow.trCompCode}</p>
        <p>
          Company Name:
          <input
            type="text"
            value={selectedRow.trCompName}
            onChange={(e) => {
              const updatedValue = e.target.value;
              setSelectedRow((prevRow) => ({
                ...prevRow,
                trCompName: updatedValue,
              }));
            }}
          />
        </p>
        {/* Display other fields of the selected row */}
        <div>
          <h3>Select Company:</h3>
          <ul>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com1' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com1',
                }));
              }}
            >
              Com1
            </li>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com2' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com2',
                }));
              }}
            >
              Com2
            </li>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com3' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com3',
                }));
              }}
            >
              Com3
            </li>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com4' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com4',
                }));
              }}
            >
              Com4
            </li>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com5' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com5',
                }));
              }}
            >
              Com5
            </li>
            <li
              style={{ cursor: 'pointer', textDecoration: selectedRow.trCompName === 'Com6' ? 'underline' : 'none' }}
              onClick={() => {
                setSelectedRow((prevRow) => ({
                  ...prevRow,
                  trCompName: 'Com6',
                }));
              }}
            >
              Com6
            </li>
          </ul>
        </div>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    )}
  </div>
</Modal>
    </div>
  );
};

export default Yougeun1;
