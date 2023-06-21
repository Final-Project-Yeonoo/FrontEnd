import React, {useEffect, useState} from "react";
import styles from './css/StoreManagement.module.css'
import {ColorfulButtons, TabsforStore} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {storeInputData, tableCells, tableHeadersProduct} from "./InputDataforMaster";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import Table from "react-bootstrap/Table";


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
                        <Button variant="outline-primary">조회</Button>{' '}
                        <Button variant="outline-success">저장</Button>{' '}
                        <Button variant="outline-danger">삭제</Button>{' '}
                        <Button variant="outline-secondary">초기화</Button>{' '}
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (
                                    <>

                                        {a.title === '창고구분' ? (
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
                                                                         style={{width: '246px'}}
                                                                        onChange={(event) => console.log(event.target.value)}>
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
                                        ) : (
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
                                                                <Form.Control className="mb-2"
                                                                              id="inlineFormInput"
                                                                              placeholder={title[i].content}
                                                                        onChange={(event) => console.log(event.target.value)}/>
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
                <button onClick={() => {
                    axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                        console.log('성공함', 결과.data)
                    })
                        .catch(() => {
                            console.log('실패함')
                        })
                }}> 백 데이터 받는 버튼
                </button>
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>창고</div>
                    {/*<TableExample tableHeaders={tableHeadersProduct[3]} />*/}
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <Table responsive>
                                <thead>
                                <tr style={{textAlign: 'center', fontSize: 'small'}}>
                                    <th>#</th>
                                    {tableHeadersProduct[3].map((heading, index) => (
                                        <th key={index}>{heading}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {/*<tr>*/}
                                {tableCells.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1}</td>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>
                                                {Object.values(cell)[0]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </section>
                {/*<section className={styles.tableArea}>*/}
                {/*    <div className={styles.divStyle}>구역(Area)</div>*/}
                {/*    <TableExample tableHeaders={tableHeadersProduct[4]}/>*/}
                {/*    <div className={styles.divStyle}>렉(Rack)</div>*/}
                {/*    <TableExample tableHeaders={tableHeadersProduct[5]}/>*/}
                {/*</section>*/}
            </div>
        </>
    );
}

export default StoreManagement;