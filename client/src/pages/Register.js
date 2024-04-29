import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import { FaRegEnvelope, FaRegEyeSlash } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Overlay from "../components/Overlay";

const Register = () => {
  // useState for showing and hiding the password, defaults to hide
  const [passwordShow, setPasswordShow] = useState(false);

  // References for the register form
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const navigate = useNavigate();

  // Handles hiding and showing the password by changing the useState
  const handlePasswordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  // Makes the backend call to register the user
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Data to be sent to the back, reference from the form
    const firstName = firstRef.current.value;
    const lastName = lastRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Backend call
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    // Navigate the user to the login page if registered
    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* Overlay Component */}
      <Overlay />

      {/* Page Start */}
      <div className="absolute top-0 left-0 right-0 bottom-0 p-5 text-white z-[2] md:mt-[5rem] mt-[9rem]">
        <main className="flex flex-col items-center justify-center w-screen flex-1 text-center">
          <div className="rounded-2xl shadow-2xl bg-gray-500/60 md:flex md:w-2/3 max-w-4xl m-10">
            <div className="md:w-3/5 md:py-5 md:px-12 p-2 text-black">
              <div className="text-left font-bold">
                <Link to="../">
                  <span className="text-zinc-900 text-xl cursor-pointer hover:text-white">
                    Polygon
                  </span>
                </Link>
              </div>
              {/* Register Form */}
              <div className="md:py-1">
                <h2 className="text-3xl font-bold  text-zinc-900">
                  Register with us!
                </h2>
                <div className="border-2 w-10 border-indigo-800/60 inline-block mb-2"></div>

                <div className="flex flex-col items-center">
                  <div className="bg-zinc-300 w-64 p-2 flex items-center mb-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      ref={firstRef}
                      className="bg-zinc-300 outline-none text-sm flex-1"
                    ></input>
                  </div>

                  <div className="bg-zinc-300 w-64 p-2 flex items-center mb-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      ref={lastRef}
                      className="bg-zinc-300 outline-none text-sm flex-1"
                    ></input>
                  </div>

                  <div className="bg-zinc-300 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-zinc-500 m-2"></FaRegEnvelope>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={emailRef}
                      className="bg-zinc-300 outline-none text-sm flex-1"
                    ></input>
                  </div>

                  <div className="bg-zinc-300 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-zinc-500 m-2"></MdLockOutline>
                    <input
                      type={passwordShow ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="bg-zinc-300 outline-none text-sm flex-1"
                      ref={passwordRef}
                    ></input>
                    <button onClick={handlePasswordToggle}>
                      <FaRegEyeSlash className="text-zinc-500 mr-2"></FaRegEyeSlash>
                    </button>
                  </div>
                  <div className="flex justify-between w-64 mb-5">
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="remember"
                        className="mr-1 accent-zinc-400"
                      ></input>
                      Remember me
                    </label>
                  </div>
                  <button
                    className="border-2 bg-indigo-800/60 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-900 hover:text-white"
                    onClick={handleSignUp}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="md:w-2/5 bg-indigo-900/60 text-white md:rounded-tr-2xl md:rounded-br-2xl rounded-b-2xl md:py-36 px-12 py-6">
              <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="mb-2">Click here to sign in!</p>
              <Link
                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-900"
                to="../login"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
