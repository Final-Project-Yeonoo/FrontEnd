import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import {Container} from "react-bootstrap";

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
                        {/*{tableCells.map((row, rowIndex) => (*/}
                        {/*    <tr key={rowIndex}>*/}
                        {/*        {row.map((cell, cellIndex) => (*/}
                        {/*            <td key={cellIndex}>*/}
                        {/*                {Object.values(cell)[0]}*/}
                        {/*            </td>*/}
                        {/*        ))}*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                        {/*</tr>*/}
                        <tr>
                            <td>1</td>
                            {Array.from({length: tableHeaders.length}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>2</td>
                            {Array.from({length: tableHeaders.length}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
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