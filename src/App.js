import './App.css';
import axios from "axios";
import React, { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [users, setUsers] = useState();

  useEffect(() => {
    getDetails();
  }, []);


  const  getDetails =()=>{
    axios.get("/api").then((res) => {
      setUsers(res?.data.data);
    }); 
  }
const  get = users[0]

  return (
    <div className="App">
     <span> {get?.name}</span>
    </div>
  );
}

export default App;
