import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // handle register
  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("Register form submitted", email, password);

    // reset error and success
    setError(null);
    setSuccess(false);

    // fn
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User registered:", result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("ERROR :", error);
        setError(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {/* form */}
            <form onSubmit={handleRegister}>
              {/* success */}
              {success && (
                <p className="text-green-500">User registered successfully!</p>
              )}
              {/* error */}
              {error && <p className="text-red-500">{error}</p>}
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
