import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './css/SearchUser.module.css';
import { API_BASE_URL, FINDALL } from '../../config/host-cofig';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const SearchUser = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태를 관리합니다.
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리합니다.

  const API_USERLIST_URL = API_BASE_URL + FINDALL;

  const columns = [
    {
      field: 'empName',
      headerName: '사원이름',
      width: 170,
      editable: false,
    },
    {
      field: 'empId',
      headerName: '사원ID',
      width: 130,
      editable: false,
      align: 'center',
    },
    {
      field: 'deptName',
      headerName: '부서',
      width: 170,
      editable: false,
    },
    {
      field: 'posName',
      headerName: '직급',
      width: 170,
      editable: false,
    },
    {
      field: 'empExtension',
      headerName: '내선번호',
      width: 130,
      editable: false,
      align: 'center',
    },
    {
      field: 'empPhone',
      headerName: '휴대전화',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      align: 'center',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the API endpoint
        const response = await fetch(API_USERLIST_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // Parse the response data as JSON
        const jsonData = await response.json();
        // Update the component's state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // 사원명으로 검색
  const handleSearch = () => {
    const filteredEmp
     = data.filter(user => user.empName.includes(searchQuery));
    setFilteredData(filteredEmp);
  };

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="0">
        <Nav.Item>
          <Nav.Link eventKey="0">사원조회</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className={styles.orangeBoxContainer}>
        <div className={styles.inputArea} style={{ display: 'flex' }}>
          <input
            type="text"
            value={searchQuery}
            placeholder="사원명"
            style={{ height: '50px', marginRight: '5px' }}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button variant="secondary" onClick={handleSearch} style={{ width: '150px', height: '50px', borderColor: 'white' }}>
            검색
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredData.length > 0 ? filteredData : data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooter={true}
            getRowId={row => row.empId}
            style={{ align: 'center' }}
          />
        </Box>
      </div>
    </>
  );
};

export default SearchUser;