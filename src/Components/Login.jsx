import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const handleLoginGoogle = () => {
    console.log("Google login button clicked");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("user", result.user);
      })
      .catch((error) => {
        console.log("Error during Google sign-in:", error);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLoginGoogle}>Login by Google</button>
    </div>
  );
};

export default Login;
