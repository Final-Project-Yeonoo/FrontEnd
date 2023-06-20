
import styles from './css/OrderItem.module.css';
import {ColorfulButtons, ColorfulOrderButtons, TabsforOrderItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {FormGroup, Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import React, {useState} from "react";
import {purchaseOrderData, tableHeadersPurchase} from "./InputDataforPurchase";
import {Button} from "react-bootstrap";
import {productInputData, tableHeadersProduct} from "../masterData/InputDataforMaster";


function OrderItem() {

    let [title, setTitle] = useState(purchaseOrderData);

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navRight}>
                        <TabsforOrderItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <ColorfulOrderButtons/>
                        <ColorfulButtons/>
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (
                                    <>
                                        {a.content === '선택하세요' ? (
                                            <Form style={{marginBottom: '10px'}} className={styles.searchSection}>
                                                <Row>
                                                    <Col xs="auto">
                                                        <div style={{display: 'flex'}}>
                                                            <Form.Control readOnly placeholder={title[i].title}
                                                                          style={{width: '150px', marginLeft:"15px"}}/>
                                                            <Label for="searchDate"> </Label>
                                                            <Input id="searchDate"
                                                                   name="searchDate"
                                                                   type='date'
                                                                   style={{marginLeft:"20px", width: '246px'}}/>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        ) : (
                                            <div key={i} className={styles.searchSection}>
                                                <Form>
                                                    <Row>
                                                        <div style={{display: 'flex'}}>
                                                            <Col xs="auto">
                                                                <Form.Control readOnly placeholder={title[i].title} style={{
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
                                        )}
                                    </>
                                )
                            }
                        )
                    }
                </section>

                <Button style={{background: 'dimgray', width: '100%', marginBottom:"20px"}}>입고</Button>

                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>구매발주</div>
                    <TableExample tableHeaders={tableHeadersPurchase[0]}/>
                </section>
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>세부항목</div>
                    <TableExample tableHeaders={tableHeadersPurchase[1]}/>
                </section>
            </div>

        </>
    );
}


function TabContent2({tab}) {

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
                        <TableExample tableHeaders={tableHeadersProduct[0]}/>
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
                        <TableExample tableHeaders={tableHeadersProduct[1]}/>
                    </section>
                    c
                </div>
            )}

            {tab === 2 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData} handleTitleChange={handleOrangeInputChange}/>
                    </section>
                    <section className={styles.tableArea}>
                        <TableExample tableHeaders={tableHeadersProduct[2]}/>
                    </section>
                </div>
            )}
        </div>
    );
}

export default OrderItem;