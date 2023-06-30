import styles from './css/OrderItem.module.css';
import {TabsforOrderItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import React, {useState} from "react";
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
        
    if(localStorage.getItem('PURCHASE_AUTH') === 'N') {
        alert("권한이 없습니다.");
        return;
      }
        if (inputValue.length === 5 && inputValue.every((value) => value.trim() !== '')) {
            const data = {
                // itemOrderCode: inputValue[0],
                itemOrderCheck: inputValue[0],
                itemOrderStart: inputValue[1],
                itemOrderEnd: inputValue[2],
                trCompCode: inputValue[3],
                empNo: inputValue[4],
            };

            // console.log(data);
            axios
                .post('http://localhost:8888/ynfinal/order', data)
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
                        <Button variant="success" onClick={handleSubmit}>저장</Button>{' '}
                        <Button variant="secondary" onClick={handleReset}>초기화</Button>{' '}
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    <div className={styles.searchSection}>
                        <div className={styles.divideSection} >
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="발주서 번호"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control
                                                placeholder="자동 완성"
                                                className={styles.longInput}
                                                readOnly
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="발주 확정"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Select aria-label="Default select example"
                                                         className={styles.longInput}
                                                         style={{marginLeft: '30px'}}>
                                                <option>선택하세요</option>
                                                <option value="1">발주확정</option>
                                                <option value="2">확정취소</option>
                                                <option value="3">발주마감</option>
                                                value={inputValue[0]}
                                                onChange={(e) => handleInputChange(0, e.target.value)}
                                            </Form.Select>
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="입고 예정일"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Input id="searchDate"
                                                   name="searchDate"
                                                   className={styles.longInput}
                                                   type='date'
                                                   value={inputValue[1]}
                                                   onChange={(e) => handleInputChange(1, e.target.value)}/>
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                        <div className={styles.divideSection} >
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="마감 기한"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Input id="searchDate"
                                                   name="searchDate"
                                                   type='date'
                                                   className={styles.longInput}
                                                   value={inputValue[2]}
                                                   onChange={(e) => handleInputChange(2, e.target.value)}/>
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="거래처 코드"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[3]}
                                                          onChange={(e) => handleInputChange(3, e.target.value)}
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
                                                placeholder="사원번호"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[0]}
                                                          onChange={(e) => handleInputChange(4, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </section>
            </div>

            <Button className={styles.sendPurchaseButton} style={{border:'none'}}>입고</Button>

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