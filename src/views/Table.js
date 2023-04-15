import React, { Fragment } from "react";
import { Table } from "reactstrap";



const ReactTable = (props) => {

    return (

        <Table
            hover
            responsive
            className=" item-align-center"
        >
            <tr className="text-center">
                <th className="border">Sno</th>
                <th className="border">Name</th>
                <th className="border">Address</th>
            </tr>
            <tr className="text-center">
                <td>1</td>
                <td>Mukesh</td>
                <td>Mayiladuthurasqadxqsi</td>
            </tr>
        </Table>

    )


}

export default ReactTable;