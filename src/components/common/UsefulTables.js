import Table from "react-bootstrap/Table";
import {tableHeadersProduct} from "../masterData/InputDataforMaster";
import PropTypes from "prop-types";

function TableExample({ tableHeaders }) {
    return (
        <>
            <div style={{marginTop:"30px"}}>
                <Table responsive>
                    <thead>
                    <tr style={{textAlign :'center', fontSize : 'small'}}>
                        <th>#</th>
                        {tableHeaders.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
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
                    <tr>
                        <td>3</td>
                        {Array.from({length: tableHeaders.length}).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

TableExample.propTypes = {
    tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {TableExample}