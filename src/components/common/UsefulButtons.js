import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import React from "react";


function ColorfulOrderButtons() {
    return (
        <>
            <Button variant="outline-primary">발주확정</Button>{' '}
            <Button variant="outline-danger">확정취소</Button>{' '}
            <Button variant="outline-success">발주마감</Button>{' '}
            <Button variant="outline-secondary">발주서출력</Button>{' '}
        </>
    );
}

function ColorfulButtons() {
    return (
        <>
            <Button variant="outline-primary">조회</Button>{' '}
            <Button variant="outline-success">저장</Button>{' '}
            <Button variant="outline-danger">삭제</Button>{' '}
            <Button variant="outline-secondary">초기화</Button>{' '}
        </>
    );
}

function PurcahseButtons() {
    return (
        <>
            <Button variant="outline-success">입고확정</Button>{' '}
            <Button variant="outline-danger">확정취소</Button>{' '}
        </>
    );
}

function StoreButtons() {
    return (
        <>
            <Button variant="outline-primary" onClick={()=>{
                // 1. 창고조회 버튼을 클릭하면
                // 2. 표아래에 데이터를 뿌려준다.
            }}>창고조회</Button>{' '}
            <Button variant="outline-secondary">초기화</Button>{' '}
        </>
    );
}

function GrayButtons() {
    return (
        <>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">원자재</Button>
                <Button variant="secondary">반제품</Button>
                <Button variant="secondary">제품</Button>
            </ButtonGroup>
        </>
    );
}

function PillsExample() {
    return (
        <Nav variant="pills" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">발주확정</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="1" style={{color:'red'}}>확정취소</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="2">발주서 출력</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="3">발주마감</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="4">프로젝트 코드생성</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

function TabsExample() {

    return (
        <Nav variant="tabs" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">원자재</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="1">반제품</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="2">제품</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}


function TabsforPurchaseItems() {
    return (
        <Nav variant="tabs" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">구매입고 등록</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

function TabsforOrderItems() {
    return (
        <Nav variant="tabs" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">발주 테이블</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}


function TabsforStore() {
    return (
        <Nav variant="tabs" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">창고등록</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}




export {ColorfulButtons, GrayButtons, TabsExample, PillsExample, TabsforStore, TabsforPurchaseItems, StoreButtons, TabsforOrderItems, PurcahseButtons, ColorfulOrderButtons}

