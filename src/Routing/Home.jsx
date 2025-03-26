import React from "react";
import Header from "../components/Header";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex-grow">
        <HomeComponent />
      </div>
    </div>
  );
};

export default Home;
