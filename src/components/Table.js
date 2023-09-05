import React from "react";

const Table = (props) => {
  const { tablehead, children, tabledata } = props;
  return (
    <table className="table">
      <thead className="bg-dark text-white ">
        <tr>
          {tablehead &&
            tablehead.length > 0 &&
            tablehead.map((data) => (
              <>
                <th scope="col text-white">{data.tableheading}</th>
              </>
            ))}
        </tr>
      </thead>
      {tablehead &&
        tabledata.length > 0 &&
        tabledata.map((tabledata) => (
          <tbody>
            <tr>
              <td>{tabledata.tabledata}</td>
              {children}
            </tr>
          </tbody>
        ))}
    </table>
  );
};

export default Table;
