import React, { Fragment, useState } from "react";
import img from "../../Image/image.jpg";
import google from "../../Image/google.svg";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useApiUser from "../Hook/useCreateApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formCheckData, setFormCheckData] = useState({
    email: false,
    password: false,
  });
  const [status, setStatus] = useState("");

  const { isLoading, postData } = useApiUser("http://localhost:8000/api/dds");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    let checkvar = true;
    e.preventDefault();
    try {
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          setFormCheckData((prev) => ({ ...prev, [key]: true }));
          setStatus(`${key} format error`);
          checkvar = false;
          return;
        }
      });
      if (checkvar) {
        await postData(formData);
      }
    } catch (error) {
      console.log(formCheckData);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <div className="lg:w-[500px] lg:flex inline pb-1">
              <p className="font-bold duration-700 sm:text-4xl text-3xl sm:mr-3">
                Welcome App
              </p>
              <TypeAnimation
                sequence={["MonKey", 2000, "", 500]}
                className="font-bold duration-700 text-3xl sm:text-4xl  sm:mr-3 text-violet-500"
                wrapper="span"
                speed={5}
                repeat={Infinity}
              ></TypeAnimation>
            </div>
            <span className="font-light text-gray-400 mb-5">
              Welcom back! Please enter your details
            </span>
            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <span
                  className={`mb-2 text-md ${
                    formCheckData.email && "text-red-400"
                  }`}
                >
                  Email
                </span>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md placeholder:font-light ${
                    formCheckData.email
                      ? "border-red-400"
                      : "border-gray-300 placeholder:text-gray-500"
                  }`}
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="py-4">
                <span
                  className={`mb-2 text-md ${
                    formCheckData.password && "text-red-400"
                  }`}
                >
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md placeholder:font-light ${
                    formCheckData.email
                      ? "border-red-400"
                      : "border-gray-300 placeholder:text-gray-500"
                  }`}
                />
              </div>
              <div className="inline lg:flex justify-between w-full py-4">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">Remember for 30 days</span>
                </div>
                <span className="font-bold text-md">Forgot password</span>
              </div>
              <div className="text-red-700  min-h-8 ">{status}</div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300"
              >
                {isLoading ? (
                  <CircularProgress
                    color="inherit"
                    sx={{
                      width: "19px !important",
                      height: "19px !important",
                    }}
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <button className="w-full border border-gray-300 text-md scale-105 transition-all duration-300 p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
              <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
              Sign in with Google
            </button>
            <div className="text-center text-gray-400">
              Dont'have an account?
              <Link
                to={"/sign"}
                className="font-bold scale-105 transition-all duration-300 hover:text-indigo-400 text-black ml-1"
              >
                Sign up for free
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={img}
              alt={img}
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            <div className="absolute hidden bottom-10 right-6 p-6 bg-violet-300 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-white text-xl">
                We've been uesing Untitle to kick"
                <br />
                start every new project and can't <br />
                imagine working without it."
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
