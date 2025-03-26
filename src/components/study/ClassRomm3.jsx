import React, { useState } from "react";
// Importing the icons
import { Heart, Share, Eye, Play, ChevronDown } from "lucide-react";

// Importing the images for the thumbnail and icons
import vdoimg from "../Clubroom/vdoimg.png";
import loveicon from "../Clubroom/loveicon.png";
import plusicon from "../Clubroom/plusicon.png";
import eyeicon from "../Clubroom/eyeicon.png";
import useClubRoom from "../../stores/useClubRoom";
import { useNavigate } from "react-router";

// Videos data as a regular JavaScript object
const videos = [
  {
    title: "Red Indians",
    likes: 250,
    shares: 118,
    description:
      "With each project, we embark on a journey through the realms of creativity and innovation. Our mission is to transform ideas into engaging and intuitive user experiences, crafting digital landscapes that delight and inspire. As we navigate the ever-evolving world of technology, we stay curious, eager to learn, and passionate about pushing the boundaries of design. Together, we aim to make the digital world a more beautiful and accessible place for everyone.",
    thumbnail: vdoimg,
  },
  {
    title: "X-esigner",
    likes: 250,
    shares: 118,
    description:
      "With each project, we embark on a journey through the realms of creativity and innovation. Our mission is to transform ideas into engaging and intuitive user experiences, crafting digital landscapes that delight and inspire. As we navigate the ever-evolving world of technology, we stay curious, eager to learn, and passionate about pushing the boundaries of design. Together, we aim to make the digital world a more beautiful and accessible place for everyone.",
    thumbnail: vdoimg,
  },
  {
    title: "Kill Bill",
    likes: 250,
    shares: 118,
    description:
      "With each project, we embark on a journey through the realms of creativity and innovation. Our mission is to transform ideas into engaging and intuitive user experiences, crafting digital landscapes that delight and inspire. As we navigate the ever-evolving world of technology, we stay curious, eager to learn, and passionate about pushing the boundaries of design. Together, we aim to make the digital world a more beautiful and accessible place for everyone.",
    thumbnail: vdoimg,
  },
];

const ClubRoom3 = () => {
  const [isSectorOpen, setSectorOpen] = useState(false);
  const { club } = useClubRoom();

  const color = club?.gradientFrom;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studymaterial/mainScreen");
  };

  return (
    <div className=" 2xl:py-6 pt-3 2xl:px-56 px-24">
      {/* Filter Button */}
      <div className="flex justify-end mb-6">
        <div className="relative z-40">
          <button
            className="text-white font-bold  2xl:py-2 2xl:px-10 px-5 py-1 text-sm 2xl:text-lg 2xl:rounded-lg rounded-md border border-purple-500 flex items-center justify-between lg:justify-center hover:bg-purple-900"
            style={{
              border: `1px solid ${color}`,
            }}
            onClick={() => setSectorOpen(!isSectorOpen)}
          >
            Filter <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {isSectorOpen && (
            <div className="absolute cursor-pointer bg-white text-black shadow-md rounded-lg mt-2 w-36 z-1">
              <ul>
                <li className="px-4 py-2 rounded-t-lg hover:bg-gray-200">
                  Technology
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">Arts</li>
                <li className="px-4 py-2 rounded-b-lg hover:bg-gray-200">
                  Science
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 2xl:gap-36">
        {videos.map((video, index) => (
          <div
            onClick={handleClick}
            key={index}
            className="group relative bg-black rounded-lg overflow-hidden w-[18rem] 2xl:w-[24rem] mx-auto text-center border-2"
            style={{
              borderImage: `linear-gradient(to left, ${color}, transparent 100%) 1`,
              borderWidth: "1px 1px 1px 0px", // (Top, Right, Bottom, Left) | Left is 0px for a fading effect
            }}
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video text-center">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors">
                <button className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center hover:bg-yellow-500 hover:rounded-md ">
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="2xl:py-4 px-2 2xl:px-8">
              {/* Metrics */}
              <div className="flex items-center text-center py-4 2xl:text-xl 2xl:py-6 2xl:gap-4 2xl:mb-4 justify-around">
                <div className="flex items-center gap-1">
                  <img
                    src={loveicon}
                    alt="Love Icon"
                    className="w-7 h-7 mb-1"
                  />
                  <span className="text-white">{video.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src={plusicon}
                    alt="Share Icon"
                    className="w-7 h-7 mb-1"
                  />
                  <span className="text-white">{video.shares}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={eyeicon} alt="Eye Icon" className="w-7 h-7 mb-1" />
                  <span className="text-white">Tour</span>
                </div>
              </div>

              {/* Title Section */}
              <div className="relative mb-4">
                <div
                  className="absolute inset-0  opacity-75 rounded-lg"
                  style={{
                    background: `radial-gradient(circle, ${color}, rgba(0,0,0,1) 100%)`,
                  }}
                />
                <h2 className="text-white 2xl:text-2xl font-semibold relative z-10 2xl:p-2 p-1">
                  {video.title}
                </h2>
              </div>

              {/* Subtitle Section */}
              <p className="text-gray-400 2xl:text-sm text-xs 2xl:mb-4 mb-2">
                UI/UX Designers Club
              </p>

              {/* Description Section */}
              <p className="text-gray-300 text-xs 2xl:text-sm leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubRoom3;
