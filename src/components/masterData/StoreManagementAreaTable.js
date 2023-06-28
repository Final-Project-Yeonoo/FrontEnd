import React, {useRef, useImperativeHandle, forwardRef, useState} from "react";
import "../yougeun/css/yougeun.css";
import {useEffect} from "react";

import {Navigate, useNavigate} from 'react-router-dom'

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import {ReactTabulator} from "react-tabulator";

// 나머지 코드는 이전과 동일
let data = [
    {
        storehouseName: "Storehouse A",
        trStartDate: "2023-06-21T09:30:00",
        trBuy: "N",
        trSell: "N",
        trCompCode: 12345,
        trCompName: "Example Trading Company",
        trCompPhone: "123-456-7890",
        trAddr: "123 Example Street, City",
        trEtc: "Additional information"
    },
    {
        storehouseName: "Storehouse B",
        trStartDate: "2023-06-22T10:00:00",
        trBuy: "Y",
        trSell: "N",
        trCompCode: 67890,
        trCompName: "Another Trading Company",
        trCompPhone: "987-654-3210",
        trAddr: "456 Example Avenue, Town",
        trEtc: "Some notes"
    },
    {
        storehouseName: "Storehouse C",
        trStartDate: "2023-06-23T11:30:00",
        trBuy: "N",
        trSell: "Y",
        trCompCode: 24680,
        trCompName: "ABC Trading",
        trCompPhone: "555-123-4567",
        trAddr: "789 Example Road, Village",
        trEtc: "Additional details"
    },
    {
        storehouseName: "Storehouse D",
        trStartDate: "2023-06-24T13:45:00",
        trBuy: "Y",
        trSell: "Y",
        trCompCode: 13579,
        trCompName: "XYZ Trading",
        trCompPhone: "111-222-3333",
        trAddr: "321 Example Lane, County",
        trEtc: "Extra information"
    },
    {
        storehouseName: "Storehouse E",
        trStartDate: "2023-06-25T15:15:00",
        trBuy: "N",
        trSell: "N",
        trCompCode: 98765,
        trCompName: "Sample Trading",
        trCompPhone: "444-555-6666",
        trAddr: "654 Example Boulevard, Province",
        trEtc: "Additional notes"
    }
];

const editableColumns = [
    {
        title: "구매",
        field: "trBuy",
        width: 150,
        editor: "input",
        //   headerFilter: "input"
    },
    {
        title: "판매",
        field: "trSell",
        width: 150,
        editor: "input",
        //   headerFilter: "input"
    },
    {
        title: "거래처코드",
        field: "trCompCode",
        hozAlign: "left",
        editor: "input"
    },
    {
        title: "거래처명",
        field: "trCompName",
        editor: "input"
    },
    {
        title: "취급품목",
        field: "product",
        editor: "input"
    },
    {
        title: "전화번호",
        field: "trCompPhone",
        editor: "input"
    },
    {
        title: "주소",
        field: "trAddr",
        editor: "input"
    },
    {
        title: "비고",
        field: "trEtc",
        editor: "input",

    }
];

const options = {
    // height: 150,
    layout: "fitData",
    movableRows: true,
    movableColumns: true,
    autoResize: false // 자동 리사이징 비활성화
};


const StoreManagementAreaTable = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const tabulatorRef = useRef(ref);
    const [data, setData] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await fetch('http://localhost:8888/ynfinal/trcomp');
                const data1 = await response.json();
                console.log('받은 데이터:', data1);
                const newData = Object.values(data1); // 받은 데이터를 배열 형태로 변환합니다.
                setData(newData); // 데이터 상태를 업데이트합니다.

                // 데이터에 대한 추가 처리를 수행할 수 있습니다.
            } catch (error) {
                console.error('요청 중 에러 발생:', error);
                // 요청 중에 발생한 에러를 처리할 수 있습니다.
            }
        };
        fetchData();
    }, []);

    const handleSaveData = () => {
        // console.log(data);
        const jsonData = JSON.stringify(data);
        // console.log(jsonData);
        fetch('http://localhost:8888/ynfinal/trcomp', {
            method: 'POST', // 요청 메서드 (POST, GET 등)
            headers: {
                'Content-Type': 'application/json' // 요청 헤더
            },
            body: jsonData // 요청 본문

        })
            .then(response => response.json()) // 응답 데이터를 JSON으로 변환
            .then(responseData => {
                // console.log('응답 받은 데이터:', responseData);
                // 여기서 응답에 대한 추가 처리를 수행할 수 있습니다.
                window.scrollTo(0, 0);
                navigate('/yougeun', {replace: true});
            })
            .catch(error => {
                console.error('요청 중 에러 발생:', error);
                // 요청 중에 발생한 에러를 처리할 수 있습니다.
            });

    };

    useImperativeHandle(ref, () => ({
        table: tabulatorRef.current.table,
    }));

    const rowFormatter = (row) => {
        const rowEl = row.getElement();
        rowEl.style.height = "50px";
        rowEl.style.overflow = "hidden";
        return rowEl;
    };

    return (
        <div className="parent-container">
            <ReactTabulator
                ref={(el) => {
                    tabulatorRef.current = el;
                    if (ref) {
                        ref.current = el;
                    }
                }}
                columns={editableColumns}
                data={data}
                options={options}
                rowFormatter={rowFormatter}
            />
        </div>
    );
});

export default StoreManagementAreaTable;
