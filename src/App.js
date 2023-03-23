import "./App.css";
import React from "react";
import routes from "./routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {




  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
        <Switch>
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} exact render={component} />
          ))}
          </Switch>
        </BrowserRouter>
       
      </div>
    </>
  );
}

export default App;
