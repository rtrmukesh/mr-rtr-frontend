import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from 'react';
import { useEffect } from 'react';

function App() {


  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data}
        </a>
      </header>
    </div>
  );
}

export default App;
