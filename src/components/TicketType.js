import React from "react"
import Select from "./Select"
import ProjectTicketTypeService from "../services/ProjectTicketTypeService"
import { useEffect } from "react"
import { useState } from "react"
import Url from "../lib/Url"

const TicketType = (props) => {
    let {name,placeholder,handleTicketTypeChange,label,projectValue}=props;

    const [ticketType,setTicketType]=useState([])
    useEffect(()=>{
      getTicketType()
    },[projectValue])
    let getTicketType=async()=>{
      const  projectId=projectValue?projectValue.toString():Url.GetParam("projectId")      
         let response=await ProjectTicketTypeService.search({project_id:projectId})
         let data = response && response?.data && response?.data?.data;
         if(response && response?.data && response?.data?.data){
          let list=[]
          for (let i = 0; i < data.length; i++) {
           const {name,id,userId,userName} = data[i];
           list.push({
             label:name,id:id, value:id,assigneeId:userId,assigneeName:userName
           })
          }
     
          setTicketType(list)
         }else{
          setTicketType([])
         }
       
    }
  return (
    <div>
      <Select
        name={name?name:"ticketType"}
        placeholder={placeholder ? placeholder : "Select Ticket Type"}
        onInputChange={handleTicketTypeChange}
        label={label?label:"Ticket Type"}
        options={ticketType}
      />
    </div>
  )
}

export default TicketType
