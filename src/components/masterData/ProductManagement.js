import React, {useState} from "react";
import styles from './css/ProductManagement.module.css'
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {productInputData} from "./InputDataforMaster";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ProductManagementRawTable from "./ProductManagementRawTable";
import ProductManagementHalfTable from "./ProductManagementhalfTable";
import ProductManagementFullTable from "./ProductManagementFullTable";
import axios from "axios";


function ProductManagement() {

    let [tab, setTab] = useState(0)

    return (
        <>

            <div className={styles.navRight}>
                {/*<ColorfulButtons/>*/}
                <Button variant="outline-primary" onClick={()=>{}}>조회</Button>{' '}
                <Button variant="outline-success" onClick={() => {
                    axios.post('http://localhost:8888/ynfinal/rawitem', { params: {  } })
                        .then((response) => {
                            console.log('성공함', response.data);
                        })
                        .catch(() => {
                            console.log('실패함');
                        });
                }}>저장</Button>{' '}
                <Button variant="outline-danger" onClick={()=>{}}>삭제</Button>{' '}
                <Button variant="outline-secondary" onClick={()=>{}}>초기화</Button>{' '}
            </div>

            <section className={styles.navLeft}>
                {/*<TabforProduct/>*/}
                <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Item>
                        <Nav.Link eventKey="0" onClick={() => {
                            setTab(0)
                        }}>원자재</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="1" onClick={() => {
                            setTab(1)
                        }}>반제품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" onClick={() => {
                            setTab(2)
                        }}>제품</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent tab={tab}/>
            </section>

        </>
    );
}

// 탭(0, 1, 2)선택시 나오는 오렌지표와 테이블
function TabContent({tab}) {

    const handleOrangeInputChange = (i, value) => {
        const updatedInputData = [...orangeInputData]; // orangeInputData 배열을 복사하여 새로운 배열 생성
        updatedInputData[updatedInputData.length - 1].title = value; // 마지막 객체의 title 값을 업데이트
        orangeInputData = updatedInputData;
    };

    let orangeInputData;
    if (tab === 0) {
        orangeInputData = productInputData; // 원자재 박스에는 productInputData를 그대로 할당
    } else if (tab === 1) {
        orangeInputData = productInputData.slice(0, -1);
        // 제품 박스에는 productInputData의 마지막 object를 제거하여 할당
    } else if (tab === 2) {
        orangeInputData = [...productInputData];
        orangeInputData[orangeInputData.length - 1].title = "규격";
    }

    return (
        <div>
            {tab === 0 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData} handleTitleChange={() => {
                        }}/>
                    </section>
                    <section className={styles.tableArea}>
                        {/*<TableExample tableHeaders={tableHeadersProduct[0]}/>*/}
                        <ProductManagementRawTable/>
                    </section>
                </div>
            )}

            {tab === 1 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData} handleTitleChange={() => {
                        }}/>
                    </section>
                    <section className={styles.tableArea}>
                        {/*<TableExample tableHeaders={tableHeadersProduct[1]}/>*/}
                        <ProductManagementHalfTable/>
                    </section>
                </div>
            )}

            {tab === 2 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData} handleTitleChange={handleOrangeInputChange}/>
                    </section>
                    <section className={styles.tableArea}>
                        {/*<TableExample tableHeaders={tableHeadersProduct[2]}/>*/}
                        <ProductManagementFullTable/>
                    </section>
                </div>
            )}
        </div>
    );
}


// 오렌지 표의 형식과 정의
function OrangeInput({
                         title, handleTitleChange
                     }) {

    return (

        title.map((item, i) => {
                return (

                    <div key={i} className={styles.searchSection}>
                        <Form>
                            <Row>
                                <div style={{display: 'flex'}}>
                                    <Col xs="auto">
                                        <Form.Control readOnly placeholder={title[i].title}
                                                      style={{marginRight: '10px', width: '150px'}}/>
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control className="mb-2" id="inlineFormInput"
                                                      placeholder={title[i].content}
                                                      onChange={(e) => handleTitleChange(i, e.target.value)}
                                        />
                                    </Col>
                                </div>
                            </Row>
                        </Form>
                    </div>

                )
            }
        )
    );
}


export default ProductManagement;

