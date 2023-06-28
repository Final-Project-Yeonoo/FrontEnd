
import styles from './css/OrderItem.module.css';
import {TabsforOrderItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import React, {useState} from "react";
import {purchaseOrderData} from "./InputDataforPurchase";
import {Button, Container} from "react-bootstrap";
import OrderItemTable from "./OrderItemTable";
import OrderItemDetailTable from "./OrderItemDetailTable";
import axios from "axios";


function OrderItem() {

    let [title, setTitle] = useState(purchaseOrderData);

    const [inputValues, setInputValues] = useState(title.map(() => ''));

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const handleReset = () => {
        setInputValues(title.map(() => ''));
    };

    const handleSubmit = () => {

        const data = title.map((item, i) => {
            if (item.title === "발주서 번호") {
                return {itemOrderCode: inputValues[i],};
            } else if (item.title === "발주 확정") {
                return {itemOrderCheck: parseInt(inputValues[i])};
            } else if (item.title === "입고예정일") {
                return {itemOrderStart: parseInt(inputValues[i]),};
            } else if (item.title === "마감기한") {
                return {itemOrderEnd: parseInt(inputValues[i]),};
            } else if (item.title === "거래처코드") {
                return {trCompCode: parseInt(inputValues[i]),};
            } else if (item.title === "거래처명") {
                return {trCompName: parseInt(inputValues[i]),};
            } else if (item.title === "사원번호") {
                return {empNo: parseInt(inputValues[i]),};
            } else if (item.title === "등록시간") {
                return {itemOrderReg: parseInt(inputValues[i]),};
            } else if (item.title === "수정시간") {
                return {itemOrderUpdate: parseInt(inputValues[i]),};
            }
        });

        console.log(data)
        const mergedObject = data.reduce((result, currentObject) => {
            return {...result, ...currentObject};

        }, {})
        console.log(mergedObject)

        axios.post('http://localhost:8888/ynfinal/orderitem', mergedObject)
            .then(response => {
                // Handle the response if needed
                console.log(response.mergedObject);
            })
            .catch(error => {
                // Handle errors if any
                console.error(error);
            });
    };

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navRight}>
                        <TabsforOrderItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <Button variant="outline-primary">발주확정</Button>{' '}
                        <Button variant="outline-danger">확정취소</Button>{' '}
                        <Button variant="outline-success">발주마감</Button>{' '}
                        <Button variant="outline-secondary">발주서출력</Button>{' '}
                        <Button variant="outline-primary">조회</Button>{' '}
                        <Button variant="outline-success" onClick={handleSubmit}>저장</Button>{' '}
                        <Button variant="outline-danger">삭제</Button>{' '}
                        <Button variant="outline-secondary" onClick={handleReset}>초기화</Button>{' '}
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
                                                                          style={{width: '150px',}}/>
                                                            <Label for="searchDate"> </Label>
                                                            <Input id="searchDate"
                                                                   name="searchDate"
                                                                   type='date'
                                                                   style={{marginLeft:"10px", width: '280px'}}
                                                                   onChange={(e) => handleInputChange(i, e.target.value)}/>
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
                                                                              value={inputValues[i]}
                                                                              onChange={(e) => handleInputChange(i, e.target.value)}
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

                <Button className={styles.sendPurchaseButton}>입고</Button>

                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>구매발주</div>
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <OrderItemTable/>
                        </Container>
                    </div>
                </section>
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>세부항목</div>
                    <div style={{marginTop: "30px"}}>
                        <Container>
                          <OrderItemDetailTable/>
                        </Container>
                    </div>
                </section>
            </div>

        </>
    );
}


export default OrderItem;