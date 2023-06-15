import ListGroup from 'react-bootstrap/ListGroup';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import {Accordion} from "react-bootstrap";
import React from "react";
import styles from './css/SideMenu.module.css';


function SideMenu() {

    let navigate = useNavigate()

    return (
        <>
            <div className={styles.sideArea}>
                <ListGroup style={{ borderRadius: '0' }}>
                    <ListGroup.Item id={styles.profileBox}>
                        <div id={styles.imgCircle}>
                            <img src="/userImg.svg" alt=""/>
                        </div>
                        <span id={styles.userName} >관리자님</span>
                        <span id={styles.userId}>admin1234</span>
                    </ListGroup.Item>
                </ListGroup>

            <Accordion defaultActiveKey="0" className={styles.sideAccordion}>
                    <Accordion.Item eventKey="1"  style={{ borderRadius: '0' }} >
                        <Accordion.Header>사용자 관리</Accordion.Header>
                        <Accordion.Body className={`${styles.customAccordionBody}`}
                                        onClick={() => {navigate('/admin/user')}}>
                            개인정보관리
                        </Accordion.Body>
                        <Accordion.Body className={`${styles.customAccordionBody}`}
                                        onClick={() => {navigate('/admin/manage')}}>
                            권한관리
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>기준 정보</Accordion.Header>
                        <Accordion.Body onClick={() => {navigate('/masterData/info')}}>
                            기본정보
                        </Accordion.Body>
                        <Accordion.Body onClick={() => {navigate('/masterData/product')}}>
                            품목관리
                        </Accordion.Body>
                        <Accordion.Body onClick={() => {navigate('/masterData/store')}}>
                            창고정보
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>구매 관리</Accordion.Header>
                        <Accordion.Body onClick={() => {navigate('/purchase/order')}}>
                            구매 발주 관리
                        </Accordion.Body>
                        <Accordion.Body onClick={() => {navigate('/purchase/buy')}}>
                            구매 입고관리
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>재고 관리</Accordion.Header>
                        <Accordion.Body>
                            입고관리
                        </Accordion.Body>
                        <Accordion.Body>
                            출고관리
                        </Accordion.Body>
                        <Accordion.Body>
                            재고현황
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5" style={{ borderRadius: '0' }}>
                        <Accordion.Header>마이페이지</Accordion.Header>
                        <Accordion.Body>
                            마이페이지 수정
                        </Accordion.Body>
                        <Accordion.Body>
                            빈칸
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}

export default SideMenu;