import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import {Container} from "react-bootstrap";
import {tableCells} from "../masterData/InputDataforMaster";

function TableExample({tableHeaders}) {

    return (
        <>
            <div style={{marginTop: "30px"}}>
                <Container>
                    <Table responsive>
                        <thead>
                        <tr style={{textAlign: 'center', fontSize: 'small'}}>
                            <th>#</th>
                            {tableHeaders.map((heading, index) => (
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
        </>
    );
}

TableExample.propTypes = {
    tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {TableExample}