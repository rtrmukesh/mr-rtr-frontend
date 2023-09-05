import React from "react";
import TextArea from "./TextArea";


const Notes = (props) => {

    const { name, label, onChange } = props;

    return(

    <TextArea name={name} label={label} onChange={onChange}/>
    )
}
export default Notes;