import React, {useState} from "react";
import styles from './css/PurchaseItem.module.css';
import {TabsforPurchaseItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {purchaseItemsData, tableHeadersPurchase} from "./InputDataforPurchase";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {tableCells} from "../masterData/InputDataforMaster";
import PurchaseItemTable from "./PurchaseItemTable";
import axios from "axios";



function PurchaseItem() {

    let [title, setTitle] = useState(purchaseItemsData);

    const [inputValues, setInputValues] = useState(title.map(() => ''));

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    // 초기화 버튼 클릭 시 모든 값들을 ''로 초기화
    const handleReset = () => {
        setInputValues(title.map(() => ''));
    };

    const handleSubmit = () => {

        const data = title.map((item, i) => {
            if (item.title === "ITEM 코드") {
                return {rawName: inputValues[i],};
            } else if (item.title === "원자재 개수") {
                return {rawCount: parseInt(inputValues[i])};
            } else if (item.title === "원자재 가격") {
                return {rawPrice: parseInt(inputValues[i]),};
            }
        }); // 생성된 JSON 데이터 출력 console.log(data);

        console.log(data)
        const mergedObject = data.reduce((result, currentObject) => {
            return {...result, ...currentObject};

        }, {})
        console.log(mergedObject)

        axios.post('http://localhost:8888/ynfinal/rawitem', mergedObject)
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
                        <TabsforPurchaseItems/>
                    </div>
                    <div className={styles.navLeft}>
                        {/*<PurcahseButtons/>*/}
                        <Button variant="outline-success">입고확정</Button>{' '}
                        <Button variant="outline-danger">확정취소</Button>{' '}
                        {/*<ColorfulButtons/>*/}
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
                                                                              style={{width: '150px', marginLeft: "18px"}}/>
                                                                <Label for="searchDate"> </Label>
                                                                <Input id="searchDate"
                                                                       name="searchDate"
                                                                       type='date'
                                                                       style={{marginLeft: "20px", width: '280px'}}
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
                                                                                  marginRight: '20px',
                                                                                  width: '150px',
                                                                                  marginLeft: "18px"
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
                                                                                  value={inputValues[i]} // 입력된 값으로 설정
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