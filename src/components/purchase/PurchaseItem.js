import React, {useState} from "react";
import styles from './css/PurchaseItem.module.css';
import {TabsforPurchaseItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {purchaseItemsData, tableHeadersPurchase} from "./InputDataforPurchase";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import PurchaseItemTable from "./PurchaseItemTable";
import axios from "axios";




function PurchaseItem() {

    let [title, setTitle] = useState(purchaseItemsData);

    const [inputValue, setInputValue] = useState(title.map(() => ''));

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
                        <TabsforPurchaseItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <Button variant="outline-success">입고확정</Button>{' '}
                        <Button variant="outline-danger">확정취소</Button>{' '}
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
                                        {a.title === '입고일자' &&
                                            (<Form style={{marginBottom: '10px'}} className={styles.searchSection}>
                                                    <Row>
                                                        <Col xs="auto">
                                                            <div style={{display: 'flex'}}>
                                                                <Form.Control readOnly placeholder={title[i].title}
                                                                              style={{width: '150px', }}/>
                                                                <Label for="searchDate"> </Label>
                                                                <Input id="searchDate"
                                                                       name="searchDate"
                                                                       type='date'
                                                                       style={{marginLeft: "10px", width: '280px'}}
                                                                       onChange={(e) => handleInputChange(i, e.target.value)}/>
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
                                                                                  marginRight: '10px',
                                                                                  width: '150px',

                                                                              }}/>
                                                                <Form.Select aria-label="Default select example"
                                                                             style={{width: '280px'}}>
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
                                                                                  value={inputValue[i]} // 입력된 값으로 설정
                                                                                  onChange={(e) => handleInputChange(i, e.target.value)}
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
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <PurchaseItemTable/>
                        </Container>
                    </div>
                </section>
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>세부항목</div>
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <PurchaseItemTable/>
                        </Container>
                    </div>
                </section>
            </div>
        </>
    );
}

export default PurchaseItem;