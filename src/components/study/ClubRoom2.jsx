import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import footballIcon from "../ClubIco/Football.png";
import badmintonIcon from "../ClubIco/Badminton.png";
import volleyballIcon from "../ClubIco/Volleyball.png";
import cricketIcon from "../ClubIco/Cricket.png";
import tennisIcon from "../ClubIco/Tennis.png";
import chessIcon from "../ClubIco/Chess.png";
import eyeIcon from "../ClubIco/icons8-eye.gif";
import LeftBlue from "../ClubIco/Left-Blue.svg";
import LeftGreen from "../ClubIco/Left-Green.svg";
import LeftWhite from "../ClubIco/Left-White.svg";
import LeftRed from "../ClubIco/Left-Red.svg";
import LeftMaroon from "../ClubIco/Left-Maroon.svg";
import RightBlue from "../ClubIco/Right-Blue.svg";
import RightGreen from "../ClubIco/Right-Green.svg";
import RightWhite from "../ClubIco/Right-White.svg";
import RightRed from "../ClubIco/Right-Red.svg";
import RightMaroon from "../ClubIco/Right-Maroon.svg";
import useClubRoom from "../../stores/useClubRoom";
import { useNavigate } from "react-router";

const Dropdown = ({ title, options, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-auto">
      <button
        className="text-white text-sm 2xl:text-xl font-semibold px-5 py-1 2xl:px-8 2xl:py-2  2xl:rounded-lg rounded-md flex items-center gap-2  transition"
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: `1px solid ${color}` }}
      >
        {title} <ChevronDown className="2xl:w-8 2xl:h-8" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 min-w-[160px] bg-black border  rounded-lg shadow-lg z-10">
          <ul className="text-white text-sm">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-purple-700 cursor-pointer transition"
                onClick={() => setIsOpen(false)}
                style={{ border: `1px solid ${color}` }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ClubRoom2 = () => {
  const clubs = [
    { name: "Football", icon: footballIcon },
    { name: "Badminton", icon: badmintonIcon },
    { name: "Volleyball", icon: volleyballIcon },
    { name: "Cricket", icon: cricketIcon },
    { name: "Tennis", icon: tennisIcon },
    { name: "Chess", icon: chessIcon },
  ];
  const { club, setSport } = useClubRoom();
  const selectedElement = club;
  const navigate = useNavigate();

  const getBackColor = () => {
    return `linear-gradient(to right, ${selectedElement?.gradientFrom}, ${selectedElement?.gradientTo})`;
  };

  const getLeftIcon = () => {
    if (selectedElement?.id === "air") {
      return LeftWhite;
    } else if (selectedElement?.id === "fire") {
      return LeftRed;
    } else if (selectedElement?.id === "water") {
      return LeftBlue;
    } else if (selectedElement?.id === "earth") {
      return LeftGreen;
    } else if (selectedElement?.id === "ether") {
      return LeftMaroon;
    }
  };

  const getRightIcon = () => {
    if (selectedElement?.id === "air") {
      return RightWhite;
    } else if (selectedElement?.id === "fire") {
      return RightRed;
    } else if (selectedElement?.id === "water") {
      return RightBlue;
    } else if (selectedElement?.id === "earth") {
      return RightGreen;
    } else if (selectedElement?.id === "ether") {
      return RightMaroon;
    }
  };

  const handleClick = (club) => {
    setSport(club);
    navigate("/studymaterial/clubDesk");
  };

  return (
    <div className=" text-white p-6 2xl:py-10 py-3  flex flex-col">
      {/* Header + Dropdowns in the same row */}
      <div className="flex items-center justify-between w-full 2xl:px-48 px-20">
        {/* Page Title */}
        <h1 className="text-lg 2xl:text-2xl font-semibold">The Club Room</h1>

        {/* Dropdowns (Genre & Region) */}
        <div className="flex gap-4">
          <Dropdown
            title="Genre"
            options={["Sports", "Music", "Drama"]}
            color={club?.gradientFrom}
          />
          <Dropdown
            title="Region"
            options={["Local", "National", "International"]}
            color={club?.gradientFrom}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mt-20 2xl:mt-24 text-black self-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 2xl:py-3 py-2 text-sm 2xl:text-md rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        />
        <img
          src={eyeIcon}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
          alt="Search Icon"
        />
      </div>

      {/* Clubs Section */}
      <div
        className={`${
          selectedElement?.id === "air" && "text-black"
        } flex items-end mx-auto justify-center gap-12 2xl:gap-24 2xl:mt-16 mt-12`}
      >
        {/* Previous Button */}
        <img
          src={getLeftIcon()}
          alt="Previous"
          className="w-12 h-12 cursor-pointer"
        />

        {/* First Row (4 Clubs) */}
        <div
          className={`${
            selectedElement?.id === "air" && "text-black"
          } grid grid-cols-4 gap-16 2xl:gap-24`}
        >
          {clubs.slice(0, 4).map((club, index) => (
            <div
              onClick={() => handleClick(club)}
              key={index}
              className=" rounded-lg shadow-sm shadow-black border border-slate-900 hover:border-white flex items-center justify-evenly  text-center hover:scale-105 transform transition  2xl:w-[17rem] 2xl:h-[9rem] w-[14rem] h-[8rem] cursor-pointer"
              style={{
                background: getBackColor(),
              }}
            >
              {/* Icon (Left) */}
              <img
                src={club.icon}
                alt={club.name}
                className="2xl:w-30 2xl:h-36 w-30 h-32"
              />

              {/* Name (Right) */}
              <span className="font-bold  text-lg 2xl:text-2xl">
                {club.name}
              </span>
            </div>
          ))}
        </div>

        {/* Next Button Beside Cricket */}
        <img
          src={getRightIcon()}
          alt="Next"
          className="w-10 h-10  cursor-pointer"
        />
      </div>

      {/* Second Row (2 Clubs) */}
      <div
        className={`${
          selectedElement?.id === "air" && "text-black"
        } grid grid-cols-2 gap-16 2xl:gap-24 2xl:mt-16 mt-10 self-center`}
      >
        {clubs.slice(4, 6).map((club, index) => (
          <div
            onClick={() => handleClick(club)}
            key={index}
            className="rounded-lg shadow-sm shadow-black border hover:border-white border-slate-900 flex items-center justify-evenly   text-center hover:scale-105 transform transition 2xl:w-[17rem] 2xl:h-[9rem] w-[14rem] h-[8rem] cursor-pointer"
            style={{
              background: getBackColor(),
            }}
          >
            {/* Icon (Left) */}
            <img
              src={club.icon}
              alt={club.name}
              className="2xl:w-30 2xl:h-36 w-30 h-32"
            />

            {/* Name (Right) */}
            <span className="font-bold text-lg 2xl:text-2xl">{club.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubRoom2;
