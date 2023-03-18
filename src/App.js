import "./App.css";
import React from "react";
import routes from "./routes";
import { BrowserRouter, Route } from "react-router-dom";

function App() {




  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} exact render={component} />
          ))}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
