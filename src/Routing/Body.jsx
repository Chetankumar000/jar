import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const Body = () => {
  return (
    <div className="w-full h-full ">
      <Header />
      <Outlet /> {/* Render child routes here */}
    </div>
  );
};

export default Body;
