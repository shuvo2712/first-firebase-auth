import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [user, setUser] = React.useState(null);

  // Sign In by google
  const handleSignInGoogle = () => {
    console.log("Google login button clicked");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("USER LOGIN :", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.log("ERROR :", error);
      });
  };

  // Sign Out
  const handleSignOut = () => {
    console.log("Sign out button clicked");

    signOut(auth)
      .then(() => {
        console.log(user.displayName, "signed out successfully");
        setUser(null);
      })
      .catch((error) => {
        console.log("ERROR :", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>

      {/* if no user */}
      {!user && (
        <div className="login">
          <button onClick={handleSignInGoogle}>Login by Google</button>
        </div>
      )}

      {/* if user  */}
      {user && (
        <div className="login">
          <h3>{user?.displayName}</h3>
          <img src={user?.photoURL} alt="" />
          <h3>{user?.email}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Login;
