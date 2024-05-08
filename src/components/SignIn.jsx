import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {start, stop, login} from "../components/appSlice"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [response,setResponse]=useState([]);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email.trim()) {
        setError("Please enter your email");
        return;
      }
      if (!password.trim()) {
        setError("Please enter your password");
        return;
      }
      const body = {
        username: email,
        password: password,
      };
      
      dispatch(start());
      const response = await axios.post(
        "https://api.freeapi.app/api/v1/users/login",
        body
      );

      if (response.status === 200) {
        navigate("/student-table");
        setResponse(response.data);
        if (response?.data?.token) {
          dispatch(
            login({
              user: response?.data?.user,
              token: response?.data?.token,
            })
          );
          localStorage.setItem("access_token", response?.data?.token);
        }
        setError("");
        dispatch(stop());
      } else {
        setError("Invalid email or password");
        dispatch(stop());
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  console.log("user response",response);

  return (
    <>
      <div
        className="flex items-center w-screen min-h-screen"
        style={{
          background:
            "linear-gradient(71.17deg, #FEAF00 19.35%, #F8D442 90.12%)",
        }}
      >
        <div className="bg-[#FFFFFF] p-6 w-[430px] mx-auto border border-gray-300 items-center rounded-2xl">
          <div className="text-[#000000] text-center font-bold text-3xl">
            CRUD OPERATIONS
          </div>
          <div>
            <h2 className="p-2 mt-6 text-xl font-bold text-center">SIGN IN</h2>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="text-[#6C6C6C] text-center text-xs">
              Enter your credentials to access your account
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  typeof="email"
                  className="block text-sm font-medium text-[#6C6C6C] mt-[50px]"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="block w-full p-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-4">
                <label
                  typeof="password"
                  className="block text-sm font-medium text-[#6C6C6C] mt-5"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full p-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#FEAF00] rounded-md mt-4"
              >
                SIGN IN
              </button>
            </form>
            <div className="mt-4 text-sm text-center text-gray-600 ">
              <span>
                Forgot your password?{" "}
                <a href="#" className="text-[#FEAF00] underline">
                  {" "}
                  Reset Password
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;