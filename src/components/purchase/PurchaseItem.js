import './css/PurchaseItem.module.css'
import React, {useState} from "react";
import styles from "../masterData/css/ProductManagement.module.css";
import {ColorfulButtons, TabsExample, TabsforPurchaseItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import {purchaseItemsData} from "./InputDataforPurchase";



function PurchaseItem() {

    let [title, setTitle] = useState(purchaseItemsData);

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navLeft}>
                        <TabsforPurchaseItems/>
                    </div>
                    <div className={styles.navRight}>
                        <ColorfulButtons/>
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (

                                    <div key={i} className={styles.searchSection}>
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

export default PurchaseItem;