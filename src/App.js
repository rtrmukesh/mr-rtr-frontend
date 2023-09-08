import React from "react";
import { Route, Switch } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import ToastContainer from "./components/ToastContainer";
import { COOKIE_SESSION_TOKEN } from "./lib/Cookie";
import Cookie from "./lib/Helper";
import MainLayout from "./views/layout/mainLayout";
import LoginPage from "./views/logIn";
import SignUp from "./views/signUp";
import "./views/styles.scss";

function App(props) {
  let session_token = Cookie.get(COOKIE_SESSION_TOKEN) || null;

  const currentPath = window.location.pathname + window.location.search;
  
  if (currentPath == "/") {
    let url = Cookie.get(COOKIE_SESSION_TOKEN) ? "/dashboard" : "/login";
    const startPageUrl = url;
    window.location.replace(startPageUrl);
  }

  return (
    <>
      <ToastContainer
        autoClose={4000}
        pauseOnHover={false}
        toastClassName="toastRequestSuccess"
        bodyClassName="toastBody"
      />
      {session_token ? (
        <MainLayout />
      ) : (
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
