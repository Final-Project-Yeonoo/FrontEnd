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

    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (index, value) => {
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);
    };

    // 초기화  버튼 선택시
    const handleReset = () => {
        const newInputValue = inputValue.map(() => "");
        setInputValue(newInputValue);
    };

    // 저장 버튼 선택시
    const handleSubmit = () => {
        if (inputValue.length === 2 && inputValue.every((value) => value.trim() !== '')) {
            const data = {
                // rawCode: inputValue[0],
                rawName: inputValue[0],
                rawType: inputValue[1]
            };

            // console.log(data);
            axios
                .post('http://localhost:8888/ynfinal/rawitem', data)
                .then(response => {
                    // const {rawCode} = response.data;
                    console.log(response.data);

                })
                .catch(error => {
                    console.error('실패함', error);
                });
        } else {
            alert('항목을 모두 입력해야 합니다.');
        }
    };


    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navRight}>
                        <TabsforOrderItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <Button variant="outline-primary">조회</Button>{' '}
                        <Button variant="outline-success" onClick={handleSubmit}>저장</Button>{' '}
                        <Button variant="outline-danger">삭제</Button>{' '}
                        <Button variant="outline-secondary" onClick={handleReset}>초기화</Button>{' '}
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    <Form>
                        <Row>
                            <div style={{display: 'flex'}}>
                                <Col xs="auto">
                                    <Form.Control
                                        readOnly
                                        placeholder="발주서 번호"
                                        style={{
                                            marginRight: '10px',
                                            width: '150px'
                                        }}/>
                                </Col>
                                <Col xs="auto">
                                    <Form.Control className="mb-2" id="inlineFormInput"
                                                  placeholder="입력하세요"
                                                  value={inputValue}
                                                  onChange={(e) => handleInputChange(e.target.value)}
                                    />
                                </Col>
                            </div>
                        </Row>
                    </Form>
                    <Form>
                        <Row>
                            <div style={{display: 'flex'}}>
                                <Col xs="auto">
                                    <Form.Control
                                        readOnly
                                        placeholder="발주 확정"
                                        style={{
                                            marginRight: '10px',
                                            width: '150px'
                                        }}/>
                                </Col>
                                <Col xs="auto">
                                    <Form.Select aria-label="Default select example">
                                        <option>선택하세요</option>
                                            <option value="1">발주확정</option>
                                            <option value="2">확정취소</option>
                                            <option value="3">발주마감</option>
                                    </Form.Select>
                                </Col>
                            </div>
                        </Row>
                    </Form>
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <div style={{display: 'flex'}}>
                                    <Form.Control readOnly
                                                  placeholder="입고 예정일"
                                                  style={{width: '150px',}}/>
                                    <Label for="searchDate"> </Label>
                                    <Input id="searchDate"
                                           name="searchDate"
                                           type='date'
                                           style={{width: '280px'}}
                                           onChange={(e) => handleInputChange(e.target.value)}/>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <div style={{display: 'flex'}}>
                                    <Form.Control readOnly
                                                  placeholder="마감 기한"
                                                  style={{width: '150px',}}/>
                                    <Label for="searchDate"> </Label>
                                    <Input id="searchDate"
                                           name="searchDate"
                                           type='date'
                                           style={{width: '280px'}}
                                           onChange={(e) => handleInputChange(e.target.value)}/>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Form>
                        <Row>
                            <div style={{display: 'flex'}}>
                                <Col xs="auto">
                                    <Form.Control
                                        readOnly
                                        placeholder="거래처 코드"
                                        style={{
                                            marginRight: '10px',
                                            width: '150px'
                                        }}/>
                                </Col>
                                <Col xs="auto">
                                    <Form.Control className="mb-2" id="inlineFormInput"
                                                  placeholder="입력하세요"
                                                  value={inputValue}
                                                  onChange={(e) => handleInputChange(e.target.value)}
                                    />
                                </Col>
                            </div>
                        </Row>
                    </Form>
                    <Form>
                        <Row>
                            <div style={{display: 'flex'}}>
                                <Col xs="auto">
                                    <Form.Control
                                        readOnly
                                        placeholder="비고"
                                        style={{
                                            marginRight: '10px',
                                            width: '150px'
                                        }}/>
                                </Col>
                                <Col xs="auto">
                                    <Form.Control className="mb-2" id="inlineFormInput"
                                                  placeholder="입력하세요"
                                                  value={inputValue}
                                                  onChange={(e) => handleInputChange(e.target.value)}
                                    />
                                </Col>
                            </div>
                        </Row>
                    </Form>
                </section>
            </div>

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

        </>
    );
}


export default OrderItem;