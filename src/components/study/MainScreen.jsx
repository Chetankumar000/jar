import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

// Importing images
import members from "../Clubroom/member.png";
import leader from "../Clubroom/leader.png";
import achievements from "../Clubroom/achivements.png";
import joinclub from "../Clubroom/joinclub.png";
import sponsorClub from "../Clubroom/sponsorclub.png";
import music from "../Clubroom/music.png";
import vdoimg from "../Clubroom/vdoimg.png";
import useClubRoom from "../../stores/useClubRoom";

import { CgEnter } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { color } from "framer-motion";
import { useNavigate } from "react-router";

function MainScreen() {
  const [isPopularityOpen, setPopularityOpen] = useState(false);
  const [isSectorOpen, setSectorOpen] = useState(false);
  const { club } = useClubRoom();
  const primaryColor = club.gradientFrom;
  const secondaryColor = club.gradientTo;
  const navigate = useNavigate();
  console.log(club);

  // Array for buttons
  const buttons = [
    { label: "Members", icon: members },
    { label: "Leader", icon: leader },
    { label: "Achievements", icon: achievements },
    { label: "Join Club", icon: joinclub },
    { label: "Sponsor Club", icon: sponsorClub },
  ];

  const statButtons = [
    { icon: FaHeart, label: "251" },
    { icon: FaPlus, label: "100" },
    { icon: FaQuestion, label: "51" },
    { icon: CgEnter, label: "Enter Club" },
  ];

  const handleBtnClick = (button) => {
    if (button.label === "Members") {
      navigate("/studymaterial/members");
    } else if (button.label === "Leader") {
      navigate("/studymaterial/Leader");
    }
  };

  return (
    <div className=" text-white p-4">
      {/* Top Menu Bar (Hidden on tablet) */}
      <div className="hidden md:block mb-6">
        <div className="flex py-6 justify-around items-center">
          <button className="flex items-center gap-2 text-[1.7rem] font-semibold">
            <img
              src={music}
              alt="Music Icon"
              className="w-12 h-12 text-teal-400"
            />{" "}
            Mafia Mundeer
          </button>
          <div className="flex gap-44">
            <div className="relative">
              <button
                className={`text-white font-bold py-2 px-10 rounded-lg text-[1.5rem]  border border-[${primaryColor}] flex items-center justify-between lg:justify-center`}
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
                    <li className="px-4 py-2 hover:bg-gray-200">
                      Most Popular
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-200">Trending</li>
                    <li className="px-4 py-2 hover:bg-gray-200">New</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`font-bold py-2 px-10 rounded-lg text-[1.5rem]  border border-[${primaryColor}] flex items-center justify-between lg:justify-center`}
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
      </div>

      {/* Main Content */}
      <div className="clubbody flex flex-col lg:flex-row justify-center gap-40  ">
        <div className="flex flex-col gap-12">
          <img
            src={vdoimg}
            alt="Learning Club Session"
            className="rounded-lg w-[65rem] h-[32rem] object-cover"
          />

          <div className="flex justify-around gap-4 mt-6">
            {statButtons.map(({ icon: Icon, label }, index) => (
              <button
                key={index}
                className="h-10 px-4 rounded flex items-center transition-colors"
              >
                <Icon
                  className="w-16 h-16 mr-4 "
                  style={{ color: primaryColor }}
                />
                <span className=" text-3xl ">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`w-full lg:w-64 space-y-16 mt-6 lg:mt-0 font-bold ${
            club.id === "air" ? "text-black" : ""
          }`}
        >
          {buttons.map((button, index) => (
            <button
              onClick={() => handleBtnClick(button)}
              key={index}
              className={`w-full h-20 flex text-xl items-center p-2 rounded-md bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] `}
              style={{
                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}`,
              }}
            >
              <img
                src={button.icon}
                alt={button.label}
                className="w-20 h-16 mr-4"
              />
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Stats - Custom Dark Buttons */}
    </div>
  );
}

export default MainScreen;
