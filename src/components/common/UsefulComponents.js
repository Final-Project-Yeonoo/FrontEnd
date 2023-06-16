import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form';
import {Row} from "reactstrap";
import Table from 'react-bootstrap/Table';

import './css/UsefulComponents.module.css';


function ColorfulButtons() {
    return (
        <>
            <Button variant="outline-primary">조회</Button>{' '}
            <Button variant="outline-success">저장</Button>{' '}
            <Button variant="outline-danger">삭제</Button>{' '}
            <Button variant="outline-secondary">초기화</Button>{' '}
        </>
    );
}

function GrayButtons() {
    return (
        <>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">원자재</Button>
                <Button variant="secondary">반제품</Button>
                <Button variant="secondary">제품</Button>
            </ButtonGroup>
        </>
    );
}

// input & select - option
function InputSelect() {

    return (
        <Form style={{marginBottom: '10px'}}>
            <Row>
                <Col xs="auto">
                    <div style={{display: 'flex'}}>
                        <Form.Control readOnly placeholder="Item 코드" style={{marginRight: '10px', width: '150px'}}/>
                        <Form.Select aria-label="Default select example">
                            <option>코드를 선택하세요</option>
                            <option value="1">Z19283</option>
                            <option value="2">F23423</option>
                            <option value="3">ABD099</option>
                        </Form.Select>
                    </div>
                </Col>
            </Row>
        </Form>

    );
}

// input & type
function InputType() {

    return (
        <Form>
            <Row>
                <div style={{display: 'flex'}}>
                    <Col xs="auto">
                        <Form.Control readOnly placeholder="" style={{marginRight: '10px', width: '150px'}}/>
                    </Col>
                    <Col xs="auto">
                        <Form.Control className="mb-2" id="inlineFormInput" placeholder=""/>
                    </Col>
                </div>
            </Row>
        </Form>
    );
}


function TableExample() {
    return (
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                {Array.from({length: 12}).map((_, index) => (
                    <th key={index}>Table heading</th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                {Array.from({length: 12}).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
                <td>2</td>
                {Array.from({length: 12}).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            <tr>
                <td>3</td>
                {Array.from({length: 12}).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                ))}
            </tr>
            </tbody>
        </Table>
    );
}

export {ColorfulButtons, GrayButtons, TableExample, InputType, InputSelect}

