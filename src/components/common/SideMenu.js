import ListGroup from 'react-bootstrap/ListGroup';
import './scss/sideMenu.scss';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import {Accordion} from "react-bootstrap";
import React from "react";


function SideMenu() {

    let navigate = useNavigate()

    return (
        <>
                <ListGroup className="col-lg-2" className="sideList" style={{ borderRadius: '0' }}>
                    <ListGroup.Item id="userProfileBox">
                        <div className="imgCircle">
                            <img src="/userImg.svg" alt=""/>
                        </div>
                        <span id="userName">관리자님</span>
                        <span id="userId">admin1234</span>
                    </ListGroup.Item>
                </ListGroup>

                {/*
                     2. 하단의 메뉴 버튼 클릭시 navigate로 이동한다.
                     3. user/acccount user/search 같은 페이지 전환은 nestedNavigate 사용한다*/}

                <Accordion defaultActiveKey="0" className="sideAccordion">
                    <Accordion.Item eventKey="1"  style={{ borderRadius: '0' }} >
                        <Accordion.Header>사용자 관리</Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            개인정보관리
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            권한관리
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>기준 정보</Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            기본정보
                            {/*<div style={{textAlign:'right'}}>회사정보</div>*/}
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            품목관리
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            창고정보
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>구매 관리</Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            구매 발주 관리
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            구매 입고관리
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>재고 관리</Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            입고관리
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            출고관리
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            재고현황
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5" style={{ borderRadius: '0' }}>
                        <Accordion.Header>마이페이지</Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            마이페이지 수정
                        </Accordion.Body>
                        <Accordion.Body className="custom-accordion-body">
                            2
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        </>
    );
}

export default SideMenu;