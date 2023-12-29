import React from "react";
import Navbar from "./Navbar";
import CustomeAuthContext from "../context/authContext";
import CustomeProductContext from "../context/productContext";
import CutomeOrdersContext from "../context/OrdersContext";

const Nav = () => {
  return (
    <CustomeAuthContext>
      <CustomeProductContext>
        <CutomeOrdersContext>
          <Navbar />
        </CutomeOrdersContext>
      </CustomeProductContext>
    </CustomeAuthContext>
  );
};

export default Nav;
