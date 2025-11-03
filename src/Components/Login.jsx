import React, { useRef, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef()

  // handleShowPassword
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleForgetPass = (e) => {
    const email = emailRef.current.value;
    console.log("Forget pass clicked", email)
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("SUCCESS : pls check email");
      })
      .catch((error) => {
        setError("ERROR : ", error.message);
      });
    
  }

  // Email Log In
  const handleEmailLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // 
    console.log("LOGIN Btn clicked", "(", email, password, ")");

    // reset error
    setError("");

    // fn
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // 
        console.log("LOGIN :", result.user.emailVerified);
        if (!result.user.emailVerified) {
          setError("pls verify email")
          return
        }
        setUser(result.user);
      })
      .catch((error) => {
        // 
        console.log("ERROR :", error.message);
        setError(error.message);
      });
  };

  // Google Sign In
  const handleGoogleSignIn = () => {
    console.log("Google login button clicked");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("LOGIN :", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.log("ERROR :", error);
      });
  };

  // Github Sign In
  const handleGitHubSignIn = () => {
    console.log("GitHub login button clicked");

    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log("LOGIN", result.user);
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
        setError(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col gap-10">
        {/* Right / Up Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Here</h1>
        </div>
        {/* Left / Down Section */}
        {!user ? (
          <section className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div>
                {/* form */}
                <form onSubmit={handleEmailLogIn}>
                  {/* error */}
                  {error && <p className="text-red-500">{error}</p>}
                  <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                      ref={emailRef}
                      name="email"
                      type="email"
                      className="input"
                      placeholder="Email"
                    />
                    <div className="flex justify-between">
                      <label className="label">Password</label>
                      {/* showPass Btn */}
                      <button onClick={handleShowPassword} className="pr-5">
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="input"
                      placeholder="Password"
                    />
                    <div>
                      <a onClick={handleForgetPass} className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                  </fieldset>
                </form>
                {/* register new */}
                <p>
                  Dont have account?{" "}
                  <Link to="/register" className="text-blue-500 underline">
                    Register
                  </Link>
                </p>
              </div>
              {/*  */}
              <div>
                {/* Google */}
                <button
                  onClick={handleGoogleSignIn}
                  className="btn bg-white text-black border-[#e5e5e5] mt-5 w-full"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
                {/* GitHub */}
                <button
                  onClick={handleGitHubSignIn}
                  className="btn bg-black text-white border-black mt-5 w-full"
                >
                  <svg
                    aria-label="GitHub logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    ></path>
                  </svg>
                  Login with GitHub
                </button>
              </div>
            </div>
          </section>
        ) : (
          //   if user is logged in
          <div className="flex flex-col items-center">
            <h3>{user?.displayName}</h3>
            <img src={user?.photoURL} alt="" className="w-48" />
            <h3>{user?.email}</h3>
            {!user.email && <h3>{user?.providerData[0].email}</h3>}
            <button onClick={handleSignOut} className="cursor-pointer">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
