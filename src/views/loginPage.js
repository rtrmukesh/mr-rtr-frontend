import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
function LoginPage() {
  
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "718337393129-hj31pjdn197dj5p5rlia371p7s04s55v.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
    if (response.profileObj) {
      setIsLogin(true);
    }
  };

  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  
  const onLogoutSuccess = () => {
    console.log("SUCCESS LOG OUT");
    setIsLogin(false);
  };

  return (
    <div>
      {!isLogin ? (
        <GoogleLogin
          clientId="718337393129-hj31pjdn197dj5p5rlia371p7s04s55v.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={onFailure}
          theme="dark"
        />
      ) : (
        <GoogleLogout
          clientId="718337393129-hj31pjdn197dj5p5rlia371p7s04s55v.apps.googleusercontent.com"
          onLogoutSuccess={onLogoutSuccess}
        />
      )}
    </div>
  );
}

export default LoginPage;
