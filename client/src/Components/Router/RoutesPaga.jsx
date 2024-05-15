import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../LoginPage/Login";
import Sign from "../LoginPage/Sign";

const RoutesPaga = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>∂∂
        <Route path="/sign" element={<Sign></Sign>}></Route>∂∂
        <Route path="*" element={<h1>page does not exist</h1>}></Route>
      </Routes>
    </Fragment>
  );
};

export default RoutesPaga;
