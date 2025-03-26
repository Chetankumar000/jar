import React, { useState } from "react";
import SubjectSelectCard from "../components/SubjectSelectCard";
import { Outlet } from "react-router";

const Quizme = () => {
  return (
    <div className="flex-grow">
      {/* Passing handleSubjectClick as a prop to SubjectSelectCard */}
      <Outlet />
    </div>
  );
};

export default Quizme;
