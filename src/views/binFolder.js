import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
function LoginPage() {  
useEffect(() => {
 function start() {
//  gapi.client.init({
//  clientId:"718337393129-dfh3pqpqo7ad79be5ul0lem9slmurhvg.apps.googleusercontent.com",
//  scope: 'email',
//    });
    }
  //  gapi.load('client:auth2', start);
    }, []);

  const onSuccess = response => {
  console.log('SUCCESS', response);
   };
  const onFailure = response => {
    console.log('FAILED', response);
    };
   const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
     };

    return (
    <div>
   <GoogleLogin
   clientId="718337393129-dfh3pqpqo7ad79be5ul0lem9slmurhvg.apps.googleusercontent.com"
  onSuccess={onSuccess}
  onFailure={onFailure}
  redirectUri="https://stackoverflow.com/questions/51984016/react-google-login"
  // render={renderProps => (
  //   // <Button onClick={renderProps.onClick}size="small">Login</Button>
  //   console.log("renderProps---------------",renderProps)
  //   )}
    />
  <GoogleLogout
    clientId="718337393129-dfh3pqpqo7ad79be5ul0lem9slmurhvg.apps.googleusercontent.com"

    onLogoutSuccess={onLogoutSuccess}
    // render={renderProps => (
    //   // <Button onClick={renderProps.onClick}size="small">Login</Button>
    //   console.log("renderProps-----2----------",renderProps)
    //   )}
      />
    </div>
    );

}

export default LoginPage;