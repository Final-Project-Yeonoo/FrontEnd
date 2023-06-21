
import styles from './css/OrderItem.module.css';
import {ColorfulButtons, ColorfulOrderButtons, TabsforOrderItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {TableExample} from "../common/UsefulTables";
import React, {useState} from "react";
import {purchaseOrderData, tableHeadersPurchase} from "./InputDataforPurchase";
import {Button, Container} from "react-bootstrap";
import {productInputData, tableCells, tableHeadersProduct} from "../masterData/InputDataforMaster";
import Table from "react-bootstrap/Table";


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
                        {/*<ColorfulOrderButtons/>*/}
                        {/*<ColorfulButtons/>*/}
                        <Button variant="outline-primary">발주확정</Button>{' '}
                        <Button variant="outline-danger">확정취소</Button>{' '}
                        <Button variant="outline-success">발주마감</Button>{' '}
                        <Button variant="outline-secondary">발주서출력</Button>{' '}
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
                    {/*<TableExample tableHeaders={tableHeadersPurchase[0]}/>*/}
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <Table responsive>
                                <thead>
                                <tr style={{textAlign: 'center', fontSize: 'small'}}>
                                    <th>#</th>
                                    {tableHeadersPurchase[0].map((heading, index) => (
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
                <section className={styles.tableArea}>
                    <div className={styles.divStyle}>세부항목</div>
                    {/*<TableExample tableHeaders={tableHeadersPurchase[1]}/>*/}
                    <div style={{marginTop: "30px"}}>
                        <Container>
                            <Table responsive>
                                <thead>
                                <tr style={{textAlign: 'center', fontSize: 'small'}}>
                                    <th>#</th>
                                    {tableHeadersPurchase[1].map((heading, index) => (
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
            </div>

        </>
    );
}


export default OrderItem;