import React, {useState} from "react";
import styles from './css/ProductManagement.module.css'
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {ColorfulButtons} from "../common/UsefulButtons";
import {TableExample} from "../common/UsefulTables";
import {productInputData, storeInputData, tableHeadersProduct} from "./InputDataforMaster";
import Nav from "react-bootstrap/Nav";


function ProductManagement() {

    return (
        <>
            <div className={styles.searchTabs}>
                <ColorfulButtons/>
            </div>

            <section className={styles.navLeft}>
                <TabforPurchase/>
            </section>

        </>
    );
}

// 탭
function TabforPurchase() {

    let [tab, setTab] = useState(0)

    return (
        <>
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
        </>
    )
        ;
}

// 탭(0, 1, 2)선택시 나오는 오렌지표와 테이블
function TabContent({tab}) {

    const headers1 = tableHeadersProduct[0];
    const headers2 = tableHeadersProduct[1];
    const headers3 = tableHeadersProduct[2];

    const handleOrangeInputChange = (i, value) => {
        const updatedInputData = [...orangeInputData]; // orangeInputData 배열을 복사하여 새로운 배열 생성
        updatedInputData[updatedInputData.length - 1].title = value; // 마지막 객체의 title 값을 업데이트
        orangeInputData = updatedInputData;
    };

    let orangeInputData;
    if (tab === 0) {
        orangeInputData = productInputData; // 원자재 박스에는 productInputData를 그대로 할당
    } else if (tab === 1) {
        orangeInputData = productInputData.slice(0, - 1);
        // 제품 박스에는 productInputData의 마지막 object를 제거하여 할당
    } else if (tab === 2) {
        orangeInputData = [...productInputData];
        orangeInputData[orangeInputData.length - 1].title = "규격";
    }

    return (
        <div>
            {tab === 0 && (
                <div>
                    원자재 박스
                    <section className={styles.searchBox} style={{ marginBottom: '30px' }}>
                        <OrangeInput title={orangeInputData} handleTitleChange={() => {}} />
                    </section>
                    <section className={styles.tableArea}>
                        <TableExample tableHeaders={headers1}/>
                    </section>
                </div>
            )}

            {tab === 1 && (
                <div>
                    반제품 박스
                    <section className={styles.searchBox} style={{ marginBottom: '30px' }}>
                        <OrangeInput title={orangeInputData} handleTitleChange={() => {}} />
                    </section>
                    <section className={styles.tableArea}>
                        <TableExample tableHeaders={headers2}/>
                    </section>c
                </div>
            )}

            {tab === 2 && (
                <div>
                    제품 박스
                    <section className={styles.searchBox} style={{ marginBottom: '30px' }}>
                        <OrangeInput title={orangeInputData} handleTitleChange={handleOrangeInputChange} />
                    </section>
                    <section className={styles.tableArea}>
                        <TableExample tableHeaders={headers3}/>
                    </section>
                </div>
            )}
        </div>
    );
}

// 오렌지 표의 형식과 정의
function OrangeInput({ title, handleTitleChange }) {

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

