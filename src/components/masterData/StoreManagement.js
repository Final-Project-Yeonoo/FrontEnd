import './css/StoreManagement.module.css'
import React, {useState} from "react";
import styles from "./css/ProductManagement.module.css";
import {StoreButtons, TabsforStore} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import {productInputData, storeInputData, tableHeadersProduct} from "./InputDataforMaster";


function StoreManagement() {

    let [title, setTitle] = useState(storeInputData);

    const headers4 = tableHeadersProduct[3];

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navLeft}>
                        <TabsforStore/>
                    </div>
                    <div className={styles.navRight}>
                        <StoreButtons/>
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (
                                    <>
                                    {a.title === '창고구분' ? (
                                        <Form style={{marginBottom: '10px'}}>
                                            <Row>
                                                <Col xs="auto">
                                                    <div style={{display: 'flex'}}>
                                                        <Form.Control readOnly placeholder={title[i].title}
                                                                      style={{marginRight: '10px', width: '150px'}}/>
                                                        <Form.Select aria-label="Default select example">
                                                            <option>창고를 선택하세요</option>
                                                            <option value="1">제품창고</option>
                                                            <option value="2">반제품창고</option>
                                                            <option value="3">자재창고</option>
                                                            <option value="4">일반창고</option>
                                                            <option value="5">설비창고</option>
                                                            <option value="6">금형창고</option>
                                                            <option value="7">기타창고</option>
                                                            <option value="8">자동차감창고</option>
                                                            <option value="9">외주출고창고</option>
                                                        </Form.Select>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    ): (
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
                                ) }
                                    </>
                                )
                            }
                        )
                    }
                </section>

                <section className={styles.tableArea}>
                    <TableExample tableHeaders={headers4}/>
                </section>
            </div>
        </>
    );
}

export default StoreManagement;