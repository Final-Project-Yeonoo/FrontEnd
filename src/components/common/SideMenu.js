import ListGroup from 'react-bootstrap/ListGroup';
import {useNavigate} from 'react-router-dom'
import {Accordion} from "react-bootstrap";
import React, {useState} from "react";
import styles from './css/SideMenu.module.css';


function SideMenu({addTab}) {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null); // 선택된 탭의 아이디를 저장하는 상태
   
//탭을 선택하거나 해제, 선택한 탭을 탭 목록에 추가한 후 해당 경로로 이동하는 역할
    const handleAccordionItemClick = (path, tabId) => {
        if (activeTab === tabId) {
            setActiveTab(null); // 이미 선택된 탭의 경우 다시 클릭하면 선택 해제
        } else {
            setActiveTab(tabId); // 선택한 탭으로 변경
        }
        addTab(tabId, path);// 탭 추가 함수 호출
        console.log("path는 뭐냐면:", path);
        console.log("tabId는 뭐냐면:", tabId);
        navigate(path); // 해당 경로로 이동
    };

    return (
        <>
            <div className={styles.sideArea}>
                <ListGroup style={{borderRadius: '0'}}>
                    <ListGroup.Item id={styles.profileBox}>
                        <div id={styles.imgCircle}>
                        <img src="/userImg.svg" alt=""/>
                        </div>
                        <span id={styles.userName}>{localStorage.getItem("EMP_NAME")}님</span>
                        <span id={styles.userId}>{localStorage.getItem("EMP_ID")}</span>
                    </ListGroup.Item>
                </ListGroup>
               
                <Accordion defaultActiveKey="0">
                {localStorage.getItem("USER_AUTH")==="Y" ? 
                    <Accordion.Item eventKey="1" style={{borderRadius: '0'}}>
                        <Accordion.Header>사용자 관리</Accordion.Header>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick("/admin/user", "사용자 등록");
                                        }}
                        >
                            사용자 등록
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick("/admin/list", "사용자 정보수정");
                                        }}
                        >
                            사용자 정보수정
                        </Accordion.Body>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        // onClick={() => {navigate('admin/mycom')}}
                                        onClick={() => {
                                            handleAccordionItemClick('admin/mycom', "회사정보 입력");
                                        }}
                        >
                            회사정보 입력
                        </Accordion.Body>
                    </Accordion.Item>
                        : ''
                }
                
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>기준 정보</Accordion.Header>
                        <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        // onClick={() => {navigate('/masterData/info')}}
                                        onClick={() => {
                                            handleAccordionItemClick('/masterData/info', "거래처정보");
                                        }}
                        >
                            거래처정보
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/masterData/info', "기본정보");
                                        }}
                        >
                            기본정보
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/masterData/product', "품목관리")
                                        }}>
                            품목관리
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/masterData/store', "창고정보")
                                        }}>
                            창고정보
                        </Accordion.Body>
                    </Accordion.Item>
                     
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>구매 관리</Accordion.Header>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/purchase/order', "구매 발주관리")
                                        }}>
                            구매 발주관리
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/purchase/buy', "구매 입고관리")
                                        }}>
                            구매 입고관리
                        </Accordion.Body>
                    </Accordion.Item>
                        

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>재고 관리</Accordion.Header>
                        {/*<Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}*/}
                        {/*                onClick={() => {*/}
                        {/*                    handleAccordionItemClick('/inventory/manage', "입고관리")*/}
                        {/*                }}>*/}
                        {/*    입고관리*/}
                        {/*</Accordion.Body>*/}
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/inventory/check', "재고현황")
                                        }}>
                            재고현황
                        </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="5" style={{borderRadius: '0'}}>
                        <Accordion.Header>마이페이지</Accordion.Header>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/mypage', "개인정보 수정")
                                        }}>
                            개인정보 수정
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/admin/search', '사용자 조회')
                                        }}>
                            사용자 조회
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            handleAccordionItemClick('/yougeun', "유근 테스트")
                                        }}>
                            유근 테스트
                        </Accordion.Body>
                        <Accordion.Body style={{color: "darkblue", fontSize: "small", textAlign: "center"}}
                                        onClick={() => {
                                            navigate('/yougeun2')
                                        }}>
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
                        {/* <Accordion.Body style={{color:"darkblue", fontSize:"small", textAlign:"center"}}
                                        onClick={() => {navigate('/yougeun05')}}>
                            자재소요분석
                        </Accordion.Body> */}
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