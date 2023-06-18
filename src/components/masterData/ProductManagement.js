import React, {useState} from "react";
import styles from './css/ProductManagement.module.css'
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {ColorfulButtons, TabsExample} from "../common/UsefulButtons";
import {TableExample} from "../common/UsefulTables";
import {productInputData} from "./InputDataforMaster";
import Nav from "react-bootstrap/Nav";


function ProductManagement() {

    return (
        <>
                <div className={styles.searchTabs} >
                    <ColorfulButtons/>
                </div>

                <section className={styles.navLeft}>
                    <TabforPurchase/>
                </section>

        </>
    );
}


function TabforPurchase() {

    let [tab, setTab] = useState(0)

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="0">
                <Nav.Item>
                    <Nav.Link eventKey="0" onClick={() => {
                        setTab(0)}}>원자재</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1" onClick={() => {
                        setTab(1)}}>반제품</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" onClick={() => {
                        setTab(2)}}>제품</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab}/>
        </>
    )
        ;
}

// 탭선택시 나오는 오렌지표와 테이블
function TabContent({tab}) {
    return [
        <div>원자재 박스
            < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                <OrangeInput/>
            </section>
            <section className={styles.tableArea}>
                <TableExample/>
            </section>
        </div>,
        <div>반제품 박스
            < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                <OrangeInput/>
            </section>
            <section className={styles.tableArea}>
                <TableExample/>
            </section>
        </div>,
        <div>제품 박스
            < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                <OrangeInput/>
            </section>
            <section className={styles.tableArea}>
                <TableExample/>
            </section>
        </div>][tab]
}

// 오렌지 표의 형식과 정의
function OrangeInput() {
    // productInputData={productInputData.slice(0, productInputData.length - 1)}
    let [title, setTitle] = useState(productInputData);
    return (
        title.map((a, i) => {
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
                                                      placeholder={title[i].content}/>
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

