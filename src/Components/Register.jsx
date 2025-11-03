import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // handleShowPassword
  const handleShowPassword = (e) => {
    e.preventDefault();
    console.log("sxsx", showPassword);
    setShowPassword(!showPassword);
  };

  // Handle Register Btn
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    //
    console.log("Register form submitted", "(", email, password, terms, ")");

    // reset error and success
    setError(null);
    setSuccess(false);

    // terms check
    if (!terms) {
      setError("Please accept terms");
      return;
    }

    // fn
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //
        console.log("USER REGISTERED : ", result.user);
        setSuccess(true);
        e.target.reset();
        // send verification mail
        sendEmailVerification(result.user)
          .then(() => {
          alert("pls verify email")
        })
      })
      .catch((error) => {
        //
        console.log("ERROR :", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col gap-10">
        {/* Header */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
        </div>
        {/* Form */}
        <section className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {/* form */}
            <form onSubmit={handleRegister}>
              {/* success */}
              {success && (
                <p className="text-green-500">User registered successfully!</p>
              )}
              {/* error */}
              {error && <p className="text-red-500">ERROR : {error}</p>}
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {/* pass */}
                <div className="flex justify-between">
                  <label className="label">Password</label>
                  <button onClick={handleShowPassword}>
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                />
                {/* checkbox */}
                <div>
                  <label className="label">
                    <input
                      name="terms"
                      type="checkbox"
                      className="checkbox checkbox-info"
                    />
                    Accept terms and conditions.
                  </label>
                </div>
                {/* Btn */}
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
        </section>
      </div>
    </div>
  );
};

export default Register;
