import React from "react";
import ClubRoom from "../components/study/ClubRoom";
import ClubRoom2 from "../components/study/ClubRoom2";
import ClubRoom3 from "../components/study/ClassRomm3";
import { Outlet } from "react-router";
import MainScreen from "../components/study/MainScreen";
import Members from "../components/study/Members";
import Leader from "../components/study/Leader";

const StudyMaterial = () => {
  return (
    <div className="m-auto">
      <Outlet />
      {/* <ClubRoom /> */}
    </div>
  );
};

export default StudyMaterial;
