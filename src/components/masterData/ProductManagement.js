import React, {useState} from "react";
import styles from './css/ProductManagement.module.css'
import Form from "react-bootstrap/Form";
import {Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import {productInputData} from "./InputDataforMaster";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ProductManagementRawTable from "./ProductManagementRawTable";
import ProductManagementHalfTable from "./ProductManagementHalfTable";
import ProductManagementFullTable from "./ProductManagementFullTable";
import axios from "axios";


function ProductManagement() {

    let [tab, setTab] = useState(0)

    return (
        <>

            <section className={styles.navLeft}>
                <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Item>
                        <Nav.Link eventKey="0" onClick={() => {
                            setTab(0)
                        }}>원자재</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="1" onClick={() => {
                            setTab(1)
                        }}>반제품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" onClick={() => {
                            setTab(2)
                        }}>제품</Nav.Link>
                    </Nav.Item>
                </Nav>

                <TabContent tab={tab}/>

            </section>

        </>
    );
}


function TabContent({tab}) {


    let orangeInputData;
    if (tab === 0) {
        orangeInputData = [...productInputData];
    } else if (tab === 1) {
        orangeInputData = [...productInputData];
        orangeInputData[orangeInputData.length - 1].title = "비고";
    } else if (tab === 2) {
        orangeInputData = [...productInputData];
        orangeInputData[orangeInputData.length - 1].title = "규격";
    }

    return (
        <div>
            {tab === 0 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData}/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementRawTable/>
                    </section>
                </div>
            )}

            {tab === 1 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData}/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementHalfTable/>
                    </section>
                </div>
            )}

            {tab === 2 && (
                <div>
                    <section className={styles.searchBox} style={{marginBottom: '30px'}}>
                        <OrangeInput title={orangeInputData}/>
                    </section>
                    <section className={styles.tableArea}>
                        <ProductManagementFullTable/>
                    </section>
                </div>
            )}
        </div>
    );
}


// 오렌지 표의 형식과 정의
function OrangeInput({title}) {

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
            {title.map((item, i) => {
                return (

                    <div key={i} className={styles.searchSection}>
                        <Form>
                            <Row>
                                <div style={{display: 'flex'}}>
                                    <Col xs="auto">
                                        <Form.Control readOnly placeholder={title[i].title}
                                                      style={{marginRight: '10px', width: '150px'}}/>
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control className="mb-2"
                                                      id="inlineFormInput"
                                                      placeholder={title[i].content}
                                                      value={inputValues[i]} // 입력된 값으로 설정
                                                      onChange={(e) => handleInputChange(i, e.target.value)} // 입력 값 변경 시 상태 업데이트
                                        />
                                    </Col>
                                </div>
                            </Row>
                        </Form>
                    </div>

                );
            })}
            <div className={styles.navRight}>
                <Button variant="outline-primary" onClick={() => {
                }}>조회</Button>
                <Button variant="outline-success" onClick={handleSubmit}>저장</Button>
                <Button variant="outline-danger" onClick={() => {
                }}>삭제</Button>
                <Button variant="outline-secondary" onClick={handleReset}>초기화</Button>
            </div>
        </>
    );

}

export default ProductManagement;

