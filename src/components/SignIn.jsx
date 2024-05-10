import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { start, stop, login } from "./appSlice";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});



const SignIn = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const body = {
        username: values.email,
        password: values.password,
      };

      try {
        dispatch(start());
        const response = await axios.post(
          "https://api.freeapi.app/api/v1/users/login",
          body
        );
        setResponse(response.data);
        if (response?.data) {
          console.log("im here");
          dispatch(
            login({
              user: response?.data?.data?.user,
              token: response?.data?.data?.accessToken,
            })
          );
          console.log("Response data:", response.data.data?.accessToken);

          console.log("userdata is", response?.data?.data?.user);
          localStorage.setItem(
            "access_token",
            response?.data?.data?.accessToken
          );
        }

        dispatch(stop());
        navigate("/student-table");
      } catch (error) {
        dispatch(stop());
      }
    } catch (error) {
      console.log(error)
    }
  };

  console.log("user response", response);

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
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
                <h2 className="p-2 mt-6 text-xl font-bold text-center">
                  SIGN IN
                </h2>

                <div className="text-[#6C6C6C] text-center text-xs">
                  Enter your credentials to access your account
                </div>
                <form noValidate onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      typeof="email"
                      className="block text-sm font-medium text-[#6C6C6C] mt-[50px]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your email"
                      className="block w-full p-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <p className="text-red-500">
                      {errors.email && touched.email && errors.email}
                    </p>
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
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="block w-full p-2 mt-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <p className="text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
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
        )}
      </Formik>
    </>
  );
};

export default SignIn;