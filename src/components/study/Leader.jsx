import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Importing images
import music from "../Clubroom/music.png";
import que from "../Clubroom/qus.png";
import loveicon from "../Clubroom/loveicon.png";
import plusicon from "../Clubroom/plusicon.png";
import manIcon from "../ClubIco/manlogo.png";

import pythonlogo2 from "../ClubIco/pythonlogo2.png";
import drama2 from "../ClubIco/drama2.png";
import stear from "../ClubIco/stear.png";
import head from "../ClubIco/head.png";
import cap from "../ClubIco/cap.png";
import starbadge from "../ClubIco/starbadge.png";
import previous from "../ClubIco/previous.png";
import next from "../ClubIco/next.png";
import play from "../ClubIco/play.png";
import useClubRoom from "../../stores/useClubRoom";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { CgEnter } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";

import namebg from "../ClubIco/namebg.png";

const Dropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-auto">
      <button
        className="text-white text-sm md:text-lg font-semibold px-4 py-2 border border-purple-500 rounded-lg flex items-center justify-between gap-2 hover:bg-purple-900 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} <ChevronDown className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 min-w-[140px] bg-black border border-purple-500 rounded-lg shadow-lg z-10">
          <ul className="text-white text-sm">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-purple-700 cursor-pointer transition"
                onClick={() => setIsOpen(false)}
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

const Leader = () => {
  const [isPopularityOpen, setPopularityOpen] = useState(false);
  const [isSectorOpen, setSectorOpen] = useState(false);
  const { club } = useClubRoom();
  const primaryColor = club.gradientFrom;
  const secondaryColor = club.gradientTo;
  const [hover, setHover] = useState(null);

  console.log(club);

  const statButtons = [
    { icon: FaHeart, label: "251" },
    { icon: FaPlus, label: "100" },
    { icon: FaQuestion, label: "51" },
  ];

  return (
    <div className=" text-white  ">
      {/* Top Menu Bar */}
      <div className="flex py-8 justify-around items-center">
        <button className="flex items-center gap-2 text-[1.7rem] font-semibold">
          <img
            src={music}
            alt="Music Icon"
            className="w-12 h-12 text-teal-400"
          />
          Mafia Mundeer
        </button>
        <div className="flex gap-44">
          <div className="relative">
            <button
              className={`text-white font-bold py-2 px-10 rounded-lg text-[1.5rem]   flex items-center justify-between lg:justify-center`}
              onClick={() => setPopularityOpen(!isPopularityOpen)}
              style={{
                border: `1px solid ${primaryColor}`,
              }}
            >
              Popularity <ChevronDown className="ml-4 h-8 w-8" />
            </button>
            {isPopularityOpen && (
              <div className="absolute bg-white  text-black shadow-md rounded-lg mt-2 w-56">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">Most Popular</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Trending</li>
                  <li className="px-4 py-2 hover:bg-gray-200">New</li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className={`font-bold py-2 px-10 rounded-lg text-[1.5rem]  flex items-center justify-between lg:justify-center`}
              onClick={() => setSectorOpen(!isSectorOpen)}
              style={{
                border: `1px solid ${primaryColor}`,
              }}
            >
              Sector <ChevronDown className="ml-4 h-8 w-8" />
            </button>
            {isSectorOpen && (
              <div className="absolute bg-white text-black shadow-md rounded-lg mt-2 w-56">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">Technology</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Arts</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Science</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row  w-full justify-center   gap-6">
        {/* Profile Section */}
        <div className="flex flex-col w-1/4 ">
          <div
            className={`shadow-sm px-8 py-6 rounded-lg`}
            style={{ boxShadow: `0px 1px 1.5px 1px ${primaryColor}` }}
          >
            <img src={manIcon} alt="Profile" className="w-48 h-56 mx-auto " />
            <div className="relative w-fit mx-auto ">
              <img src={namebg} alt="Name Background" className="w-60 h-auto" />
              <span className="absolute inset-0 flex items-center justify-center text-sm md:text-lg font-semibold text-white">
                Hemant Agarwal
              </span>
            </div>

            <div className="mt-4  text-sm text-gray-300 px-6">
              <ul className="list-disc space-y-1 text-justify break-words">
                <li>
                  Hemant Agarwal is a visionary entrepreneur whose relentless
                  pursuit of innovation has made a signing technology to solve
                  real-world problems.
                </li>
                <li>
                  Hemant has successfully navigated the challenges of
                  entrepreneurship, establishing a reputation for creativity and
                  leadership. His journey is marked by a commitment to
                  sustainable practices and social responsibility.
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-6  mt-6">
              {statButtons.map(({ icon: Icon, label }, index) => (
                <button
                  key={index}
                  className="h-10 px-4 rounded flex items-center transition-colors"
                >
                  <Icon
                    className="w-10 h-10 mr-3 "
                    style={{ color: primaryColor }}
                  />
                  <span className=" text-xl ">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div
            className="mt-6 border-2 h-[8rem] flex items-center border-red-500 rounded-lg p-2"
            style={{
              borderImage: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor}) 1`,
            }}
          >
            <button className="w-full flex justify-evenly items-center  text-white  py-2 md:py-3 rounded-lg text-sm md:text-2xl font-semibold  transition">
              How Can I Help You?
              <FaPlay className="w-8 h-8" style={{ color: primaryColor }} />
            </button>
          </div>
        </div>

        {/* Right Content (Clubs, Achievements, Research) */}
        <div className=" w-1/2 space-y-6">
          {[
            {
              title: "Clubs",
              items: [
                { icon: pythonlogo2, name: "Python Club" },
                { icon: drama2, name: "Drama Club" },
                { icon: stear, name: "Sports Club" },
                { icon: head, name: "Leadership Club" },
              ],
            },
            {
              title: "Achievements Badge",
              items: Array(5).fill({ icon: starbadge, name: "Badge" }),
            },
            {
              title: "Research",
              items: [
                { icon: cap, name: "10th" },
                { icon: cap, name: "12th" },
                { icon: cap, name: "Graduate" },
                { icon: cap, name: "Masters" },
              ],
            },
          ].map((section, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg cursor-pointer  ${
                club.id === "air" ? "text-black" : ""
              }`}
              style={{
                border: `1px solid ${primaryColor}`,
                background:
                  hover === i
                    ? `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`
                    : "",
              }}
            >
              <h3 className=" md:text-2xl font-semibold text-center mb-4">
                {section.title}
              </h3>
              <div className="flex items-center justify-around">
                <img
                  src={previous}
                  alt="Prev"
                  className={`w-12 h-12 cursor-pointer ${
                    hover === i
                      ? "invert-0 brightness-0"
                      : "grayscale contrast-200 brightness-[2000%]"
                  }  `}
                />
                <div
                  className="flex gap-16 justify-around items-center"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className={` ${
                        hover === i
                          ? "invert-0 brightness-0"
                          : "grayscale contrast-200 brightness-[2000%]"
                      } text-center cursor-pointer`}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={`w-20 mx-auto mb-1 ${
                          hover === i
                            ? "invert-0 brightness-0"
                            : "grayscale contrast-200 brightness-[2000%]"
                        }  transition-transform duration-300 hover:scale-125 hover:opacity-80`}
                      />
                      <p className="text-md text-white">{item.name}</p>
                    </div>
                  ))}
                </div>
                <img
                  src={next}
                  alt="Next"
                  className={`w-12 h-12 cursor-pointer ${
                    hover === i
                      ? "invert-0 brightness-0"
                      : "grayscale contrast-200 brightness-[2000%]"
                  }  `}
                />
              </div>
            </div>
          ))}
          <div className={`flex flex-wrap justify-around text-2xl gap-4 mt-6 `}>
            <button
              className="flex items-center gap-2 w-[17rem] justify-center font-semibold px-6 py-3 rounded-lg border transition"
              style={{
                // color: primaryColor, // Correct way to apply text color dynamically
                borderImage: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}) 1`,
              }}
            >
              <FaPeopleGroup className="w-8 h-8 mr-3" />
              Hire Me
            </button>

            <button
              className="flex items-center gap-2 w-[17rem] justify-center font-semibold px-6 py-3 rounded-lg border transition"
              style={{
                // color: primaryColor, // Correct way to apply text color dynamically
                borderImage: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}) 1`,
              }}
            >
              <FaHandsHelping className="w-8 h-8 mr-3" />I need Help
            </button>

            <button
              className="flex items-center gap-2 w-[17rem] justify-center font-semibold px-6 py-3 rounded-lg border transition"
              style={{
                // color: primaryColor, // Correct way to apply text color dynamically
                borderImage: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}) 1`,
              }}
            >
              <CgEnter className="w-8 h-8 mr-3" />
              Enter Club
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
    </div>
  );
};

export default Leader;
