import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Form from "../../components/Form";
import Text from "../../components/Text";
import Password from "../../components/Password";
import HorizontalSpace from "../../components/HorizontalSpace"
import SaveButton from "../../components/SaveButton";
import axios from "axios";
import { isBadRequest } from "../../lib/Http";
import Toast from "../../components/Toast";
import {setCookie} from "../../lib/Helper"
import { COOKIE_SESSION_TOKEN } from "../../lib/Cookie";

const LoginPage = (props) => {



  const handleLogin = (values) => {
    axios
      .post('http://localhost:3002/v1/user/loginByPassword', values)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
          Toast.success(successMessage);
          setCookie(COOKIE_SESSION_TOKEN,response && response?.data?.user?.token)
          window.location.replace("/dashboard")
        }
      })
      .catch((error) => {
        if (isBadRequest(error)) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          Toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };


let initialValues={
  email:"",
  password:""
}

  return (
    <div class='container-fluid d-flex justify-content-center align-items-center h-100'>
      <div class='row main-content bg-success '>
        <div class='col-md-12 col-xs-12 col-sm-12 login_form '>
          <div class='container-fluid'>
            <div class='row text-center'>
              <h2>Log In</h2>
            </div>
            <div class='row'>
              <Form
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleLogin}
                className="p-0"
              >
                <Text
                name="email"
                label="Email"
                />
                <Password 
                name="password"
                label="Password"
                />

                <HorizontalSpace/>
                <div className="d-flex justify-content-center">
                <SaveButton label="Login" />
                </div>

              </Form>
            </div>
            <div class='row text-center'>
              <p>
                Don't have an account? <Link to='/signup'>Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
