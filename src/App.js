import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  const session_token = Cookie.get(COOKIE_SESSION_TOKEN) || null;
  const navigate = useNavigate();

  const currentPath = window.location.pathname + window.location.search;
  
  React.useEffect(() => {
    if (currentPath === "/") {
      let url = session_token ? "/dashboard" : "/login";
      navigate(url);
    }
  }, [currentPath, session_token, navigate]);

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
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
