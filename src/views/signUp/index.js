import React, { useState } from 'react';
import Form from '../../components/Form';
import Text from '../../components/Text';
import Password from '../../components/Password';
import SaveButton from '../../components/SaveButton';
import { validateStrongPassword } from '../../lib/Helper';
// import { useDispatch } from "react-redux";
import LoginService from "../../services/LoginService";
import axios from "axios";

function SignUp(props) {

  let { history } = props;

  const [strongPasswordError, setStrongPasswordError] = useState('');
  const [isNewPassword, setIsNewPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState();

  // const dispatch = useDispatch()

  
  const handleNewPasswordChange = (e) => {
    const newPassword = e.values.newPassword;
    const confirmPassword = e.values.confirmPassword;
    setIsNewPassword(newPassword);
    const strongPassword = validateStrongPassword(newPassword);
    if (strongPassword) {
      setStrongPasswordError(strongPassword);
    } else if (newPassword && !confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError('Confirm password did not match');
    }
    if (strongPassword === undefined) {
      setStrongPasswordError('');
    }
    if (newPassword === confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = isNewPassword;
    const confirmPassword = e && e.values && e.values.confirmPassword;
    setIsConfirmPassword(confirmPassword);

    const strongPassword = validateStrongPassword(newPassword);
    if (strongPassword) {
      setStrongPasswordError(strongPassword);
    } else if (newPassword && !confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError('Confirm password did not match');
    }
    if (strongPassword === undefined) {
      setStrongPasswordError('');
    }
    if (newPassword === confirmPassword) {
      setConfirmPasswordError('');
    }
  };


  const handleSubmit = async (values) => {
    let data = new FormData();

    data.append('name', values && values?.name ? values?.name : '');
    data.append('email', values && values?.email ? values?.email : '');
    data.append(
      'newPassword',
      values && values?.newPassword ? values?.newPassword : ''
    );
    data.append(
      'confirmPassword',
      values && values?.confirmPassword ? values?.confirmPassword : ''
    );

    const response = await axios.post('http://localhost:3002/v1/user/signup',data);
console.log('response >>>----------------------------->',response);
    // dispatch(await LoginService.signUp(data, (res) => {}));

  };

  const initialValues = {
    name: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
  };

  return (
    <div>
      <section
        class='vh-100 bg-image'
        style={{
          backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')`,
        }}
      >
        <div class='mask d-flex align-items-center h-100 gradient-custom-3'>
          <div class='container h-100'>
            <div class='row d-flex justify-content-center align-items-center h-100'>
              <div
                class='col-12 col-md-9 col-lg-7 col-xl-6'
                style={{ padding: '25px' }}
              >
                <div class='card card-body' style={{ borderRadius: '15px' }}>
                  <Form
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={handleSubmit}
                  >
                    <h2 class='text-uppercase text-center mb-5'>
                      Create an account
                    </h2>

                    <Text name='name' label='Name' required />
                    <Text name='email' label='Email' required />
                    <Password
                      name='newPassword'
                      label='Password'
                      onInputChange={(e) => {
                        handleNewPasswordChange(e);
                      }}
                      error={strongPasswordError}
                      required
                    />
                    <Password
                      name='confirmPassword'
                      label='Confirm Password'
                      onInputChange={(e) => {
                        handlePasswordChange(e);
                      }}
                      error={confirmPasswordError}
                      required
                    />
                    <div className='align-center d-flex justify-content-center'>
                      <SaveButton label='SignUp' className='bg-primary' />
                    </div>
                  </Form>
                  {/* <div class='card-body p-5'>
                    <h2 class='text-uppercase text-center mb-5'>
                      Create an account
                    </h2>

                    <form>
                      <div class='form-outline'>
                        <input
                          type='text'
                          id='form3Example1cg'
                          class='form-control form-control-lg'
                        />
                        <label class='form-label' for='form3Example1cg'>
                          Your Name
                        </label>
                      </div>

                      <div class='form-outline'>
                        <input
                          type='email'
                          id='form3Example3cg'
                          class='form-control form-control-lg'
                        />
                        <label class='form-label' for='form3Example3cg'>
                          Your Email
                        </label>
                      </div>

                      <div class='form-outline'>
                        <input
                          type='password'
                          id='form3Example4cg'
                          class='form-control form-control-lg'
                        />
                        <label class='form-label' for='form3Example4cg'>
                          Password
                        </label>
                      </div>

                      <div class='form-outline'>
                        <input
                          type='password'
                          id='form3Example4cdg'
                          class='form-control form-control-lg'
                        />
                        <label class='form-label' for='form3Example4cdg'>
                          Repeat your password
                        </label>
                      </div>

                      <div class='form-check d-flex justify-content-center mb-5'>
                        <input
                          class='form-check-input me-2'
                          type='checkbox'
                          value=''
                          id='form2Example3cg'
                        />
                        <label class='form-check-label' for='form2Example3g'>
                          I agree all statements in{' '}
                          <a href='#!' class='text-body'>
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div class='d-flex justify-content-center'>
                        <button
                          type='button'
                          class='btn btn-success btn-block btn-lg gradient-custom-4 text-body'
                        >
                          Register
                        </button>
                      </div>

                      <p class='text-center text-muted mt-5 mb-0'>
                        Have already an account?{' '}
                        <a href='#!' class='fw-bold text-body'>
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
