import './css/StoreManagement.module.css'
import React, {useState} from "react";
import styles from "./css/ProductManagement.module.css";
import {StoreButtons, TabsforStore} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import {storeInputData} from "./InputDataforMaster";
import {Button} from "react-bootstrap";

function StoreManagement() {

    let [title, setTitle] = useState(storeInputData);

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

                                    <div key={i} className={styles.searchSection}>
                                        {/*<InputType/> 원래는 컴포넌트 호출하려고 했으나 자식의 자식으로 props 전달해야하는 불편함 있음*/}
                                        <Form>
                                            <Row>
                                                <div style={{display: 'flex'}}>
                                                    <Col xs="auto">
                                                        <Form.Control readOnly placeholder={title[i].title} style={{marginRight: '10px', width: '150px'}}/>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Form.Control className="mb-2" id="inlineFormInput" placeholder={title[i].content}/>
                                                    </Col>
                                                </div>
                                            </Row>
                                        </Form>
                                    </div>

                                )
                            }
                        )
                    }
                </section>

                <section className={styles.tableArea}>
                    <TableExample/>
                </section>
            </div>
        </>
    );
}

export default StoreManagement;