import React from "react";

const StatusText = ({ backgroundColor, status }) => {
    return (
        <div
            className={"status-input my-3 mx-auto"} style={{ backgroundColor: backgroundColor ? backgroundColor : 'black' }}>
            <p>{status}</p>
        </div>
    )

}
export default StatusText;