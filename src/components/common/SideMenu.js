import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from 'react-router-dom'
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

            <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1"  style={{ borderRadius: '0' }} >
                        <Accordion.Header>사용자 관리</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/admin/user')}}>
                            사용자 등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/admin/list')}}>
                            사용자 정보수정
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>기준 정보</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/masterData/info')}}>
                            기본정보
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/masterData/product')}}>
                            품목관리
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/masterData/store')}}>
                            창고정보
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>구매 관리</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/purchase/order')}}>
                            구매 발주관리
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/purchase/buy')}}>
                            구매 입고관리
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>재고 관리</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/inventory/manage')}}>
                            입고관리
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/inventory/check')}}>
                            재고현황
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5" style={{ borderRadius: '0' }}>
                        <Accordion.Header>마이페이지</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/mypage')}}>
                            개인정보 수정
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/admin/search')}}>
                            사용자 조회
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun')}}>
                            유근 테스트
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun2')}}>
                            유근 테스트2
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6" style={{ borderRadius: '0' }}>
                        <Accordion.Header>유근 작업중</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun01')}}>
                            프로젝트 등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun02')}}>
                            견적서 등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun03')}}>
                            수주서 관리
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun04')}}>
                            작업지시
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun05')}}>
                            자재소요분석
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun06')}}>
                            구매발주
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun07')}}>
                            구매입고등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun08')}}>
                            실적등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun09')}}>
                            납품등록
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun10')}}>
                            반품등록
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}

export default SideMenu;