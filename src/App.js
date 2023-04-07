import "./App.css";
import React from "react";
import routes from "./routes";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./views/loginPage";

function App() {




  return (
    <>
      <div className="wrapper">
        {/* <BrowserRouter>
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} exact render={component} />
          ))}
        </BrowserRouter> */}
        <LoginPage/>
      </div>
    </>
  );
}

export default App;
