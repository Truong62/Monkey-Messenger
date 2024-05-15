import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BackTo = ({ children, sx, toLink }) => {
  return (
    <Fragment>
      <Link
        className={`border flex justify-center items-center border-gray-300 rounded-md px-2 py-1 mb-2 ${sx} hover:bg-black hover:text-white scale-105 transition-all duration-300`}
        to={toLink}
      >
        <p className="text-xl">{children}</p>
      </Link>
    </Fragment>
  );
};

export default BackTo;
