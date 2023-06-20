import React, {useState} from "react";
import styles from './css/PurchaseItem.module.css';
import {ColorfulButtons, PurcahseButtons, TabsforPurchaseItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import {purchaseItemsData, tableHeadersPurchase} from "./InputDataforPurchase";


function PurchaseItem() {

    let [title, setTitle] = useState(purchaseItemsData);

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navRight}>
                        <TabsforPurchaseItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <PurcahseButtons/>
                        <ColorfulButtons/>
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (
                                    <>
                                        {a.title === '입고일자' &&
                                            (<Form style={{marginBottom: '10px'}} className={styles.searchSection}>
                                                    <Row>
                                                        <Col xs="auto">
                                                            <div style={{display: 'flex'}}>
                                                                <Form.Control readOnly placeholder={title[i].title}
                                                                              style={{width: '150px', marginLeft: "15px"}}/>
                                                                <Label for="searchDate"> </Label>
                                                                <Input id="searchDate"
                                                                       name="searchDate"
                                                                       type='date'
                                                                       style={{marginLeft: "20px", width: '246px'}}/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            )}
                                        {a.content === '선택하세요' &&
                                            (
                                                <Form style={{marginBottom: '10px'}} className={styles.searchSection}>
                                                    <Row>
                                                        <Col xs="auto">
                                                            <div style={{display: 'flex'}}>
                                                                <Form.Control readOnly placeholder={title[i].title}
                                                                              style={{
                                                                                  marginRight: '20px',
                                                                                  width: '150px',
                                                                                  marginLeft: "15px"
                                                                              }}/>
                                                                <Form.Select aria-label="Default select example"
                                                                             style={{width: '246px'}}>
                                                                    <option>선택하세요</option>
                                                                    {a.title === '수불타입' ? (
                                                                            <>
                                                                                <option value="1">일반</option>
                                                                                <option value="2">사급</option>
                                                                                <option value="3">샘플</option>
                                                                            </>
                                                                        ) :
                                                                        (
                                                                            <>
                                                                                <option value="1">유급</option>
                                                                                <option value="2">무급</option>
                                                                            </>
                                                                        )
                                                                    }
                                                                </Form.Select>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>

                                            )}
                                        {a.content === '입력하세요' &&
                                            (
                                                <div key={i} className={styles.searchSection}>
                                                    <Form>
                                                        <Row>
                                                            <div style={{display: 'flex'}}>
                                                                <Col xs="auto">
                                                                    <Form.Control readOnly placeholder={title[i].title}
                                                                                  style={{
                                                                                      marginRight: '10px',
                                                                                      width: '150px'
                                                                                  }}/>
                                                                </Col>
                                                                <Col xs="auto">
                                                                    <Form.Control className="mb-2" id="inlineFormInput"
                                                                                  placeholder={title[i].content}
                                                                    />
                                                                </Col>
                                                            </div>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        )
                    }
                </section>

                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>구매입고</div>
                    <TableExample tableHeaders={tableHeadersPurchase[2]}/>
                </section>
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>세부항목</div>
                    <TableExample tableHeaders={tableHeadersPurchase[3]}/>
                </section>
            </div>

        </>
    );
}

export default PurchaseItem;