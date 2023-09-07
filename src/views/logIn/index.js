import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Form from "../../components/Form";
import Text from "../../components/Text";
import Password from "../../components/Password";
import HorizontalSpace from "../../components/HorizontalSpace"
import SaveButton from "../../components/SaveButton";

const LoginPage = (props) => {
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
                initialValues={{}}
                enableReinitialize
                onSubmit={{}}
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
