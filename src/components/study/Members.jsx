// export default Members;
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import music from "../Clubroom/music.png";
import manIcon from "../ClubIco/manlogo.png";
import { CgEnter } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import useClubRoom from "../../stores/useClubRoom";

function Members() {
  const [isPopularityOpen, setPopularityOpen] = useState(false);
  const [isSectorOpen, setSectorOpen] = useState(false);
  const { club } = useClubRoom();
  const primaryColor = club.gradientFrom;
  const secondaryColor = club.gradientTo;

  const genres = [
    { name: "Hemant", icon: manIcon },
    {
      name: "Hemant",
      icon: manIcon,
    },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
    { name: "Hemant", icon: manIcon },
  ];

  const statButtons = [
    { icon: FaHeart, label: "251" },
    { icon: FaPlus, label: "100" },
    { icon: FaQuestion, label: "51" },
    { icon: CgEnter, label: "Enter Club" },
    { icon: FaPeopleGroup, label: "Hire Me" },
  ];

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
                className={`text-white font-bold py-2 px-10 rounded-lg text-[1.5rem]  border border-red-600 flex items-center justify-between lg:justify-center`}
                onClick={() => setPopularityOpen(!isPopularityOpen)}
                style={{
                  border: `1px solid ${primaryColor}`,
                }}
              >
                Popularity <ChevronDown className="ml-4 h-8 w-8" />
              </button>
              {isPopularityOpen && (
                <div className="absolute bg-white z-10 text-black shadow-md rounded-lg mt-2 w-56">
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
                className={`font-bold py-2 px-10 rounded-lg text-[1.5rem]  border border-red-600 flex items-center justify-between lg:justify-center`}
                onClick={() => setSectorOpen(!isSectorOpen)}
                style={{
                  border: `1px solid ${primaryColor}`,
                }}
              >
                Sector <ChevronDown className="ml-4 h-8 w-8" />
              </button>
              {isSectorOpen && (
                <div className="absolute bg-white z-10 text-black shadow-md rounded-lg mt-2 w-56">
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
      <div className="flex flex-col lg:flex-col gap-8">
        {/* Genre Grid */}
        <div className="flex-1">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-items-center ${
              club.id === "air" ? "text-black" : ""
            }`}
          >
            {genres.map((genre, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg flex justify-between items-center text-center hover:scale-105 transform transition duration-300 w-72 h-36 cursor-pointer`}
                style={{
                  background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor}`,
                }}
              >
                <img src={genre.icon} alt={genre.name} className="w-32 h-32" />
                <div className="mt-2 font-bold text-2xl mr-4">{genre.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Stats */}
        <div className="flex justify-center gap-16  mt-10">
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

      {/* Bottom Stats - Custom Dark Buttons */}
    </div>
  );
}

export default Members;
