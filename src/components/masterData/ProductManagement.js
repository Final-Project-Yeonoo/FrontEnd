import React, {useState} from "react";
import styles from './css/ProductManagement.module.css'
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {ColorfulButtons, TabsExample} from "../common/UsefulButtons";
import {TableExample} from "../common/UsefulTables";
import {productInputData} from "./InputDataforMaster";




function ProductManagement() {

    let [title, setTitle] = useState(productInputData);

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navLeft}>
                        <TabsExample/>
                    </div>
                    <div className={styles.navRight}>
                        <ColorfulButtons/>
                    </div>
                </section>
                {/*제품클릭시 버튼 아래 '유형(0) + 표 바뀜',
                반제품 클릭시 버튼 아래 '없고(1) + 표 바뀜',
                원자재 클릭시 버튼 아래 '규격(2) + 표 바뀜'
                하단에 if문 처리해서 function 하고 props 받아서 하단 참고

                Redux 사용시 컴포넌트들이 props없이 state 공유가능
                */}
                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    {
                        title.map((a, i) => {
                                return (

                                    <div key={i} className={styles.searchSection}>
                                        {/*<InputType/> 원래는 컴포넌트 호출하려고 했으나 자식의 자식으로 props 전달해야하는 불편함 있음*/}
                                        <Form>
                                            <Row>
                                                <div style={{display: 'flex'}} >
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

//  함수사용시 모달
//  조건문 with return
// props 전달 받아야함 {} 형태로

// function TabContent({탭}) { // 이렇게 하면 if 문 필요 없음
// [<com1/>, <com2/>, <com3/>][탭]
// }


export default ProductManagement;

