import React, { Fragment, useEffect, useState } from "react";
import img from "../../Image/image.jpg";
import google from "../../Image/google.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BackTo from "../Common/Button/BackTo";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useApiUser from "../Hook/useCreateApi";
import { CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Sign = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    birthDate: {},
    address: "",
    phone: "",
    password: "",
  });
  const [dataError, setDataError] = useState({
    email: false,
    name: false,
    birthDate: false,
    address: false,
    phone: false,
    password: false,
  });
  const [checkOtp, setCheckOtp] = useState(false);
  const [status, setStatus] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [dataOtp, setDataotp] = useState(0);

  const {
    isLoading: loadinfSendOTP,
    data: codeOTP,
    postData: sendCodeGameil,
  } = useApiUser("http://localhost:8000/api/sendEmail");

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleSendEmail = async () => {
    try {
      if (!isGmail(formData.email)) {
        setStatus("Email format error");
        setDataError((prev) => ({ ...prev, email: true }));
        return;
      }
      await sendCodeGameil({ email: formData.email });
      setSeconds(60);
      setIsActive(true);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    setDataotp(codeOTP.OTP);
  }, [codeOTP]);

  const { isLoading, postData } = useApiUser(
    "http://localhost:8000/api/createUser"
  );

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, birthDate: newValue }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function isGmail(email) {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
  }

  function isPhoneNumber(phoneNumber) {
    var pattern = /^\d{10}$/;
    return pattern.test(phoneNumber);
  }
  function isDateTime(dateTime) {
    var inputDate = new Date(dateTime);
    var currentDate = new Date();
    return inputDate < currentDate;
  }
  const handleSubmit = async (e) => {
    let checkvar = true;
    e.preventDefault();
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        setDataError((prev) => ({ ...prev, [key]: true }));
        setStatus(`${key} format error`);
        checkvar = false;
      }
    });
    if (!isDateTime(formData.birthDate)) {
      setStatus("Date format error");
      setDataError((prev) => ({ ...prev, birthDate: true }));
      checkvar = false;
    }
    if (!isPhoneNumber(formData.phone)) {
      setStatus("Phone format error");
      setDataError((prev) => ({ ...prev, phone: true }));
      checkvar = false;
    }
    if (!isGmail(formData.email)) {
      setStatus("Email format error");
      setDataError((prev) => ({ ...prev, email: true }));
      return;
    }

    try {
      if (checkvar && !checkOtp) {
        await postData(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <BackTo toLink={"/login"} sx={"w-[90px]"}>
              Back
            </BackTo>
            <div className="lg:w-[500px] lg:flex inline pb-1">
              <p className="font-bold duration-700 sm:text-4xl text-3xl sm:mr-3">
                Create account
              </p>
            </div>
            <span className="font-light text-gray-400 mb-5">
              Welcom back! Please enter your details
            </span>
            <div className="flex items-center justify-center w-full">
              <TextField
                sx={{ "& .MuiTextField-root": { margin: "0 !important" } }}
                fullWidth
                size="small"
                required
                error={dataError.email}
                name="email"
                id="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <button onClick={handleSendEmail}>
                {loadinfSendOTP ? (
                  <CircularProgress
                    color="inherit"
                    sx={{
                      mx: "8px",
                      width: "25px !important",
                      height: "25px !important",
                    }}
                  />
                ) : (
                  <SendIcon sx={{ mx: "8px" }}></SendIcon>
                )}
              </button>
              <TextField
                error={checkOtp}
                size="small"
                sx={{ width: "100px" }}
                required
                type="number"
                name="OTP"
                id="OTP"
                label={isActive ? `${seconds} s` : "OTP"}
                onChange={(event) => {
                  const value = parseFloat(event.target.value);
                  if (event.target.value.length === 4 && value === dataOtp) {
                    setCheckOtp(false);
                    console.log("Success");
                  } else {
                    setCheckOtp(true);
                  }
                }}
              />
            </div>
            <Box
              component="form"
              sx={{
                flex: 1,
                "& .MuiTextField-root": { my: 2 },
                "& .MuiInputBase-input": {
                  //   padding: "9px",
                  color: "#333",
                },
                "& .MuiFormControl-root": {
                  display: "flex",
                  justifyItems: "center",
                  justifyContent: "center",
                },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                error={dataError.name}
                size="small"
                required
                name="name"
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  size="small"
                  onChange={handleDateChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "9px",
                      color: "#333",
                    },
                    flex: 1,
                  }}
                />
              </LocalizationProvider>
              <TextField
                error={dataError.address}
                size="small"
                required
                name="address"
                id="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                error={dataError.phone}
                size="small"
                required
                name="phone"
                id="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <TextField
                error={dataError.password}
                size="small"
                required
                name="password"
                id="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-red-700  min-h-8 ">{status}</div>
              <button
                type="submit"
                className="w-full mt-1 scale-105 transition-all duration-300 bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black border hover:border-gray-300"
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
                  "Create"
                )}
              </button>
            </Box>

            <button className="w-full  border scale-105 transition-all duration-300 border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
              <img src={google} alt="img" className="w-6 h-6 inline mr-2" />
              Create with Google
            </button>
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

export default Sign;
