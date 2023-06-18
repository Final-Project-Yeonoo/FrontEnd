import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import React from "react";


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

function StoreButtons() {
    return (
        <>
            <Button variant="outline-primary">창고조회</Button>{' '}
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
            <Nav.Item>
                <Nav.Link eventKey="1">구매입고 라벨발행</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="2">구매입고 내역조회</Nav.Link>
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


function FillExample() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}


export {ColorfulButtons, GrayButtons, FillExample, TabsExample, PillsExample, TabsforStore, TabsforPurchaseItems, StoreButtons}

