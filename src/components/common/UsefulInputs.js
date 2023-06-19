import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form';
import {Row} from "reactstrap";

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


export { InputType, InputSelect }