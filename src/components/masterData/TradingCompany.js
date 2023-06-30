import styles from './css/TradingCompany.module.css'
import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import {DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {API_BASE_URL, TRADING} from "../../config/host-cofig";
import Modal from "./trModal"; // 모달 컴포넌트를 import 합니다.
import Nav from "react-bootstrap/Nav"; // 모달 컴포넌트를 import 합니다.


function TradingCompany() {

    const API_TRC_URL = API_BASE_URL + TRADING;
    const [companyData, setCompanyData] = useState({});

    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터를 관리합니다.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태를 관리합니다.


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send a GET request to the API endpoint
                const response = await fetch(API_TRC_URL);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Parse the response data as JSON
                const jsonData = await response.json();
                console.log("데이터형식 : ", jsonData);
                // Update the component's state with the fetched data
                setCompanyData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const columns = [
        {
            field: 'trCompCode',
            headerName: '거래처코드',
            width: 150,
            editable: true,
        },
        {
            field: 'trCompName',
            headerName: '거래처명',
            width: 130,
            editable: true,
        },
        {
            field: 'trCompPhone',
            headerName: '전화번호',
            width: 180,
            editable: true,
        },
        {
            field: 'trAddr',
            headerName: '거래처주소',
            width: 160,
            editable: true,
        },
        {
            field: 'trEtc',
            headerName: '비고',
            width: 180,
            editable: true,
        },
        {
            field: 'trRegDate',
            headerName: '거래처 등록일',
            width: '150',
            editable: false

        },
        {
            field: 'trStartDate',
            headerName: '거래 시작일',
            width: '150',
            editable: true

        }
    ];


    console.log(companyData);

    const handleSearch = () => {
        const filteredCompanies = companyData.filter(company =>
            company.trCompName.includes(searchQuery) // 거래처명을 검색어로 포함하는 데이터를 필터링합니다.
        );
        setFilteredData(filteredCompanies);
    };

    const toggleModal = () => {
        if(localStorage.getItem('INFO_AUTH') === 'N') {
            alert("권한이 없습니다.");
            return;
          }
      
        setIsModalOpen(!isModalOpen);
    };

    const handleAddCompany = async (newCompanyData) => {
        
      setCompanyData(prevData => [...prevData,newCompanyData])
      
        toggleModal();

    };

    //row 선택해서 지우기 
    const [selectedRow, setSelectedRow] = useState(null); // 선택된 row의 정보를 관리합니다.
    const handleRowClick = (params) => {
        // 클릭한 row의 정보를 가져옵니다.
        const selectedRowData = params.row;
        // 필요한 처리를 수행합니다.
        console.log("선택된 row의 정보:", selectedRowData);
        setSelectedRow(selectedRowData);
    };

    const remove = async () => {
        if(localStorage.getItem('INFO_AUTH') === 'N') {
            alert("권한이 없습니다.");
            return;
          }
      
        console.log('확인', selectedRow);
        const ArraySelectedRow = [selectedRow.trCompCode]
        try {
            const response = await fetch(API_TRC_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ArraySelectedRow),
            });
            console.log('1111', ArraySelectedRow);
            if (!response.ok) {
                throw new Error("Failed to save company data");
            }
        } catch (error) {
            console.error("Error saving company data:", error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                {/*<div className={styles.headerContainer}>*/}
                <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Item>
                        <Nav.Link eventKey="0">거래처 관리</Nav.Link>
                    </Nav.Item>
                </Nav>

                <div className={styles.orangeBoxContainer}>
                    <div className={styles.inputArea} style={{display:'flex'}}>
                        <input
                            type="text"
                            value={searchQuery}
                            style={{height: '50px', marginRight:'5px'}}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <Button variant="secondary" onClick={handleSearch} style={{width:'150px', height:'50px'}}>검색</Button>
                    </div>
                    <div className={styles.clickModal}>
                        <Button variant="success" onClick={toggleModal} className={styles.insertTag}>거래처 입력</Button>
                        <Button variant="danger" onClick={remove}>삭제</Button>
                    </div>
                </div>
            </div>
            {/*</div>*/}
            <div className={styles.usercontainer}>
                <div className={styles.container}>
                    <Box sx={{height: 600, width: '100%'}}>
                        <DataGrid
                            rows={companyData}
                            columns={columns}
                            // disableRowSelectionOnClick
                            onRowClick={handleRowClick}
                            getRowId={(row) => row.trCompName}
                            hideFooter={true}

                        />
                    </Box>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={toggleModal} onAddCompany={handleAddCompany}/>
            )}

        </>
    );
}

export default TradingCompany;
