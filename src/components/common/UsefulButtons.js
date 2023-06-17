import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';


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

function PillsExample() {
    return (
        <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

// onClick={()=> {setTab(0)}
function TabsExample() {
    return (
        <Nav variant="tabs" defaultActiveKey="0">
            <Nav.Item>
                <Nav.Link eventKey="0">원자재</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="1">반제품</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="2">제품</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default TabsExample;


function FillExample() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}


export {ColorfulButtons, GrayButtons, FillExample, TabsExample, PillsExample}

