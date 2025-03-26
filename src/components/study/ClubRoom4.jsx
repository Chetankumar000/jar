import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Importing images
import members from "../Clubroom/member.png";
import leader from "../Clubroom/leader.png";
import achievements from "../Clubroom/achivements.png";
import joinclub from "../Clubroom/joinclub.png";
import sponsorClub from "../Clubroom/sponsorclub.png";

import enter from "../Clubroom/enter.png";
import que from "../Clubroom/qus.png";

import music from "../Clubroom/music.png";
import vdoimg from "../Clubroom/vdoimg.png";

import loveicon from "../Clubroom/loveicon.png";
import plusicon from "../Clubroom/plusicon.png";

function ClubRoom4() {
  const [isPopularityOpen, setPopularityOpen] = useState(false);
  const [isSectorOpen, setSectorOpen] = useState(false);

  // Array for buttons
  const buttons = [
    { label: "Members", icon: members },
    { label: "Leader", icon: leader },
    { label: "Achievements", icon: achievements },
    { label: "Join Club", icon: joinclub },
    { label: "Sponsor Club", icon: sponsorClub },
  ];

  return (
    <div className="bg-black text-white p-4">
      {/* Top Menu Bar (Hidden on tablet) */}
      <div className="hidden md:block mb-6">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-2xl font-semibold hover:bg-purple-900/30">
            <img
              src={music}
              alt="Music Icon"
              className="w-8 h-8 text-teal-400"
            />{" "}
            Mafia Mundeer
          </button>
          <div className="flex gap-6">
            <div className="relative">
              <button
                className="text-white font-bold py-2 px-10 rounded-lg border border-purple-500 flex items-center justify-between lg:justify-center hover:bg-purple-900"
                onClick={() => setPopularityOpen(!isPopularityOpen)}
              >
                Popularity <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {isPopularityOpen && (
                <div className="absolute bg-white text-black shadow-md rounded-lg mt-2 w-56">
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
                className="text-white font-bold py-2 px-10 rounded-lg border border-purple-500 flex items-center justify-between lg:justify-center hover:bg-purple-900"
                onClick={() => setSectorOpen(!isSectorOpen)}
              >
                Sector <ChevronDown className="ml-2 h-4 w-4" />
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
      <div className="clubbody flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <img
            src={vdoimg}
            alt="Learning Club Session"
            className="rounded-lg  object-cover"
          />
        </div>

        <div className="w-full lg:w-64 space-y-4 mt-6 lg:mt-0">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="w-full h-14 flex items-center px-4 rounded-md bg-gradient-to-r from-red-600 to-slate-900 border border-purple-500"
            >
              <img
                src={button.icon}
                alt={button.label}
                className="w-12 h-12 mr-3"
              />
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Stats - Custom Dark Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        {[
          { icon: loveicon, label: "251" },
          { icon: plusicon, label: "100" },
          { icon: que, label: "51" },
          { label: "Enter Club", icon: enter },
        ].map((button, index) => (
          <button
            key={index}
            className="h-10 px-4 rounded bg-black border border-red-500 hover:bg-red-950/30 flex items-center transition-colors"
          >
            <img
              src={button.icon}
              alt={button.label}
              className="w-8 h-8 mr-2"
            />
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ClubRoom4;
